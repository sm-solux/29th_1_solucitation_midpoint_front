import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { commonStyles } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import HomePopup from './HomePopup';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const Home = () => {
  const { userInfo, setUserInfo, friends, setFriends, selectedPurpose, setSelectedPurpose, isLoggedIn } = useContext(AppContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null); // 팝업이 열린 대상
  const [friendCount, setFriendCount] = useState(friends.length + 1);
  const [searchResults, setSearchResults] = useState({ user: [], friends: {} });
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found, setting default profile');
      return;
    }

    try {
      const response = await axios.get('http://3.36.150.194:8080/api/member/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setUserInfo({
          ...userInfo,
          nickname: response.data.nickname || '나',
          profileImage: response.data.profileImage || '/img/default-profile.png',
          address: response.data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setUserInfo({
        ...userInfo,
        nickname: '나',
        profileImage: '/img/default-profile.png',
        address: ''
      });
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때만 실행

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
        if (input.address) {
          const { latitude, longitude } = await geocodeAddress(input.address);
          return { ...input, latitude, longitude };
        } else {
          return input;
        }
      }));
      const latitudes = geocodedInputs.map(input => input.latitude).filter(Boolean);
      const longitudes = geocodedInputs.map(input => input.longitude).filter(Boolean);
  
      const logicResponse = await axios.post('http://3.36.150.194:8080/api/logic', {
        latitudes,
        longitudes
      });
  
      const isSuccess = logicResponse.data.success || (logicResponse.data.latitude && logicResponse.data.longitude);
  
      if (isSuccess) {
        const latitude = logicResponse.data.latitude.toFixed(6);
        const longitude = logicResponse.data.longitude.toFixed(6);
        const category = selectedPurpose || 'restaurant';
        const radius = 1000;
  
        const placesResponse = await axios.get('http://3.36.150.194:8080/api/places', {
          params: {
            latitude,
            longitude,
            category,
            radius
          }
        });
  
        if (placesResponse.data.length > 0) {
          const places = placesResponse.data.map(place => ({
            name: place.name,
            address: place.address,
            latitude: place.latitude,
            longitude: place.longitude,
            types: JSON.parse(place.types),
            placeID: place.placeID,
            image: place.photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` : '/img/default-image.png'
          }));
  
          navigate('/midpoint', { state: { places, district: logicResponse.data.midpointDistrict, midpoint: logicResponse.data, isLoggedIn } });
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
    { label: '산책', value: 'walk' },
    { label: '등산', value: 'hiking' },
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
              src={userInfo.profileImage || '/img/default-profile.png'}
              alt='프로필 이미지'
              style={commonStyles.profileImg}
            />
            <span style={commonStyles.profileName}>{isLoggedIn ? userInfo.nickname : '나'}</span>
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
          setAddress={(address) => {
            if (popupTarget === 'user') {
              setUserInfo({ ...userInfo, address });
            } else {
              const updatedFriends = friends.map((friend, index) => {
                if (index === popupTarget) {
                  return { ...friend, address };
                }
                return friend;
              });
              setFriends(updatedFriends);
            }
            setIsPopupOpen(false);
          }}
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
