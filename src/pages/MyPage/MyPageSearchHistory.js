import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PlaceContainer,
  Left,
  Right,
  PlacesList,
  PlaceItem,
  BottomSection,
  ShareButton,
  MapContainer,
  commonStyles,
  WhiteBox
} from '../../styles/styles';

const MyPageSearchHistory = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [dongName, setDongName] = useState('');

  useEffect(() => {
    // 동 이름 불러오기
    axios.get('/api/dong-name')
      .then(response => setDongName(response.data.name))
      .catch(error => console.error('Error fetching dong name:', error));

    // 추천 장소 불러오기
    axios.get('/api/recommended-places')
      .then(response => setPlaces(response.data))
      .catch(error => console.error('Error fetching places:', error));

  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    // 여기에서 선택된 장소의 지도 정보를 가져옵니다.
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능 구현
  };

  return (
    <div style={commonStyles.container}>
      <PlaceContainer>
        <Left>
          <WhiteBox> {/* WhiteBox로 장소 추천, 공유, 날씨 부분 묶기 */}
            <h2>{dongName} 장소 추천</h2>
            <PlacesList>
              {places.map((place, index) => (
                <PlaceItem key={index} onClick={() => handlePlaceClick(place)}>
                  <img src={place.image} alt={place.name} />
                  <div>
                    <h3>{place.name}</h3>
                    <p>{place.address}</p>
                  </div>
                </PlaceItem>
              ))}
            </PlacesList>

            <BottomSection>
              <ShareButton onClick={handleKakaoShare}>
                <span>공유</span>
                <img src="/img/katokshare.png" alt="Kakao Share" style={{ width: '30px', marginLeft: '10px' }} />
              </ShareButton>
            </BottomSection>
          </WhiteBox>
        </Left>

        <Right>
          {selectedPlace && (
            <MapContainer>
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lng}&z=15&output=embed`}
              />
            </MapContainer>
          )}
        </Right>
      </PlaceContainer>
    </div>
  );
}

export default MyPageSearchHistory;
