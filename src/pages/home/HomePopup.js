import React, { useEffect, useRef, useState } from 'react';
import { commonStyles, PlacesList, PlaceItem, FriendItem } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

const HomePopup = ({ onClose }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [places, setPlaces] = useState([]);
  const [showPlacesList, setShowPlacesList] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const friends = [
    { name: '친구1', address: '서울특별시 용산구 청파대로10 1층' },
    { name: '친구2', address: '서울특별시 용산구 청파대로20 2층' },
    { name: '친구3', address: '서울특별시 용산구 청파대로30 3층' },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      if (window.naver && mapRef.current && showMap) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 10,
        };
        const naverMap = new window.naver.maps.Map(mapRef.current, mapOptions);
        setMap(naverMap);
      }
    };
    document.head.appendChild(script);
  }, [showMap]);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      const newPlace = {
        name: searchInput,
        address: '서울특별시 용산구 청파대로10 1층',
        imgSrc: '/path/to/image.png',
      };
      setPlaces([...places, newPlace]);
      setSearchInput('');
    }
  };

  const handleUseCurrentLocation = () => {
    setShowMap(true);
    setShowPlacesList(false);
    setSelectedFriend(null);
  };

  const handleInputFocus = () => {
    setShowPlacesList(true);
    setShowMap(false);
    setSelectedFriend(null);
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setShowPlacesList(false);
    setShowMap(false);
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
            onFocus={handleInputFocus}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearch} style={commonStyles.popupButton}>검색</button>
          <button onClick={onClose} style={commonStyles.popupCloseButton}>X</button>
        </div>
        <div style={commonStyles.popupContent}>
          <div style={commonStyles.locationContainer} onClick={handleUseCurrentLocation}>
            <img src="/img/location.png" alt="현재 위치 사용" style={commonStyles.locationIcon} />
            <span>현재 위치 사용</span>
          </div>
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
          {showPlacesList && (
            <div>
              <p style={commonStyles.currentLocationText}>검색 목록</p>
              <PlacesList>
                {places.map((place, index) => (
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
