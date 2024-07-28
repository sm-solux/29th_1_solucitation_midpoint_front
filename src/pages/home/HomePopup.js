import React, { useEffect, useRef, useState } from 'react';
import { commonStyles, PlacesList, PlaceItem, FriendItem } from '../../styles/styles';
import axios from 'axios';
import debounce from 'lodash.debounce';

const HomePopup = ({ onClose, setAddress, searchResults, setSearchResults, isLoggedIn }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showPlacesList, setShowPlacesList] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const friends = [
    { name: '친구1', address: '서울특별시 용산구 청파대로10 1층' },
    { name: '친구2', address: '서울특별시 용산구 청파대로20 2층' },
    { name: '친구3', address: '서울특별시 용산구 청파대로30 3층' },
  ];

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=ko`;
        script.async = true;
        script.onload = () => {
          if (mapRef.current && showMap) {
            const mapOptions = {
              center: new window.google.maps.LatLng(37.5665, 126.9780),
              zoom: 10,
            };
            const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
            setMap(googleMap);
          }
        };
        document.head.appendChild(script);
      } else if (mapRef.current && showMap) {
        const mapOptions = {
          center: new window.google.maps.LatLng(37.5665, 126.9780),
          zoom: 10,
        };
        const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(googleMap);
      }
    };

    loadGoogleMaps();
  }, [showMap]);

  const fetchSuggestions = async (value) => {
    if (value.trim() !== '') {
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`;
      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(targetUrl));
        const data = JSON.parse(response.data.contents);
        setSuggestions(data.predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedFetchSuggestions(value);
  };

  const handleSearchInputFocus = () => {
    setShowPlacesList(true);
    setShowMap(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchInput(suggestion.description);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    if (!selectedSuggestion && !searchInput) {
      console.error('Selected suggestion or search input not found.');
      return;
    }

    if (selectedSuggestion) {
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${selectedSuggestion.place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`;
      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(targetUrl));
        const data = JSON.parse(response.data.contents);

        const place = {
          name: data.result.name,
          address: data.result.formatted_address,
          imgSrc: data.result.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.result.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : '/path/to/default/image.png',
        };

        const updatedResults = [place, ...searchResults]; // 맨 위로 추가
        setSearchResults(updatedResults);
        setSearchInput('');
        setSelectedSuggestion(null);
        setShowMap(false);
        setShowPlacesList(false);
        onClose(place.address, updatedResults);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    } else {
      onClose(searchInput, searchResults);
    }
  };

  const handleUseCurrentLocation = () => {
    setShowMap(true);
    setShowPlacesList(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };

          if (map) {
            map.setCenter(currentLocation);
            new window.google.maps.Marker({
              position: currentLocation,
              map: map,
              title: '현재 위치',
            });
          } else {
            const mapOptions = {
              center: currentLocation,
              zoom: 15,
            };
            const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
            new window.google.maps.Marker({
              position: currentLocation,
              map: googleMap,
              title: '현재 위치',
            });
            setMap(googleMap);
          }

          try {
            const proxyUrl = 'https://api.allorigins.win/get?url=';
            const targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`;
            const response = await axios.get(proxyUrl + encodeURIComponent(targetUrl));
            const data = JSON.parse(response.data.contents);

            if (data.results && data.results.length > 0) {
              const currentAddress = data.results[0].formatted_address;
              setSearchInput(currentAddress);
              setSelectedSuggestion({ description: currentAddress, place_id: data.results[0].place_id });
            } else {
              alert('현재 위치의 주소를 찾을 수 없습니다.');
            }
          } catch (error) {
            console.error('Error fetching current location address:', error);
          }
        },
        (error) => {
          console.error('Error getting current position:', error);
          alert('현재 위치를 사용할 수 없습니다.');
        }
      );
    } else {
      alert('현재 위치를 사용할 수 없습니다.');
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setAddress(friend.address);
    onClose(friend.address, searchResults);
  };

  return (
    <div style={commonStyles.popupContainer}>
      <div style={commonStyles.popupBox}>
        <div style={commonStyles.popupHeader}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            style={commonStyles.popupInput}
            value={searchInput}
            onFocus={handleSearchInputFocus}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch} style={commonStyles.popupButton}>검색</button>
          <button onClick={() => onClose()} style={commonStyles.popupCloseButton}>X</button>
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
        <div style={commonStyles.popupContent}>
          <div style={commonStyles.locationContainer} onClick={handleUseCurrentLocation}>
            <img src="/img/location.png" alt="현재 위치 사용" style={commonStyles.locationIcon} />
            <span>현재 위치 사용</span>
          </div>
          {isLoggedIn && (
            <div style={commonStyles.popupSections}>
              <div style={commonStyles.popupSection1}>
                <p style={commonStyles.popupSectionTitle}>즐겨찾는 장소</p>
                <div style={commonStyles.favoritePlaces}>
                  <button style={commonStyles.favoritePlace}>
                    <img src="/img/home.png" alt="집" style={commonStyles.favoritePlaceImage} />
                    <p>집</p>
                  </button>
                  <button style={commonStyles.favoritePlace}>
                    <img src="/img/work.png" alt="직장/학교" style={commonStyles.favoritePlaceImage} />
                    <p>직장/학교</p>
                  </button>
                </div>
              </div>
              <div style={commonStyles.popupSection2}>
                <p style={commonStyles.popupSectionTitle}>즐겨찾는 친구</p>
                <div style={commonStyles.favoriteFriends}>
                  {friends.map((friend, index) => (
                    <button
                      key={index}
                      style={commonStyles.favoriteFriend}
                      onClick={() => handleFriendClick(friend)}
                    >
                      <img src="/img/pprofile.png" alt={friend.name} style={commonStyles.favoriteFriendImage} />
                      <p>{friend.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showPlacesList && (
            <div style={commonStyles.placesListContainer}>
              <p style={commonStyles.currentLocationText}>검색 목록</p>
              <PlacesList>
                {searchResults.map((place, index) => (
                  <PlaceItem key={index}>
                    <img src={place.imgSrc} alt={place.name} />
                    <div>
                      <h3>{place.name}</h3>
                      <p>{place.address}</p>
                    </div>
                  </PlaceItem>
                ))}
              </PlacesList>
            </div>
          )}
          {showMap && (
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <div style={commonStyles.currentLocationText}>현재 위치</div>
              <div ref={mapRef} style={{ width: '100%', height: '245px', marginTop: '0.5rem' }} />
            </div>
          )}
          {selectedFriend && (
            <div>
              <FriendItem>
                <img src="/img/pprofile.png" alt={selectedFriend.name} />
                <div>
                  <h3>{selectedFriend.name}</h3>
                  <p>{selectedFriend.address}</p>
                </div>
              </FriendItem>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePopup;