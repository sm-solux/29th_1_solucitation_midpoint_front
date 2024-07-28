import React, { useState } from 'react';
import axios from 'axios';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewCard = ({ review, onReviewClick }) => {
  const { firstImageUrl, hashtags, title, likes, postId } = review;
  const [liked, setLiked] = useState(likes);
  const [error, setError] = useState(null);

  const handleClick = () => {
    onReviewClick(postId); // postId를 전달
    console.log(postId);
  };

  const toggleLike = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
        {},
        { headers }
      );
      console.log(postId);

      if (response.status === 200) {
        if (response.data === '좋아요를 눌렀습니다!') {
          setLiked(true);
        } else if (response.data === '좋아요를 취소하였습니다!') {
          setLiked(false);
        }
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
            break;
          case 404:
            setError(error.response.data);
            break;
          case 500:
            setError(
              `좋아요 상태를 변경하는 중 오류가 발생하였습니다: ${error.message}`
            );
            console.log(postId);
            break;
          default:
            setError(`오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  const limitContentLength = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  return (
    <div style={reviewStyles.card} onClick={handleClick}>
      {firstImageUrl && (
        <img src={firstImageUrl} alt={title} style={reviewStyles.photo} />
      )}
      <div style={reviewStyles.details}>
        <div style={reviewStyles.tagsContainer}>
          <div style={reviewStyles.tags}>
            {hashtags.map((tag, index) => (
              <span key={index} style={reviewStyles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            style={
              liked ? reviewStyles.likeButtonActive : reviewStyles.likeButton
            }
          ></button>
        </div>
        <div style={reviewStyles.placeName}>{title}</div>
        <div style={reviewStyles.content}>{limitContentLength(title, 20)}</div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReviewCard;
