import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { myPageStyles } from '../styles/myPageStyles';
import { commonStyles } from '../styles/styles';

Modal.setAppElement('#root');

const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const AddFriendModal = ({
  isOpen,
  closeModal,
  addFriend,
  editFriend,
  deleteFriend,
  selectedFriend,
  loading,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalFriend, setOriginalFriend] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (selectedFriend) {
      setName(selectedFriend.name);
      setAddress(selectedFriend.address || '');
      setSearchInput(selectedFriend.address || '');
      setLatitude(selectedFriend.latitude || '');
      setLongitude(selectedFriend.longitude || '');
      setOriginalFriend(selectedFriend);
      setIsEditing(false);
    } else {
      clearInputs();
      setIsEditing(true);
    }
  }, [selectedFriend]);

  useEffect(() => {
    if (searchInput.trim() !== '') {
      fetchCoordinates(searchInput);
    } else {
      setLatitude('');
      setLongitude('');
    }
  }, [searchInput]);

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GEOCODING_API_KEY,
          language: 'ko',
        },
      });

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } else {
        throw new Error('주소 검색 오류');
      }
    } catch (error) {
      setLatitude('');
      setLongitude('');
      setErrorMessage('주소 검색 오류: 주소를 다시 확인해주세요.');
      console.error('주소 검색 오류:', error.message);
    }
  };

  const clearInputs = () => {
    setName('');
    setAddress('');
    setSearchInput('');
    setLatitude('');
    setLongitude('');
    setErrorMessage('');
  };

  const handleAddFriend = () => {
    if (!name || !searchInput) {
      setErrorMessage('이름과 주소를 입력해주세요.');
      return;
    }

    if (name.length < 1 || name.length > 100) {
      setErrorMessage('이름은 최소 1글자 이상 최대 100글자 이하로 입력해야 합니다.');
      return;
    }

    if (searchInput.length < 1 || searchInput.length > 255) {
      setErrorMessage('주소는 최소 1글자 이상 최대 255글자 이하로 입력해야 합니다.');
      return;
    }

    const newFriend = {
      address: searchInput,
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {};

    axios.post(`${process.env.REACT_APP_API_URL}/api/favs/friends/save`, newFriend, { headers })
      .then((response) => {
        if (response.data.success) {
          addFriend({ ...newFriend, favFriendId: response.data.favFriendId });
          clearInputs();
          closeModal();
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error('친구 저장 오류:', error.message);
        setErrorMessage(getErrorMessage(error));
      });
  };

  const handleEditFriend = async () => {
    if (!name || !searchInput) {
      setErrorMessage('이름과 주소를 입력해주세요.');
      return;
    }

    if (name.length < 1 || name.length > 100) {
      setErrorMessage('이름은 최소 1글자 이상 최대 100글자 이하로 입력해야 합니다.');
      return;
    }

    if (searchInput.length < 1 || searchInput.length > 255) {
      setErrorMessage('주소는 최소 1글자 이상 최대 255글자 이하로 입력해야 합니다.');
      return;
    }

    const updatedFriend = {
      favFriendId: selectedFriend.favFriendId,
      name,
      address: searchInput,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    console.log(updatedFriend);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/favs/friends/update`,
        updatedFriend,
        { headers }
      );

      if (response.data.success) {
        editFriend({ ...updatedFriend });
        clearInputs();
        closeModal();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('친구 수정 오류:', error.message);
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleDeleteFriend = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      if (!selectedFriend || !selectedFriend.favFriendId) {
        setErrorMessage('친구 정보를 찾을 수 없습니다.');
        return;
      }

      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/favs/friends/delete?favFriendId=${selectedFriend.favFriendId}`,
          { headers }
        );

        if (response.data.success) {
          deleteFriend(selectedFriend);
          closeModal();
          clearInputs();
          setIsEditing(false);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('존재하지 않는 친구입니다.');
        } else {
          console.error('친구 삭제 오류:', error.message);
          setErrorMessage(getErrorMessage(error));
        }
      }
    }
  };

  const getErrorMessage = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return '인증 오류: 유효한 토큰이 필요합니다.';
      } else if (error.response.status === 400) {
        return error.response.data.message || '잘못된 요청입니다.';
      }
    }
    return '친구 처리 중 오류가 발생했습니다.';
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalFriend) {
      setName(originalFriend.name);
      setAddress(originalFriend.address || '');
      setLatitude(originalFriend.latitude || '');
      setLongitude(originalFriend.longitude || '');
      setSearchInput(originalFriend.address || '');
    }
    setIsEditing(false);
  };

  const fetchSuggestions = async (value) => {
    if (value.trim() !== '') {
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${GEOCODING_API_KEY}&language=ko`;
      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(targetUrl));
        const data = JSON.parse(response.data.contents);
        setSuggestions(data.predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setAddress(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.description);
    setSearchInput(suggestion.description);
    setSuggestions([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel="친구 추가/편집"
    >
      <img
        src="/img/default-profile.png"
        style={myPageStyles.addImg}
        alt="addProfile"
      />
      <input
        type="text"
        value={name}
        style={{ ...myPageStyles.inputName }}
        onChange={(e) => setName(e.target.value)}
        placeholder="친구 이름"
        disabled={!isEditing || loading}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="주소 입력"
          style={{ ...myPageStyles.inputLocate, backgroundColor: 'white' }}
          value={searchInput}
          onChange={handleSearchInputChange}
          disabled={!isEditing || loading}
        />
      </div>
      {suggestions.length > 0 && (
        <ul style={commonStyles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              style={commonStyles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        {selectedFriend ? (
          isEditing ? (
            <>
              <button
                onClick={handleEditFriend}
                style={myPageStyles.favoriteButtonEdit}
                disabled={loading}
              >
                저장
              </button>
              <button
                onClick={handleCancelEdit}
                style={myPageStyles.favoriteButtonQuit}
                disabled={loading}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                onClick={enableEditing}
                style={myPageStyles.favoriteButtonEdit}
                disabled={loading}
              >
                편집
              </button>
              <button
                onClick={handleDeleteFriend}
                style={myPageStyles.favoriteButtonQuit}
                disabled={loading}
              >
                삭제
              </button>
            </>
          )
        ) : (
          <button
            onClick={handleAddFriend}
            style={myPageStyles.addFriendModalButton}
            disabled={loading}
          >
            추가
          </button>
        )}
        <button onClick={closeModal} style={myPageStyles.closeButton} disabled={loading}>
          X
        </button>
      </div>
    </Modal>
  );
};

export default AddFriendModal;