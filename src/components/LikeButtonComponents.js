import React, { useState, useCallback } from 'react';
import axios from 'axios';

export const useToggleLike = (postId, initialLiked = false, initialLikeCount = 0) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState(null);

  const toggleLike = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
      }

      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
        {},
        { headers }
      );

      if (response.status === 200) {
        setLiked(prevLiked => !prevLiked);
        setLikeCount(prevLikeCount => prevLikeCount + (liked ? -1 : 1));
        console.log(postId, liked ? '좋아요를 취소하였습니다!' : '좋아요를 눌렀습니다!');
      }
    } catch (error) {
      console.error('Error toggling like', error);
      const errorMessage = error.response ? error.response.data : error.message;

      switch (error.response?.status) {
        case 401:
          setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
          break;
        case 404:
          setError('해당 게시글을 찾을 수 없습니다.');
          break;
        case 500:
          setError(`좋아요 상태를 변경하는 중 오류가 발생하였습니다: ${errorMessage}`);
          break;
        default:
          setError(`오류가 발생하였습니다: ${errorMessage}`);
      }
    }
  }, [postId, liked]);

  return { liked, likeCount, toggleLike, error };
};

const LikeButton = ({ liked, toggleLike, likeCount }) => {
  const buttonStyle = {
    marginLeft:'10px',
    background: 'none',
    border: 'none',
    padding: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle = {
    border: 'none',
  };

  const handleClick = (e) => {
    e.stopPropagation();
    toggleLike();
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {liked ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/activeLiked.png`}
          alt="Active Liked Icon"
          style={iconStyle}
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/Liked.png`}
          alt="Like Icon"
          style={iconStyle}
        />
      )}
    </button>
  );
};

export default LikeButton;