import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { reviewModalStyles } from '../styles/reviewModalStyles';

const ReviewModal = ({
  isOpen,
  review,
  closeModal,
  currentUser,
  openWriteModal,
  deleteReview,
  toggleLike,
}) => {
  const [liked, setLiked] = useState(review.likes);
  const [likeCount, setLikeCount] = useState(review.likeCnt);
  const [error, setError] = useState(null);
  const isCurrentUser = currentUser && currentUser === review.nickname;

  useEffect(() => {
    setLiked(review.likes);
    setLikeCount(review.likeCnt);
  }, [review]);

  const handleToggleLike = async () => {
    try {
      await toggleLike(review.postId); // review.postId를 직접 전달
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      setError('좋아요 상태를 변경하는 중 오류가 발생하였습니다.');
    }
  };

  const handleEditClick = () => {
    openWriteModal(review, true);
    closeModal();
  };

  const photos = Array.isArray(review.images) ? review.images : [];
  const handleDeleteClick = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteReview(review);
      closeModal();
    }
  };

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
          <div style={reviewModalStyles.profileName}>{review.nickname}</div>
          <div style={reviewModalStyles.date}>{review.createDate}</div>
        </div>
      </div>
      <div style={reviewModalStyles.contentContainer}>
        <div style={reviewModalStyles.placeName}>{review.title}</div>
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
          <button onClick={handleToggleLike} style={reviewModalStyles.likeButton}>
            {liked ? (
              <img
                src={`${process.env.PUBLIC_URL}/img/activeLiked.png`}
                alt="Active Liked Icon"
                style={reviewModalStyles.icon}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/img/Liked.png`}
                alt="Like Icon"
                style={reviewModalStyles.icon}
              />
            )}
          </button>
          <span style={reviewModalStyles.like}>좋아요 {likeCount.toString()}</span>
        </div>
        <div style={reviewModalStyles.tags}>
          {review.postHashtags.map((tag, index) => (
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Modal>
  );
};

export default ReviewModal;
