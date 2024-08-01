import React from 'react';
import { reviewStyles } from '../../styles/reviewStyles';
import LikeButton, { useToggleLike } from '../../components/LikeButtonComponents';

const ReviewCard = ({ review, onReviewClick }) => {
  const { firstImageUrl, hashtags, title, postId } = review;
  const { liked, toggleLike, error } = useToggleLike(postId, review.likes);

  const handleClick = () => {
    onReviewClick(postId);
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
          <LikeButton liked={liked} toggleLike={toggleLike} />
        </div>
        <div style={reviewStyles.placeName}>{title}</div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReviewCard;