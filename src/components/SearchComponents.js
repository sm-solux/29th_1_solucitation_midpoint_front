import React, { useState } from "react";
import "../styles/global.css"; 
import { searchStyles } from '../styles/searchStyles';

export const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [clickedTags, setClickedTags] = useState([]);
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

  const handleSearch = () => {
    //검색어에 대한 출력
  };

  const handleTagClick = (tag) => {
    if (clickedTags.includes(tag)) {
      setClickedTags(clickedTags.filter(t => t !== tag));
    } else if (clickedTags.length < 2) {
      setClickedTags([...clickedTags, tag]);
    }
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
        <button style={searchStyles.button} onClick={handleSearch}>
          검색
        </button>

      </div>
      <div style={searchStyles.tagContainer}>
        <div style={searchStyles.tagList}>
          {tags.map((tag, index) => (
            <div 
              key={index} 
              style={{
                ...searchStyles.tag, 
                backgroundColor: clickedTags.includes(tag) ? '#1B4345' : 'transparent', 
                color: clickedTags.includes(tag) ? '#fff' : '#1B4345',
                borderColor: '#1B4345',
              }} 
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SearchBox;