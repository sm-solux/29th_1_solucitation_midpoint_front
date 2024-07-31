import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
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

function Midpoint() {
  const location = useLocation();
  const navigate = useNavigate();
  const { places, midpoint } = location.state;
  const [weather, setWeather] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [midpointDistrict, setMidpointDistrict] = useState('');
  const [selecting, setSelecting] = useState(false);
  const { userInfo, isLoggedIn } = useContext(AppContext);

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

  useEffect(() => {
    console.log('Places:', places);
  }, [places]);

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

      try {
        const response = await axios.get(`http://3.36.150.194:8080/api/reviews?placeId=${place.placeID}`);
        const googleReviewUrl = response.data.url;
        window.open(googleReviewUrl, '_blank');
      } catch (error) {
        console.error('Error fetching Google review URL:', error);
      }
    }
  };

  const handleKakaoShare = () => {
    if (!selectedPlaces.length) {
      alert('공유할 장소를 선택해주세요.');
      return;
    }

    const placeInfo = selectedPlaces.map(place => `${place.name}: ${place.address}`).join('\n');
    window.Kakao.Link.sendDefault({
      objectType: 'text',
      text: `추천 장소:\n${placeInfo}`,
      link: {
        webUrl: window.location.href,
        mobileWebUrl: window.location.href,
      },
      buttonTitle: '장소 보기',
    });
  };

  const handleSave = async () => {
    if (!isLoggedIn) {
      alert('로그인 후 사용해주세요.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found.');
      return;
    }

    const saveData = {
      neighborhood: midpointDistrict,
      historyDto: selectedPlaces.map(place => ({
        placeId: place.placeID,
        placeName: place.name,
        placeAddress: place.address,
        imageUrl: place.image
      }))
    };

    console.log('Save Data:', JSON.stringify(saveData, null, 2));

    try {
      const response = await axios.post('http://3.36.150.194:8080/api/search-history-v2', saveData, {
        headers: {
          'ACCESS_TOKEN': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert('장소를 저장하였습니다.');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert(`에러: ${data.errors.map(err => `${err.field}: ${err.message}`).join(', ')}`);
        } else if (status === 401 && data.error === "access_token_expired" && data.message === "Access Token이 만료되었습니다.") {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token found.');
            }

            const tokenResponse = await axios.post('http://3.36.150.194:8080/api/auth/refresh-token', {}, {
              headers: {
                'Authorization': `Bearer ${refreshToken}`
              }
            });

            const { accessToken: newAccessToken } = tokenResponse.data;
            localStorage.setItem('accessToken', newAccessToken);
            handleSave(); // Retry the save operation with the new token
          } catch (tokenError) {
            console.error('Error refreshing token:', tokenError);
            alert('로그인이 필요합니다. 다시 로그인해주세요.');
            navigate('/login');
          }
        } else if (status === 404) {
          alert('사용자를 찾을 수 없습니다.');
        } else if (status === 500) {
          alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } else {
          console.error('Error saving places:', error.response.data);
        }
      } else {
        console.error('Error saving places:', error);
      }
    }
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
            <WeatherInfoContainer>
              {weather && (
                <WeatherDetails>
                  <span>{midpointDistrict}</span>
                  <span className="temperature">{weather.main.temp}°C</span>
                  <WeatherIcon src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather" />
                </WeatherDetails>
              )}
            </WeatherInfoContainer>
            {selectedPlaces.length > 0 && (
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
}

export default Midpoint;
