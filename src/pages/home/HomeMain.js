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
    try {
      const response = await axios.get('/api/member/profile', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
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
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const handleFindPlace = async () => {
    try {
      const addressInputs = [userInfo, ...friends];
      const latitudes = addressInputs.map(input => input.latitude);
      const longitudes = addressInputs.map(input => input.longitude);

      const logicResponse = await axios.post('/api/logic', {
        latitudes,
        longitudes
      });

      if (logicResponse.data.success) {
        const placesResponse = await axios.get('/api/places', {
          params: {
            midpoint: logicResponse.data.midpoint,
            purpose: selectedPurpose
          }
        });

        if (placesResponse.data.success && placesResponse.data.places.length > 0) {
          navigate('/midpoint');
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
    { label: '맛집', value: '/restaurant' },
    { label: '카페', value: '/cafe' },
    { label: '산책/등산', value: '/hiking' },
    { label: '공부', value: '/study' },
    { label: '문화생활', value: '/culture' },
    { label: '핫플', value: '/hotplace' },
    { label: '친목', value: '/social' },
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
        />
      )}
    </div>
  );
};

export default Home;
