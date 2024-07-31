import React from 'react';
import FavoritesLocateComponents from '../../components/FavoritesLocateComponents.js';
import FavoritesFriends from '../../components/FavoritesFriends.js';
import { myPageStyles } from '../../styles/myPageStyles.js';

const MyPageFavorites = () => {
  return (
    <div style={myPageStyles.favoritesContainer}>
      <FavoritesLocateComponents />
      <FavoritesFriends />
    </div>
  );
};

export default MyPageFavorites;
