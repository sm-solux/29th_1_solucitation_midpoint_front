import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../components/refreshAccess';
import {
  PlaceContainer,
  PlacesList,
  PlaceItem,
  BottomSection,
  ShareButton,
  MapContainer,
  commonStyles,
  WhiteBox
} from '../../styles/styles';

const MyPageSearchHistory = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (accessToken) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search-history`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401 && err.response?.data?.error === 'access_token_expired') {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available.');
          }
          const newAccessToken = await refreshAccessToken(refreshToken);
          localStorage.setItem('accessToken', newAccessToken);
          fetchData(newAccessToken);
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          setError('토큰 갱신 중 오류가 발생하였습니다. 다시 시도해 주세요.');
        }
      } else {
        handleErrors(err);
      }
    }
  };

  const handleErrors = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
          navigate('/login');
          break;
        case 404:
          setError('사용자를 찾을 수 없습니다.');
          break;
        case 500:
          setError('검색 기록 조회 중 오류가 발생하였습니다.');
          break;
        default:
          setError('데이터를 가져오는 중 오류가 발생하였습니다.');
      }
    } else {
      setError('데이터를 가져오는 중 오류가 발생하였습니다.');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      navigate('/login');
    } else {
      fetchData(accessToken);
    }
  }, [navigate]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleKakaoShare = () => {
    // Kakao share logic here
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={commonStyles.container}>
      <PlaceContainer>
        <WhiteBox>
          <h2>장소 추천</h2>
          <PlacesList>
            {data.map((place, index) => (
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

        {selectedPlace && (
          <MapContainer>
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lng}&z=15&output=embed`}
            />
          </MapContainer>
        )}
      </PlaceContainer>
    </div>
  );
};

export default MyPageSearchHistory;