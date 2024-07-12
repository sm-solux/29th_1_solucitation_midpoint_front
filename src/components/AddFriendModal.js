import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

export const AddFriendModal = ({ isOpen, closeModal, addFriend, editFriend, deleteFriend, selectedFriend }) => {
  const [friendName, setFriendName] = useState('');
  const [location, setLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedFriend) {
      setFriendName(selectedFriend.name);
      setLocation(selectedFriend.locate);
      setIsEditing(false);
    } else {
      clearInputs();
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
    closeModal();
    clearInputs();
  };

  const handleEditFriend = () => {
    const updatedFriend = {
      ...selectedFriend,
      name: friendName,
      locate: location,
    };
    editFriend(updatedFriend);
    // Re-set the fields with updated data without closing the modal
    setFriendName(updatedFriend.name);
    setLocation(updatedFriend.locate);
    setIsEditing(false);
  };

  const handleDeleteFriend = () => {
    deleteFriend(selectedFriend);
    closeModal();
    clearInputs();
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel="친구 추가/편집"
    >
      <img src='/img/default-profile.png' style={myPageStyles.addImg} alt="addProfile" />
      <input
        type='text'
        value={friendName}
        style={myPageStyles.inputName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder='친구 이름'
      />
      <input
        type="text"
        value={location}
        style={{
          ...myPageStyles.inputLocate,
          backgroundColor: !!selectedFriend && !!selectedFriend.locate && !isEditing ? '#fff' : '#fff'
        }}
        onChange={(e) => setLocation(e.target.value)}
        placeholder='장소 또는 주소 입력'
        disabled={!!selectedFriend && !!selectedFriend.locate && !isEditing}
      />
      {selectedFriend ? (
        <div>
          {isEditing ? (
            <>
              <button onClick={handleEditFriend} style={myPageStyles.favoriteButtonEdit}>저장</button>
              <button onClick={() => setIsEditing(false)} style={myPageStyles.favoriteButtonQuit}>취소</button>
            </>
          ) : (
            <>
              <button onClick={enableEditing} style={myPageStyles.favoriteButtonEdit}>편집</button>
              <button onClick={handleDeleteFriend} style={myPageStyles.favoriteButtonQuit}>삭제</button>
            </>
          )}
        </div>
      ) : (
        <button onClick={handleAddFriend} style={myPageStyles.addFriendModalButton}>추가</button>
      )}
      <button onClick={closeModal} style={myPageStyles.closeButton}>X</button>
    </Modal>
  );
};

export default AddFriendModal;
