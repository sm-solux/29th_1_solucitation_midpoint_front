import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { commonStyles, WhiteBox, PlaceContainer, Left, Right, MapContainer } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import { useLocation, useNavigate } from 'react-router-dom';

const Again = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { midpoint } = location.state || {};
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!midpoint) {
      console.warn('Midpoint data is missing, redirecting to home.');
      navigate('/home');
    }
  }, [midpoint, navigate]);

  const handleRetry = async () => {
    if (!selectedPurpose || !selectedRadius) {
      alert('목적과 반경을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.get('http://3.36.150.194:8080/api/places', {
        params: {
          latitude: midpoint?.latitude || 0, // 기본값 0 사용
          longitude: midpoint?.longitude || 0, // 기본값 0 사용
          category: selectedPurpose,
          radius: selectedRadius
        }
      });

      if (response.data.length > 0) {
        const places = response.data.map(place => ({
          name: place.name,
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          types: JSON.parse(place.types),
          placeID: place.placeID
        }));

        setPlaces(places);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error('Error finding places:', error);
    }
  };

  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #F2F2EF',
    backgroundColor: '#F2F2EF',
    textAlign: 'center',
    width: '400px',
    height: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1B4345',
    appearance: 'none', // 기본 화살표 삭제
    WebkitAppearance: 'none', // 기본 화살표 삭제 (사파리용)
    MozAppearance: 'none', // 기본 화살표 삭제 (파이어폭스용)
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' d='M0 0h10v10H0z'/%3E%3Cpath d='M2.5 3.5a.5.5 0 01.7 0L5 5.3l1.8-1.8a.5.5 0 01.7.7L5.5 6.5a.5.5 0 01-.7 0L2.5 4.2a.5.5 0 010-.7z' fill='%231B4345'/%3E%3C/svg%3E")`,
    backgroundPosition: 'calc(100% - 0.5rem) center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px', // 화살표 크기 조정
  };

  return (
    <div style={commonStyles.container}>
      <Logo />
      <PlaceContainer>
        <Left>
          <WhiteBox>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '1rem' }}>
              <h2 style={{ marginTop: '15px', textAlign: 'center' }}>목적 또는 반경을 변경하거나, 위치를 다시 검색해주세요!</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <select style={selectStyle} value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
                <option value="">목적 선택</option>
                <option value="restaurant">맛집</option>
                <option value="cafe">카페</option>
                <option value="walk">산책</option>
                <option value="hiking">등산</option>
                <option value="study">공부</option>
                <option value="culture">문화생활</option>
                <option value="hotplace">핫플</option>
                <option value="social">친목</option>
              </select>
              <select style={selectStyle} value={selectedRadius} onChange={(e) => setSelectedRadius(e.target.value)}>
                <option value="">반경 선택</option>
                <option value="500">500m</option>
                <option value="1000">1km</option>
                <option value="2000">2km</option>
                <option value="3000">3km</option>
                <option value="5000">5km</option>
              </select>
              <button 
                type="button" 
                style={{ 
                  background: '#1B4345', 
                  color: 'white', 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontWeight: 'bold', 
                  alignSelf: 'center', 
                  width: '140px',
                  marginTop: '0.7rem' 
                }} 
                onClick={handleRetry}
              >
                위치 다시 검색
              </button>
              {places.length > 0 && (
                <div style={{ marginTop: '1rem', width: '100%' }}>
                  {places.map((place, index) => (
                    <div key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                      <h3>{place.name}</h3>
                      <p>{place.address}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </WhiteBox>
        </Left>
        <Right>
          {midpoint ? (
            <MapContainer>
              <iframe
                title="retryMap"
                src={`https://maps.google.com/maps?q=${midpoint.latitude},${midpoint.longitude}&z=15&output=embed`}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </MapContainer>
          ) : (
            <p>중간 지점을 찾을 수 없습니다.</p>
          )}
        </Right>
      </PlaceContainer>
    </div>
  );
};

export default Again;
