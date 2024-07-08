import React, { useEffect, useState } from 'react';
import { myPageStyles } from '../styles/myPageStyles.js';
import { AddFriendModal } from '../components/AddFriendModal.js';

const FavoritesFriends = () => {
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const mockFriends = [
  { id: 1, name: '김규희', profileImage: '/img/default-profile.png' },
  { id: 2, name: '김소영', profileImage: '/img/default-profile.png' },
  { id: 3, name: '김채현', profileImage: '/img/default-profile.png' },
  { id: 4, name: '노경희', profileImage: '/img/default-profile.png' },
  { id: 5, name: '문서현', profileImage: '/img/default-profile.png' },
  { id: 6, name: '이혜지', profileImage: '/img/default-profile.png' },
  { id: 7, name: '최연재', profileImage: '/img/default-profile.png' },

  ];
  
  const openAddFriendModal = () => {
    setIsAddFriendModalOpen(true);
  };

  const closeAddFriendModal = () => {
    setIsAddFriendModalOpen(false);
  };
  useEffect(() => {
    /* 친구 목록을 가져옵니다
    fetch('/api/friends')
      .then(response => response.json())
      .then(data => setFriends(data))
      .catch(error => console.error('오류 발생:', error));
  }, []);*/
    //그냥 출력해보려고 쓴 코드
    setFriends(mockFriends);

  }, []);

  const handleAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    closeAddFriendModal();
  };

  return (
    <div style={myPageStyles.favoritesFriendsContainer}>
      <h3 style={{ padding: '10px', textDecoration: 'underline', textAlign: 'center' }}>
        즐겨찾는 친구
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {friends.map(friend => (
          <div key={friend.id} style={{ width: 'calc(33.33% - 20px)', margin: '10px', textAlign: 'center' }}>
            <div>
              <img src={friend.profileImage || '/img/default-profile.png'} width="50" height="50" alt="profile" />
            </div>
            {friend.name}
          </div>
        ))}
        <div style={{ width: 'calc(33.33% - 20px)', margin: '10px', textAlign: 'center' }}>
          <button onClick={openAddFriendModal} style={myPageStyles.addFriendButton}>
            <img src="/img/PlusFriend.png" alt="Add" style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
          </button>
        </div>
      </div>
      <AddFriendModal isOpen={isAddFriendModalOpen} closeModal={closeAddFriendModal} addFriend={handleAddFriend} />
    </div>
  );
};


export default FavoritesFriends;