import React, { useEffect, useRef, useState } from 'react';
import { commonStyles } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

const HomePopup = ({ onClose }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);

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
    // 검색 기능 구현
  };

  const handleUseCurrentLocation = () => {
    setShowMap(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const location = new window.naver.maps.LatLng(latitude, longitude);
        if (map) {
          map.setCenter(location);
        }
      }, () => {
        alert('현재 위치를 사용할 수 없습니다.');
      });
    } else {
      alert('현재 위치를 사용할 수 없습니다.');
    }
  };

  return (
    <div style={commonStyles.popupContainer}>
      <div style={commonStyles.popupBox}>
        <div style={commonStyles.popupHeader}>
          <input type="text" placeholder="검색어를 입력하세요" style={commonStyles.popupInput} />
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
                <button style={commonStyles.favoriteFriend}>
                  <img src="/img/pprofile.png" alt="친구1" style={commonStyles.favoriteFriendImage} />
                  <p>친구1</p>
                </button>
                <button style={commonStyles.favoriteFriend}>
                  <img src="/img/pprofile.png" alt="친구2" style={commonStyles.favoriteFriendImage} />
                  <p>친구2</p>
                </button>
                <button style={commonStyles.favoriteFriend}>
                  <img src="/img/pprofile.png" alt="친구3" style={commonStyles.favoriteFriendImage} />
                  <p>친구3</p>
                </button>
              </div>
            </div>
          </div>
          {showMap && (
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <div style={commonStyles.currentLocationText}>현재 위치</div>
              <div ref={mapRef} style={{ width: '100%', height: '245px', marginTop: '0.5rem' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePopup;
