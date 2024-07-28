import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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
  commonStyles
} from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import { useNavigate } from 'react-router-dom';

function Midpoint() {
  const location = useLocation();
  const { places, district, midpoint } = location.state;
  const [weather, setWeather] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!district) {
      console.error('District 정보가 없습니다.');
      return;
    }
  
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    fetchWeatherData();
  }, [district, navigate]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능 구현
  };

  return (
    <div style={commonStyles.container}>
      <Logo />
      <PlaceContainer>
        <Left>
          <WhiteBox>
            <h2>{district} 주변 장소 추천</h2>
            <PlacesList>
              {places.map((place, index) => (
                <PlaceItem key={index} onClick={() => handlePlaceClick(place)}>
                  <img src={place.image || '/img/default-image.png'} alt={place.name} />
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
          {midpoint && (
            <MapContainer>
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${midpoint.latitude},${midpoint.longitude}&z=15&output=embed`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </MapContainer>
          )}
          {selectedPlace && (
            <MapContainer>
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${selectedPlace.latitude},${selectedPlace.longitude}&z=15&output=embed`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </MapContainer>
          )}
        </Right>
      </PlaceContainer>
    </div>
  );
}

export default Midpoint;
