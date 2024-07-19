import React, { useState } from 'react';
import Modal from 'react-modal';
import { reviewModalStyles } from '../styles/reviewModalStyles';

const ReviewModal = ({
  isOpen,
  review,
  closeModal,
  currentUser,
  openWriteModal,
  deleteReview,
  setReviews,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);
  const isCurrentUser = currentUser && currentUser === review.author;

  if (!review) return null;

  const toggleLike = () => {
    setLiked(!liked);
    const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(updatedLikeCount);
    setReviews((prevReviews) =>
      prevReviews.map((r) =>
        r.id === review.id ? { ...r, likes: updatedLikeCount } : r
      )
    );
  };

  const handleEditClick = () => {
    console.log('handleEditClick 호출됨', { review }); // 디버깅용 로그
    const editData = {
      ...review,
      author: currentUser,
    };
    openWriteModal(editData, true);
    closeModal();
  };

  const handleDeleteClick = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteReview(review);
      closeModal();
    }
  };

  const photos = Array.isArray(review.photos) ? review.photos : [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: reviewModalStyles.overlay,
        content: reviewModalStyles.modal,
      }}
      contentLabel='Review Modal'
    >
      <button onClick={closeModal} style={reviewModalStyles.closeButton}>
        X
      </button>
      <div style={reviewModalStyles.profileContainer}>
        <img
          src='/img/default-profile.png'
          alt='profile'
          style={reviewModalStyles.profileImg}
        />
        <div style={reviewModalStyles.profileInfo}>
          <div style={reviewModalStyles.profileName}>{review.author}</div>
          <div style={reviewModalStyles.date}>
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      <div style={reviewModalStyles.contentContainer}>
        <div style={reviewModalStyles.placeName}>{review.placeName}</div>
        <p style={reviewModalStyles.content}>{review.content}</p>
        <div style={reviewModalStyles.photosContainer}>
          {photos.map(
            (photo, index) =>
              photo && (
                <img
                  key={index}
                  src={photo}
                  alt={`review ${index + 1}`}
                  style={reviewModalStyles.photo}
                />
              )
          )}
        </div>
      </div>
      <div style={reviewModalStyles.footer}>
        <div style={reviewModalStyles.likeSection}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            style={
              liked
                ? reviewModalStyles.likeButtonActive
                : reviewModalStyles.likeButton
            }
          >
            {liked ? '♥' : '♡'}
          </button>
          <span style={reviewModalStyles.like}>좋아요 {likeCount}</span>
        </div>
        <div style={reviewModalStyles.tags}>
          {review.tags.map((tag, index) => (
            <span key={index} style={reviewModalStyles.tagButton}>
              {tag}
            </span>
          ))}
        </div>
        {isCurrentUser && (
          <div style={reviewModalStyles.editSection}>
            <button
              onClick={handleEditClick}
              style={reviewModalStyles.editButton}
            >
              <img src='/img/ReviewEditIcon.png' alt='edit' />
            </button>
            <button
              onClick={handleDeleteClick}
              style={reviewModalStyles.delButton}
            >
              <img src='/img/ReviewDelIcon.png' alt='delete' />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
