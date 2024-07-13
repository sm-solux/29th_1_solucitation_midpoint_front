import React, { useState } from 'react';
import Modal from 'react-modal';
import { reviewModalStyles } from '../styles/reviewModalStyles';

const ReviewModal = ({ isOpen, review, closeModal, currentUser, openWriteModal, deleteReview }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);
  const isCurrentUser = currentUser && currentUser === review.author;

  if (!review) return null;

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleEditClick = () => {
    const editData = {
      ...review,
      author: currentUser,
    };
    openWriteModal(editData, true);
    closeModal();
  };

  const handleDeleteClick = () => {
    if (window.confirm('삭제하시겠습니까?')) { //삭제라서 일단 대충 구현해둠
      deleteReview(review);
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: reviewModalStyles.overlay, content: reviewModalStyles.modal }}
      contentLabel="Review Modal"
    >
      <button onClick={closeModal} style={reviewModalStyles.closeButton}>X</button>
      <div style={reviewModalStyles.profileContainer}>
        <img src="/img/default-profile.png" alt="profile" style={reviewModalStyles.profileImg} />
        <div style={reviewModalStyles.profileInfo}>
          <div style={reviewModalStyles.profileName}>{review.author}</div>
          <div style={reviewModalStyles.date}>YYYY.MM.DD. HH:MM</div>
        </div>
      </div>
      <div style={reviewModalStyles.contentContainer}>
        <div style={reviewModalStyles.placeName}>{review.placeName}</div>
        <p style={reviewModalStyles.content}>{review.content}</p>
        {review.photo && <img src={review.photo} alt="review" style={reviewModalStyles.photo} />}
      </div>
      <div style={reviewModalStyles.footer}>
        <div style={reviewModalStyles.likeSection}>
          <button onClick={toggleLike} style={liked ? reviewModalStyles.likeButtonActive : reviewModalStyles.likeButton}>
            {liked ? '♥' : '♡'}
          </button>
          <span style={reviewModalStyles.like}>좋아요 {likeCount}</span>
        </div>
        <div style={reviewModalStyles.tags}>
          {review.tags.map((tag, index) => (
            <span key={index} style={reviewModalStyles.tagButton}>{tag}</span>
          ))}
        </div>
        {isCurrentUser && (
          <div style={reviewModalStyles.editSection}>
            <button onClick={handleEditClick} style={reviewModalStyles.editButton}>
              <img src="/img/ReviewEditIcon.png" alt="edit" />
            </button>
            <button onClick={handleDeleteClick} style={reviewModalStyles.delButton}>
              <img src="/img/ReviewDelIcon.png" alt="delete" />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
