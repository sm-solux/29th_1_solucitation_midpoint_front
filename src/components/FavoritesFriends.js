import React from 'react';
import { myPageStyles } from '../styles/myPageStyles.js';

const FavoritesFriends = () => {
  return (
    <div style={myPageStyles.favoritesFriendsContainer}>
      <h3 style={{
        padding:'10px',
        textDecoration: 'underline',
        textAlign: 'center',
      }}>즐겨찾는 친구</h3>
      <div>
        <div>
          <img src='/img/default-profile.png' width="50" height="50" alt="profile" />
        </div>
          김규희
      </div>

    </div>
  );
};

export default FavoritesFriends;