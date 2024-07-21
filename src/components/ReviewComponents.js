import React, { useState } from 'react';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewCard = ({ review, onReviewClick }) => {
  const { photos, tags, placeName, content } = review;
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    onReviewClick(review);
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
      {photos && photos.length > 0 && (
        <img src={photos[0]} alt={placeName} style={reviewStyles.photo} />
      )}
      <div style={reviewStyles.details}>
        <div style={reviewStyles.tagsContainer}>
          <div style={reviewStyles.tags}>
            {tags.map((tag, index) => (
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
        <div style={reviewStyles.placeName}>{placeName}</div>
        <div style={reviewStyles.content}>
          {limitContentLength(content, 20)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;