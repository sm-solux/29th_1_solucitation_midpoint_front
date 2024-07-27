import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { commonStyles } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import HomePopup from './HomePopup';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userInfo, setUserInfo] = useState({ name: '본인', profileImage: '/img/default-profile.png', address: '' });
  const [friends, setFriends] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null); // 팝업이 열린 대상
  const [friendCount, setFriendCount] = useState(1);
  const [searchResults, setSearchResults] = useState({ user: [], friends: {} });
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // 로그인하지 않은 경우
      console.error('No token found, setting default profile');
      setUserInfo({ name: '본인', profileImage: '/img/default-profile.png', address: '' });
      return;
    }

    try {
      const response = await axios.get('http://3.36.150.194:8080/midpoint/api/member/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setUserInfo({
          ...userInfo,
          name: response.data.nickname,
          profileImage: response.data.profileImage,
          address: response.data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserInfo({ name: '본인', profileImage: '/img/default-profile.png', address: '' });
      if (error.response && error.response.status === 401) {
        // 인증 오류가 발생한 경우 로그인 페이지로 리다이렉트
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const isLoggedIn = !!localStorage.getItem('accessToken'); // 로그인 여부 확인

  const handleAddInput = () => {
    const newFriendName = `친구 ${friendCount}`;
    setFriendCount(friendCount + 1);
    setFriends([
      ...friends,
      { profile: '/img/default-profile.png', name: newFriendName, address: '' },
    ]);
  };

  const handlePopupOpen = (target) => {
    setPopupTarget(target);
    setIsPopupOpen(true);
  };

  const handlePopupClose = (address, results) => {
    if (address) {
      if (popupTarget === 'user') {
        setUserInfo({ ...userInfo, address });
        setSearchResults({ ...searchResults, user: results });
      } else {
        const updatedFriends = friends.map((friend, index) => {
          if (index === popupTarget) {
            return { ...friend, address };
          }
          return friend;
        });
        setFriends(updatedFriends);
        setSearchResults({ ...searchResults, friends: { ...searchResults.friends, [popupTarget]: results } });
      }
    }
    setIsPopupOpen(false);
  };

  const handlePurposeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPurpose(selectedValue);
    if (selectedValue === '/test1') {
      navigate('/test1');
    }
  };

  const geocodeAddress = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    const { lat, lng } = response.data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  };

  const handleFindPlace = async () => {
    try {
      const addressInputs = [userInfo, ...friends];
      const geocodedInputs = await Promise.all(addressInputs.map(async input => {
        if (input.address) {  // 방어 코드 추가
          const { latitude, longitude } = await geocodeAddress(input.address);
          return { ...input, latitude, longitude };
        } else {
          return input;
        }
      }));
      const latitudes = geocodedInputs.map(input => input.latitude).filter(Boolean);  // 방어 코드 추가
      const longitudes = geocodedInputs.map(input => input.longitude).filter(Boolean);  // 방어 코드 추가

      const logicResponse = await axios.post('http://3.36.150.194:8080/midpoint/api/logic', {
        latitudes,
        longitudes
      });

      if (logicResponse.data.success) {
        const placesResponse = await axios.get('http://3.36.150.194:8080/midpoint/api/places', {
          params: {
            midpoint: logicResponse.data.midpoint,
            purpose: selectedPurpose
          }
        });

        if (placesResponse.data.length > 0) {
          navigate('/midpoint', { state: { places: placesResponse.data, district: logicResponse.data.midpointDistrict } });
        } else {
          navigate('/again');
        }
      } else {
        navigate('/again');
      }
    } catch (error) {
      console.error('Error finding place:', error);
      navigate('/again');
    }
  };

  const purposes = [
    { label: '목적 추천 TEST', value: '/test1' },
    { label: '맛집', value: 'restaurant' },
    { label: '카페', value: 'cafe' },
    { label: '산책/등산', value: 'hiking' },
    { label: '공부', value: 'study' },
    { label: '문화생활', value: 'culture' },
    { label: '핫플', value: 'hotplace' },
    { label: '친목', value: 'social' },
  ];

  return (
    <div style={commonStyles.container}>
      <Logo />
      <div style={commonStyles.content}>
        <div style={commonStyles.inputContainer}>
          <div style={commonStyles.profileContainer}>
            <img
              src={userInfo.profileImage}
              alt='프로필 이미지'
              style={commonStyles.profileImg}
            />
            <span style={commonStyles.profileName}>{userInfo.name}</span>
          </div>
          <div style={commonStyles.inputGroup}>
            <input
              type='text'
              placeholder='주소를 입력하세요'
              style={commonStyles.inputField}
              value={userInfo.address || ''}
              onClick={() => handlePopupOpen('user')}
              readOnly
            />
            <button type='button' style={commonStyles.submitButton}>
              검색
            </button>
          </div>
        </div>
        {friends.map((friend, index) => (
          <div key={index} style={commonStyles.inputContainer}>
            <div style={commonStyles.profileContainer}>
              <img
                src={friend.profile}
                alt='프로필 이미지'
                style={commonStyles.profileImg}
              />
              <span style={commonStyles.profileName}>{friend.name}</span>
            </div>
            <div style={commonStyles.inputGroup}>
              <input
                type='text'
                placeholder='주소를 입력하세요'
                style={commonStyles.inputField}
                value={friend.address || ''}
                onClick={() => handlePopupOpen(index)}
                readOnly
              />
              <button type='button' style={commonStyles.submitButton}>
                검색
              </button>
            </div>
          </div>
        ))}
        <div style={commonStyles.addButton} onClick={handleAddInput}></div>
        <div style={commonStyles.destination}>
          <select
            value={selectedPurpose}
            onChange={handlePurposeChange}
            style={commonStyles.selectField}
          >
            <option value='' disabled hidden>
              목적을 선택하세요
            </option>
            {purposes.map((purpose, index) => (
              <option key={index} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type='button'
            style={commonStyles.placeButton}
            onClick={handleFindPlace}
          >
            장소 찾기
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <HomePopup
          onClose={handlePopupClose}
          searchResults={popupTarget === 'user' ? searchResults.user : searchResults.friends[popupTarget] || []}
          setSearchResults={(results) => setSearchResults(prev => ({
            ...prev,
            [popupTarget === 'user' ? 'user' : 'friends']: {
              ...prev.friends,
              [popupTarget]: results
            }
          }))}
          isLoggedIn={isLoggedIn} // 로그인 상태 전달
        />
      )}
    </div>
  );
};

export default Home;
