import React from 'react';
import { myPageStyles } from '../styles/myPageStyles.js';

const FavoritesLocateComponents = () => {
  return (
    <div style={myPageStyles.favoritesLocateContainer}>
      <h3 style={{
        padding:'10px',
        textDecoration: 'underline',
        textAlign: 'center',
      }}>즐겨찾는 장소</h3>
      <div style={myPageStyles.locateontainer}>
        <img src='/img/homeIcon.png' width="22" height="22" style={myPageStyles.icon} alt="home" />
          집
          {'>'}
      </div>
      <div>
        <img src='/img/schoolIcon.png' width="22" height="22" alt="school"/>
        직장/학교
      
        {'>'}
      </div>
    </div>
  );
};

export default FavoritesLocateComponents;