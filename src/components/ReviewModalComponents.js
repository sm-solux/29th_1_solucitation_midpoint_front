import React, { useState } from 'react';
import Modal from 'react-modal';
import { reviewModalStyles } from '../styles/reviewModalStyles';

const ReviewModal = ({ isOpen, review, closeModal, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  if (!review) return null;

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const isCurrentUser = currentUser && currentUser === review.author;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: reviewModalStyles.overlay, content: reviewModalStyles.modal }}
      contentLabel='Review Modal'
    >
      <button onClick={closeModal} style={reviewModalStyles.closeButton}>
        X
      </button>
      <div style={reviewModalStyles.profileContainer}>
        <img src='/img/default-profile.png' alt='profile image' style={reviewModalStyles.profileImg} />
        <div>
          <div style={reviewModalStyles.profileName}>{review.author}</div>
          <div style={reviewModalStyles.date}>YYYY.MM.DD. HH:MM</div>
        </div>
      </div>
      <div>
        <div style={reviewModalStyles.placeName}>{review.placeName}</div>
        <p style={reviewModalStyles.content}>{review.content}</p>
        {review.photo && <img src={review.photo} alt='사진' style={reviewModalStyles.photo} />}
      </div>
      <div style={reviewModalStyles.footer}>
        <div>
          <button onClick={toggleLike} style={liked ? reviewModalStyles.likeButtonActive : reviewModalStyles.likeButton}>
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
          <div>
            <button style={reviewModalStyles.editButton}>
              <img src='/img/ReviewEditIcon.png' alt='edit button' />
            </button>
            <button style={reviewModalStyles.delButton}>
              <img src='/img/ReviewDelIcon.png' alt='del button' />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
