import React from 'react';
import './SearchBox.css';

function SearchBox({ label }) {
  return (
    <div className="search-box">
      <div className="avatar"></div>
      <div className="label">{label}</div>
      <input type="text" placeholder="주소를 입력하세요" className="search-input" />
      <button className="search-button">검색</button>
    </div>
  );
}

export default SearchBox;
