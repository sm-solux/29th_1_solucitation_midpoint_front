import React, { useState } from "react";
import "../styles/global.css"; 
import { searchStyles } from '../styles/searchStyles';

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsPlaceholderVisible(false);
  };
  const handleInputBlur = () => {
    if (searchQuery === "") {
      setIsPlaceholderVisible(true);
    }
  };

    const handleSearch = () => {
    // API 받아오게 수정해야함
    console.log("Searching for:", searchQuery);
  };

  return (
    <div style={searchStyles.container}>
        <input
          type="text"
          style={searchStyles.input}
          placeholder={isPlaceholderVisible ? "검색어를 입력하세요" : ""}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}/>
        <button onClick={handleSearch} style={searchStyles.button}>검색</button>

      <button onClick={handleSearch} style={searchStyles.button}>
          글쓰기
        </button>
      </div>

  );
};

export default SearchBox;
