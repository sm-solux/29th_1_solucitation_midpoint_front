import React, { useState } from 'react';
import axios from 'axios';
import { searchStyles } from '../styles/searchStyles';

const SearchBox = ({ setFilteredReviews, setSearchTerm, clickedTags, setClickedTags }) => {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  const tags = [
    { id: 1, name: '식사' },
    { id: 2, name: '카페' },
    { id: 3, name: '공부' },
    { id: 4, name: '문화생활' },
    { id: 5, name: '쇼핑' },
    { id: 6, name: '자연' },
    { id: 7, name: '산책' },
    { id: 8, name: '친목' },
    { id: 9, name: '여럿이' },
    { id: 10, name: '혼자' },
  ];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setClickedTags((prevTags) => {
      if (prevTags.includes(tag.id)) {
        const newTags = prevTags.filter((t) => t !== tag.id);
        fetchByTags(newTags);
        return newTags;
      } else if (prevTags.length < 2) {
        const newTags = [...prevTags, tag.id];
        fetchByTags(newTags);
        return newTags;
      } else {
        window.confirm('태그는 2개까지 선택할 수 있습니다.');
        return prevTags;
      }
    });
  };

  //태그로 검색
  const fetchByTags = async (tags) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const params = { purpose: tags };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/purpose?purpose={purpose}`, {
        params,
        headers,
      });

      if (response.status === 200) {
        const data = response.data.map((item) => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags,
          likes: item.likes,
        }));
        setFilteredReviews(data);
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('최소 하나 이상의 해시태그를 선택해야 합니다.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  //검색어로 검색
  const fetchBySearchTerm = async (text) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const params = { query: text };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/query?query={query}`, {
        params,
        headers,
      });

      if (response.status === 200) {
        const data = response.data.map((item) => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags,
          likes: item.likes,
        }));
        setFilteredReviews(data);
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('검색어를 입력해주세요.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  const handleSearch = () => {
    fetchBySearchTerm(searchText);
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #1B4345;
            font-family: 'Freesentation', sans-serif;
            font-size: 18px;
          }
          input:focus::placeholder {
            opacity: 0;
          }
        `}
      </style>
      <div style={searchStyles.searchContainer}>
        <div style={searchStyles.inputContainer}>
          <input
            type='text'
            style={searchStyles.input}
            placeholder='검색어를 입력하세요'
            value={searchText}
            onChange={handleInputChange}
          />
          <button style={searchStyles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
        <div style={searchStyles.searchTagContainer}>
          <div style={searchStyles.searchTagList}>
            {tags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  ...searchStyles.searchTag,
                  backgroundColor: clickedTags.includes(tag.id) ? '#1B4345' : 'transparent',
                  color: clickedTags.includes(tag.id) ? '#fff' : '#1B4345',
                  borderColor: '#1B4345',
                  cursor: 'pointer',
                }}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default SearchBox;
