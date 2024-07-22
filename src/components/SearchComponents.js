import React, { useState } from 'react';
import { searchStyles } from '../styles/searchStyles';

const SearchBox = ({
  reviews,
  setFilteredReviews,
  clickedTags,
  setClickedTags,
}) => {
  const [searchText, setSearchText] = useState('');
  const tags = [
    '식사', '카페', '공부', '문화생활', '쇼핑', '자연', '산책', '친목', '여럿이', '혼자'
  ];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setClickedTags((prevTags) => {
      let newTags;
      if (prevTags.includes(tag)) {
        newTags = prevTags.filter((t) => t !== tag);
      } else if (prevTags.length < 2) {
        newTags = [...prevTags, tag];
      } else {
        newTags = prevTags;
      }
      handleFiltering(newTags, searchText);
      return newTags;
    });
  };

  const handleFiltering = (tags, text) => {
    const filtered = reviews.filter((review) => {
      const hasTag =
        tags.length === 0 ||
        tags.some((tag) => review.tags.includes(`#${tag}`));
      const matchesSearch =
        text === '' ||
        review.content.toLowerCase().includes(text.toLowerCase());
      return hasTag && matchesSearch;
    });
    setFilteredReviews(filtered);
  };

  const handleSearch = () => {
    handleFiltering(clickedTags, searchText);
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #999;
          }
          input:focus::placeholder {
            color: transparent;
          }
        `}
      </style>
      <div style={searchStyles.container}>
        <div style={searchStyles.inputContainer}>
          <input
            type='text'
            style={searchStyles.input}
            placeholder={'검색어를 입력하세요'}
            value={searchText}
            onChange={handleInputChange}
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
                  cursor: 'pointer',
                }}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
