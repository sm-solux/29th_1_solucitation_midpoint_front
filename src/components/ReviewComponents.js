import React, { useState } from 'react';
import { reviewStyles } from '../styles/reviewStyles';
import axios from 'axios';

const ReviewCard = ({ review, onReviewClick }) => {
  const { firstImageUrl, hashtags, title, likes, postId } = review;
  const [liked, setLiked] = useState(likes);
  const [error, setError] = useState(null);

  const handleClick = () => {
    //console.log("ReviewCard clicked, postId:", postId);
    onReviewClick(postId);
  };

  const handleToggleLike = async (e) => {
    e.stopPropagation();
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

      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (error) {
      setError('좋아요 상태를 변경하는 중 오류가 발생하였습니다.');
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
          <button onClick={handleToggleLike} style={reviewStyles.likeButton}>
            {liked ? (
              <img
                src={`${process.env.PUBLIC_URL}/img/activeLiked.png`}
                alt="Active Liked Icon"
                style={reviewStyles.icon}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/img/Liked.png`}
                alt="Like Icon"
                style={reviewStyles.icon}
              />
            )}
          </button>
        </div>
        <div style={reviewStyles.placeName}>{title}</div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReviewCard;