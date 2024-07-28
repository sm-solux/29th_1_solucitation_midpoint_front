import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  PlaceContainer,
  Left,
  Right,
  PlacesList,
  PlaceItem,
  BottomSection,
  ShareButton,
  WeatherInfo,
  MapContainer,
  commonStyles,
  WhiteBox // 추가된 스타일 컴포넌트
} from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

function Midpoint() {
  const location = useLocation();
  const { places, district } = location.state;
  const [weather, setWeather] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [district]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    // 여기에서 선택된 장소의 지도 정보를 가져옵니다.
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능 구현
  };

  return (
    <div style={commonStyles.container}>
      <Logo />
      <PlaceContainer>
        <Left>
          <WhiteBox> {/* WhiteBox로 장소 추천, 공유, 날씨 부분 묶기 */}
            <h2>{district} 주변 장소 추천</h2>
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
              {weather && (
                <WeatherInfo>
                  <span>{district}</span>
                  <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather" />
                  <span>{weather.main.temp}°C</span>
                </WeatherInfo>
              )}
            </BottomSection>
          </WhiteBox>
        </Left>

        <Right>
          {selectedPlace && (
            <MapContainer>
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${selectedPlace.latitude},${selectedPlace.longitude}&z=15&output=embed`}
              />
            </MapContainer>
          )}
        </Right>
      </PlaceContainer>
    </div>
  );
}

export default Midpoint;