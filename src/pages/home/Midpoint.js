import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PlaceContainer,
  Left,
  Right,
  PlacesList,
  PlaceItem,
  BottomSection,
  ShareButton,
  SaveButton,
  WeatherInfoContainer,
  WeatherIcon,
  WeatherDetails,
  MapContainer,
  commonStyles,
  WhiteBox
} from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import { AppContext } from '../../contexts/AppContext';

const Midpoint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { places, midpoint } = location.state;
  const { isLoggedIn } = useContext(AppContext); // AppContext에서 isLoggedIn 가져오기
  const [weather, setWeather] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [midpointDistrict, setMidpointDistrict] = useState('');
  const [selecting, setSelecting] = useState(false);

  // 콘솔에 isLoggedIn 상태 출력
  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!midpoint) {
      console.error('Midpoint 정보가 없습니다.');
      return;
    }

    const fetchMidpointDistrict = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${midpoint.latitude},${midpoint.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`);
        const addressComponents = response.data.results[0].address_components;
        const districtComponent = addressComponents.find(component => component.types.includes('sublocality_level_1') || component.types.includes('locality'));
        if (districtComponent) {
          const districtName = districtComponent.long_name;
          setMidpointDistrict(districtName);
          fetchWeatherData(districtName);
        }
      } catch (error) {
        console.error('Error fetching midpoint district:', error);
      }
    };

    const fetchWeatherData = async (district) => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${district}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchMidpointDistrict();
  }, [midpoint]);

  const handlePlaceClick = async (place) => {
    if (selecting) {
      setSelectedPlaces((prevSelectedPlaces) => {
        if (prevSelectedPlaces.includes(place)) {
          return prevSelectedPlaces.filter(selected => selected !== place);
        } else {
          return [...prevSelectedPlaces, place];
        }
      });
    } else {
      setSelectedPlaces([place]);

      // place 객체 구조 확인을 위한 콘솔 로그
      console.log('Selected place:', place);

      // placeID를 통해 구글 리뷰 URL을 가져오는 API 호출
      try {
        const response = await axios.get(`http://3.36.150.194:8080/api/reviews?placeId=${place.placeID}`);
        const googleReviewUrl = response.data.url;

        // 구글 리뷰 페이지로 리디렉션
        window.open(googleReviewUrl, '_blank');
      } catch (error) {
        console.error('Error fetching Google review URL:', error);
      }
    }
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능 구현
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      alert('로그인 후 사용해주세요.');
      return;
    }
    // 저장 기능 구현
  };

  const handleSelectButtonClick = () => {
    setSelecting(true);
  };

  const handleCancelButtonClick = () => {
    setSelecting(false);
    setSelectedPlaces([]);
  };

  return (
    <div style={commonStyles.container}>
      <Logo />
      <PlaceContainer>
        <Left>
          <WhiteBox>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ marginLeft: '20px', marginTop: '15px' }}>{midpointDistrict} 주변 장소 추천</h2>
              {selecting ? (
                <button onClick={handleCancelButtonClick} style={{ marginRight: '40px', background: 'white', color: 'gray', border: '1px solid white', borderRadius: '4px', padding: '0.5rem 0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>취소</button>
              ) : (
                <button onClick={handleSelectButtonClick} style={{ marginRight: '40px', background: 'white', color: 'gray', border: '1px solid white', borderRadius: '4px', padding: '0.5rem 0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>장소 선택하기</button>
              )}
            </div>
            <PlacesList>
              {places.map((place, index) => (
                <PlaceItem
                  key={index}
                  isSelected={selectedPlaces.includes(place)}
                  onClick={() => handlePlaceClick(place)}
                >
                  <img src={place.image || '/img/default-image.png'} alt={place.name} />
                  <div>
                    <h3>{place.name}</h3>
                    <p>{place.address}</p>
                  </div>
                </PlaceItem>
              ))}
            </PlacesList>
            {selecting && (
              <BottomSection>
                <ShareButton onClick={handleKakaoShare}>
                  <img src="/img/katokshare.png" alt="Kakao Share" style={{ width: '30px', marginRight: '7px' }} />
                  <span>공유</span>
                </ShareButton>
                <SaveButton onClick={handleSave}>
                  <img src="/img/save.png" alt="Save" style={{ width: '20px', marginRight: '7px' }} />
                  <span>저장</span>
                </SaveButton>
              </BottomSection>
            )}
            <WeatherInfoContainer>
              {weather && (
                <WeatherDetails>
                  <span>{midpointDistrict}</span>
                  <span className="temperature">{weather.main.temp}°C</span>
                  <WeatherIcon src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather" />
                </WeatherDetails>
              )}
            </WeatherInfoContainer>
          </WhiteBox>
        </Left>

        <Right>
          {selectedPlaces.length === 1 ? (
            <MapContainer>
              <iframe
                title="selectedPlaceMap"
                src={`https://maps.google.com/maps?q=${selectedPlaces[0].latitude},${selectedPlaces[0].longitude}&z=15&output=embed`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </MapContainer>
          ) : (
            midpoint && (
              <MapContainer>
                <iframe
                  title="midpointMap"
                  src={`https://maps.google.com/maps?q=${midpoint.latitude},${midpoint.longitude}&z=15&output=embed`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </MapContainer>
            )
          )}
        </Right>
      </PlaceContainer>
    </div>
  );
};

export default Midpoint;
