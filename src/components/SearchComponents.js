import React, { useState } from "react";
import "../styles/global.css"; 
import { searchStyles } from '../styles/searchStyles';

export const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const tags = ["식사", "카페", "공부","문화생활","쇼핑","자연","산책","친목","여럿이", "혼자"];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInputFocus = () => {
    setIsPlaceholderVisible(false);
  };

  const handleInputBlur = () => {
    if (searchText === "") {
      setIsPlaceholderVisible(true);
    }
  };

  const handleSearch = (tag) => {
    setSearchText(tag);
  };

  const handleWrite = () => {
    console.log("팝업 출력");
  };

  return (
    <div style={searchStyles.container}>
      <div style={searchStyles.inputContainer}>
        <input
          type="text"
          style={searchStyles.input}
          placeholder={isPlaceholderVisible ? "검색어를 입력하세요" : ""}
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <button style={searchStyles.button} onClick={() => handleSearch(searchText)}>
          검색
        </button>
        <button onClick={handleWrite} style={searchStyles.button}>
          글쓰기
        </button>
      </div>
    <div style={searchStyles.tagContainer}>
      <div style={searchStyles.tagList}>
        {tags.map((tag, index) => (
          <div key={index} style={searchStyles.tag} onClick={() => handleSearch(tag)}>
            {tag}
          </div>
        ))}
      </div>
      </div>
          </div>
  );
};

export default SearchBox;
