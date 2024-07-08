import React, { useState } from 'react';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

export const AddFriendModal = ({ isOpen, closeModal, addFriend }) => {
  const [newFriendName, setNewFriendName] = useState('');

  const handleAddFriend = () => {
    const newFriend = {
      id: Math.random(), // 임시 ID 생성
      name: newFriendName,
      profileImage: '/img/default-profile.png',
    };
    addFriend(newFriend);
    closeModal();
    setNewFriendName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel="WriteAddFriend"
    >
      <img src='/img/default-profile.png' style={myPageStyles.addImg} alt="addProfile" />
      <h3>친구 추가</h3>
      <input
        type="text"
        value={newFriendName}
        style={myPageStyles.input}
        onChange={(e) => setNewFriendName(e.target.value)}
        placeholder="등록할 장소 또는 주소 입력"
      />
      <button onClick={handleAddFriend} style={myPageStyles.addFriendModalButton}>추가</button>
      <button onClick={closeModal} style={myPageStyles.closeButton}>X</button>
    </Modal>
  );
};

export default AddFriendModal;
