import React from 'react';
import { reviewStyles } from '../../styles/reviewStyles';
import LikeButton, { useToggleLike } from '../../components/LikeButtonComponents';

const ReviewCard = ({ review, onReviewClick, onLikeToggle }) => {
  const { firstImageUrl, hashtags, title, postId, likes, likeCnt } = review;
  const { liked, likeCount, toggleLike, error } = useToggleLike(postId, likes, likeCnt);

  const handleClick = () => {
    onReviewClick(postId);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    await toggleLike();
    onLikeToggle(postId, !liked);
  };

  const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

  return (
    <div style={reviewStyles.card} onClick={handleClick}>
      {firstImageUrl && (
        <div style={reviewStyles.photoContainer}>
          <img src={firstImageUrl} alt={title} style={reviewStyles.photo} />
        </div>
      )}
      <div style={reviewStyles.tagsContainer}>
        <div style={reviewStyles.tags}>
          {hashtags.map((tag, index) => (
            <span key={index} style={reviewStyles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <LikeButton liked={liked} toggleLike={handleLike} likeCount={likeCount} />
      </div>
      <div style={reviewStyles.placeName}>{truncatedTitle}</div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReviewCard;