import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

export const AddFriendModal = ({
  isOpen,
  closeModal,
  addFriend,
  editFriend,
  deleteFriend,
  selectedFriend,
}) => {
  const [friendName, setFriendName] = useState('');
  const [location, setLocation] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [originalFriend, setOriginalFriend] = useState(null);

  useEffect(() => {
    if (selectedFriend) {
      setFriendName(selectedFriend.name);
      setLocation(selectedFriend.locate);
      setOriginalFriend(selectedFriend);
      setIsEditing(false);
      setIsAdded(selectedFriend.locate.trim() !== '');
    } else {
      clearInputs();
      setIsEditing(true);
    }
  }, [selectedFriend]);

  const clearInputs = () => {
    setFriendName('');
    setLocation('');
  };

  const handleAddFriend = () => {
    const newFriend = {
      id: Math.random(),
      name: friendName,
      profileImage: '/img/default-profile.png',
      locate: location,
    };
    addFriend(newFriend);
    setIsAdded(true);
    clearInputs();
  };

  const handleEditFriend = () => {
    const updatedFriend = {
      ...selectedFriend,
      name: friendName,
      locate: location,
    };
    editFriend(updatedFriend);
    setFriendName(updatedFriend.name);
    setLocation(updatedFriend.locate);
    setIsEditing(false);
  };

  const handleDeleteFriend = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteFriend(selectedFriend);
      closeModal();
      clearInputs();
      setIsEditing(true);
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalFriend) {
      setFriendName(originalFriend.name);
      setLocation(originalFriend.locate);
    }
    setIsEditing(false);
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #1B4345;
            font-family: 'Freesentation', sans-serif;
            font-size: 18px;
          }
          input:focus::placeholder {
            opacity: 0;
          }
        `}
      </style>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
        contentLabel='친구 추가/편집'
      >
        <img
          src='/img/default-profile.png'
          style={myPageStyles.addImg}
          alt='addProfile'
        />
        <input
          type='text'
          value={friendName}
          style={myPageStyles.inputName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder='친구 이름'
        />
        <input
          type='text'
          value={location}
          style={{
            ...myPageStyles.inputLocate,
            backgroundColor: '#fff',
            color: '#1B4345',
          }}
          disabled={!isEditing && isAdded}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='장소 또는 주소 입력'
        />
        {selectedFriend ? (
          <div>
            {isEditing ? (
              <>
                <button
                  onClick={handleEditFriend}
                  style={myPageStyles.favoriteButtonEdit}
                >
                  저장
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={myPageStyles.favoriteButtonQuit}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={enableEditing}
                  style={myPageStyles.favoriteButtonEdit}
                >
                  편집
                </button>
                <button
                  onClick={handleDeleteFriend}
                  style={myPageStyles.favoriteButtonQuit}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={handleAddFriend}
            style={myPageStyles.addFriendModalButton}
          >
            추가
          </button>
        )}
        <button onClick={closeModal} style={myPageStyles.closeButton}>
          X
        </button>
      </Modal>
    </>
  );
};

export default AddFriendModal;
