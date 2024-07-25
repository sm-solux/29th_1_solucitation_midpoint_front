import React, { useState } from 'react';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewCard = ({ review, onReviewClick }) => {
  const { firstImageUrl, hashtags, title, likes, postId } = review;
  const [liked, setLiked] = useState(likes);

  const handleClick = () => {
    onReviewClick(postId); // postId를 전달
  };

  const toggleLike = () => {
    setLiked(!liked);
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
          >
            {liked ? '♥' : '♡'}
          </button>
        </div>
        <div style={reviewStyles.placeName}>{title}</div>
        <div style={reviewStyles.content}>
          {limitContentLength(title, 20)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;