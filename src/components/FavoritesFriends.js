import React, { useEffect, useState } from 'react';
import { myPageStyles } from '../styles/myPageStyles.js';
import { AddFriendModal } from '../components/AddFriendModal.js';

const FavoritesFriends = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const favoriteFriends = [
    { id: 1, name: '김규희', profileImage: '/img/default-profile.png', locate: '서울특별시 용산구' },
    { id: 2, name: '김소영', profileImage: '/img/default-profile.png', locate: '서울특별시 동작구' },
    { id: 3, name: '김채현', profileImage: '/img/default-profile.png', locate: '서울특별시 구로구' },
    { id: 4, name: '노경희', profileImage: '/img/default-profile.png', locate: '서울특별시 노원구' },
    { id: 5, name: '문서현', profileImage: '/img/default-profile.png', locate: '서울특별시 종로구' },
    { id: 6, name: '이혜지', profileImage: '/img/default-profile.png', locate: '서울특별시 강서구' },
    { id: 7, name: '최연재', profileImage: '/img/default-profile.png', locate: '서울특별시 마포구' },
  ];

  const openAddFriendModal = () => {
    setSelectedFriend(null);
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
    setFriends(favoriteFriends);

  }, []);

  const handleAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    closeAddFriendModal();
  };

  const handleEditFriend = (editedFriend) => {
    setFriends(friends.map(friend => friend.id === editedFriend.id ? editedFriend : friend));
    closeAddFriendModal();
  };

  const handleDeleteFriend = (friendToDelete) => {
    setFriends(friends.filter(friend => friend.id !== friendToDelete.id));
    closeAddFriendModal();
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsAddFriendModalOpen(true);
  };

  return (
    <div style={myPageStyles.favoritesFriendsContainer}>
      <h3 style={{ padding: '10px', textDecoration: 'underline', textAlign: 'center' }}>
        즐겨찾는 친구
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {friends.map((friend) => (
          <div
            key={friend.id}
            style={{ width: 'calc(33.33% - 20px)', margin: '10px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleFriendSelect(friend)}
          >
            <div>
              <img src={friend.profileImage || '/img/default-profile.png'} width="50" height="50" alt="profile" />
            </div>
            <div style={{ margin: '5px' }}>{friend.name}</div>
          </div>
        ))}
        <div style={{ width: 'calc(33.33% - 20px)', margin: '10px', textAlign: 'center' }}>
          <button onClick={openAddFriendModal} style={myPageStyles.addFriendButton}>
            <img src="/img/PlusFriend.png" alt="Add" style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
          </button>
        </div>
      </div>
      <AddFriendModal
        isOpen={isAddFriendModalOpen}
        closeModal={closeAddFriendModal}
        addFriend={handleAddFriend}
        editFriend={handleEditFriend}
        deleteFriend={handleDeleteFriend}
        selectedFriend={selectedFriend}
      />
    </div>
  );
};

export default FavoritesFriends;
