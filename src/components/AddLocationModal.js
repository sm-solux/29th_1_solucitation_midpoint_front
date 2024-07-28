import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

//.js로 바로 로드 위한 코드
const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const AddLocationModal = ({
  isOpen,
  closeModal,
  addLocation,
  editLocation,
  deleteLocation,
  selectedLocation,
  locationType, 
}) => {
  const [locateName, setLocateName] = useState('');
  const [locateAddress, setLocateAddress] = useState('');
  const [icon, setIcon] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [originalLocation, setOriginalLocation] = useState(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  const loadGoogleMaps = () => {
    return loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDWqDt_pjMspdA_PKMzpHQIaaiyMJEG7BI&libraries=places`);
  };

  const geocodeLatLng = (geocoder, lat, lng) => {
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setLocateAddress(results[0].formatted_address);
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  useEffect(() => {
    if (selectedLocation) {
      setLocateName(selectedLocation.name);
      setLocateAddress(selectedLocation.locate);
      setIcon(selectedLocation.icon);
      setOriginalLocation(selectedLocation);
      setIsEditing(false);
      setIsAdded(selectedLocation.locate.trim() !== '');
    } else {
      clearInputs();
      setIsAdded(false);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (isOpen) {
      loadGoogleMaps().then(() => {
        if (window.google) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.5665, lng: 126.9780 }, // 시작 출력 지점(서울)
            zoom: 12,
            restriction: {
              latLngBounds: {
                north: 37.701,
                south: 37.428,
                east: 127.183,
                west: 126.766,
              }, //서울 반경 고정
              strictBounds: true,
            },
          });

          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
          autocomplete.bindTo('bounds', map);

          geocoderRef.current = new window.google.maps.Geocoder(); // 주소로 출력되게 하기

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
              console.error('No details available for input: ' + place.name);
              return;
            }

            setLocateAddress(place.formatted_address);

            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);
            }

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
            });
          });

          map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map,
            });

            geocodeLatLng(geocoderRef.current, lat, lng);
          });
        }
      }).catch((error) => {
        console.error('Error loading Google Maps', error);
      });
    }
  }, [isOpen]);

  const clearInputs = () => {
    setLocateName('');
    setLocateAddress('');
  };

  const handleAddLocation = () => {
    const newLocation = {
      id: Math.random(),
      name: locateName,
      locate: locateAddress,
      icon: icon,
    };
    addLocation(newLocation);
    setIsAdded(true);
    setIsEditing(false);
  };

  const handleEditLocation = () => {
    const editedLocation = {
      ...selectedLocation,
      name: locateName,
      locate: locateAddress,
      icon: icon,
    };
    editLocation(editedLocation);
    setIsEditing(false);
  };

  const handleDeleteLocation = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteLocation(selectedLocation);
      setIsAdded(false);
      setIsEditing(false);
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalLocation) {
      setLocateName(originalLocation.name);
      setLocateAddress(originalLocation.locate);
    }
    setIsEditing(false);
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #1B4345;
            font-family: 'Freesentation', sans-serif;
            font-size: 18px;
          }
          input:focus::placeholder {
            opacity: 0;
          }
        `}
      </style>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
        contentLabel='AddEditLocationModal'
      >
        <div style={myPageStyles.modalContent}>
          <img
            src={`${process.env.PUBLIC_URL}/img/${icon}.png`}
            style={myPageStyles.addImg}
            alt='addLocation'
          />
          <h3>{selectedLocation ? selectedLocation.name : '장소 추가'}</h3>
          <div ref={mapRef} style={{ height: '300px', width: '100%' }}></div>
          <input
            ref={inputRef}
            id='location-input'
            type='text'
            value={locateAddress || ''}
            style={{
              ...myPageStyles.inputLocate,
              backgroundColor: isEditing || !isAdded ? '#fff' : '#fff',
              color: isEditing || !isAdded ? '#1B4345' : '#1B4345',
            }}
            disabled={isAdded && !isEditing}
            onChange={(e) => setLocateAddress(e.target.value)}
            placeholder='등록할 장소 또는 주소 입력'
          />
          {!isAdded ? (
            <button
              onClick={handleAddLocation}
              style={myPageStyles.addFriendModalButton}
            >
              추가
            </button>
          ) : (
            selectedLocation && (
              <div>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleEditLocation}
                      style={myPageStyles.favoriteButtonEdit}
                    >
                      저장
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={myPageStyles.favoriteButtonQuit}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={enableEditing}
                      style={myPageStyles.favoriteButtonEdit}
                    >
                      편집
                    </button>
                    <button
                      onClick={handleDeleteLocation}
                      style={myPageStyles.favoriteButtonQuit}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )
          )}
          <button onClick={closeModal} style={myPageStyles.closeButton}>
            X
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddLocationModal;
