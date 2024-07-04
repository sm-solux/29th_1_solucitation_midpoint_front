import React, {useState} from 'react';
import Modal from 'react-modal';
import { reviewModalStyles } from '../styles/reviewModalStyles';

const ReviewModal = ({ isOpen, review, closeModal }) => {
  const [liked, setLiked] = useState(false); 
  const [likeCount, setLikeCount] = useState(0);

  if (!review) return null;

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
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
        <img src='/img/Rectangle.png' alt="popup image" style={reviewModalStyles.profileImg} />
        <span style={reviewModalStyles.profileName}>솔룩션짱짱최고</span>
        <span style={reviewModalStyles.date}>YYYY.MM.DD. HH:MM </span>
      </div>
      <div>
        <div style={reviewModalStyles.placeName}>{review.placeName}</div>
        <p style={reviewModalStyles.content}>{review.content}</p>
        {review.photo && <img src={review.photo} alt="사진" style={{ width: '150px', height: '150px' }} />}
      </div>
      <button onClick={toggleLike} style={liked ? reviewModalStyles.likeButtonActive : reviewModalStyles.likeButton}>
        {liked ? '♥' : '♡'}
      </button>
      <span style={reviewModalStyles.like}>좋아요 {likeCount} </span>
      <div style={reviewModalStyles.tags}>
        {review.tags.map((tag, index) => (
          <span key={index} style={reviewModalStyles.tagButton}>
            {tag}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default ReviewModal;
