import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import { myPageStyles } from '../styles/myPageStyles';
import { commonStyles } from '../styles/styles';  // Import commonStyles

// 모달 컴포넌트를 앱 루트 요소와 연결
Modal.setAppElement('#root');

// Google Maps API 스크립트를 비동기적으로 로드하는 함수
const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const AddLocationModal = ({
  isOpen,
  closeModal,
  addLocationToList,
  editLocationInList,
  deleteLocationFromList,
  selectedLocation,
}) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [addrType, setAddrType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [favPlaceId, setFavPlaceId] = useState(null);
  const [dataExists, setDataExists] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation.name);
      setAddrType(selectedLocation.type.toUpperCase());
      checkLocationExistence(selectedLocation.id);
    } else {
      clearInputs();
      setIsEditing(true);
    }
  }, [selectedLocation]);

  const checkLocationExistence = async (favPlaceId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/favs/places/details?favPlaceId=${favPlaceId}`, { headers });

      if (response.status === 200 && response.data) {
        const locationData = response.data;
        setAddress(locationData.addr);
        setSearchInput(locationData.addr);
        setLatitude(locationData.latitude);
        setLongitude(locationData.longitude);
        setFavPlaceId(locationData.favPlaceId);
        setDataExists(true);
        setIsEditing(false);
      } else {
        setDataExists(false);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching location details:', error.message);
      setDataExists(false);
      setIsEditing(true);
    }
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GEOCODING_API_KEY,
          language: 'ko',
        },
      });

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } else {
        throw new Error('주소 검색 오류');
      }
    } catch (error) {
      setLatitude('');
      setLongitude('');
      setErrorMessage('주소 검색 오류: 주소를 다시 확인해주세요.');
      console.error('주소 검색 오류:', error.message);
    }
  };

  const clearInputs = () => {
    setLocation('');
    setAddress('');
    setSearchInput('');
    setLatitude('');
    setLongitude('');
    setErrorMessage('');
    setAddrType('');
  };

  const addLocation = async (locationData) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/favs/places/save`, locationData, { headers });
      
      if (response.status === 201) { // 201 created status
        console.log('Location added successfully:', response.data);
        return response.data;
      } else {
        console.error('Error adding location:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error adding location:', error);
      return null;
    }
  };

  const handleAddLocation = async () => {
    if (!address) {
      setErrorMessage('주소를 입력해주세요');
      return;
    }

    const newLocation = {
      addrType,
      addr: address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const response = await addLocation(newLocation);
    if (response) {
      addLocationToList({ ...newLocation, id: response.favPlaceId });
      clearInputs();
      closeModal();
    } else {
      setErrorMessage('장소 추가에 실패했습니다.');
    }
  };

  const editLocation = async (locationData) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/favs/places/update`, locationData, { headers });

      if (response.data.success) {
        console.log('Location updated successfully:', response.data);
        return response.data;
      } else {
        console.error('Error updating location:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Error updating location:', error);
      return null;
    }
  };

  const handleEditLocation = async () => {
    if (!address) {
      setErrorMessage('주소를 입력해주세요');
      return;
    }

    const updatedLocation = {
      favPlaceId: selectedLocation.id,
      addrType,
      addr: address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const response = await editLocation(updatedLocation);
    if (response) {
      editLocationInList(updatedLocation);
      clearInputs();
      closeModal();
    } else {
      setErrorMessage('장소 수정에 실패했습니다.');
    }
  };

  const handleDeleteLocation = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/favs/places/delete?favPlaceId=${selectedLocation.id}`, { headers });

        if (response.data.success) {
          deleteLocationFromList(selectedLocation);
          clearInputs();
          closeModal();
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error('장소 삭제 오류:', error.message);
        setErrorMessage('장소 삭제에 실패했습니다.');
      }
    }
  };

  const fetchSuggestions = async (value) => {
    if (value.trim() !== '') {
      const targetUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${GEOCODING_API_KEY}&language=ko`;
      try {
        const response = await axios.get(targetUrl);
        const data = response.data;
        setSuggestions(data.predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setAddress(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.description);
    setSearchInput(suggestion.description);
    setSuggestions([]);
    fetchCoordinates(suggestion.description);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (selectedLocation) {
      setLocation(selectedLocation.name);
      setAddress(selectedLocation.locate || '');
      setLatitude(selectedLocation.latitude || '');
      setLongitude(selectedLocation.longitude || '');
      setSearchInput(selectedLocation.locate || '');
    }
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel="AddEditLocationModal"
    >
      <div style={myPageStyles.modalContent}>
        <h3>{selectedLocation ? selectedLocation.name : '장소 추가'}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="주소 입력"
            style={{ ...myPageStyles.inputLocate, backgroundColor: 'white' }}
            value={searchInput}
            onChange={handleSearchInputChange}
            disabled={!isEditing && dataExists}
          />
        </div>
        {suggestions.length > 0 && (
          <ul style={commonStyles.suggestionsList}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                style={commonStyles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <div>
          {dataExists ? (
            isEditing ? (
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
            )
          ) : (
            <button
              onClick={handleAddLocation}
              style={myPageStyles.addFriendModalButton}
            >
              추가
            </button>
          )}
          <button onClick={closeModal} style={myPageStyles.closeButton}>
            X
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddLocationModal;