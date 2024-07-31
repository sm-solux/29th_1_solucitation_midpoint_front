import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { reviewModalStyles } from '../../styles/reviewModalStyles';
import LikeButton, { useToggleLike } from '../../components/LikeButtonComponents';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

const ReviewModal = ({ isOpen, review, closeModal, openEditModal, deleteReview, onLikeToggle }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const { liked, likeCount, toggleLike, error: likeError } = useToggleLike(review.postId, review.likes, review.likeCnt);

  useEffect(() => {
    if (isOpen) {
      const fetchProfileData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          
          if (!accessToken) {
            return;
          }
          
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/profile`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const data = response.data;
          setProfileData({
            nickname: data.nickname,
            profileImage: data.profileImageUrl,
          });
        } catch (error) {
          setError('프로필 정보를 불러오는 중 에러 발생');
        }
      };

      fetchProfileData();
    }
  }, [isOpen]);

  const handleEditClick = () => {
    openEditModal(review);
    closeModal();
  };

  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${review.postId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        deleteReview(review);
        closeModal();
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setError('로그인이 필요합니다.');
              break;
            case 404:
              setError('해당 게시글이 존재하지 않습니다.');
              break;
            case 403:
              setError('해당 게시글을 삭제할 권한이 없습니다. 본인이 작성한 글만 삭제할 수 있습니다.');
              break;
            case 500:
              setError('게시글 삭제 중 오류가 발생하였습니다.');
              break;
            default:
              setError(`오류가 발생하였습니다: ${error.message}`);
          }
        } else if (error.request) {
          setError('서버와 연결할 수 없습니다.');
        } else {
          setError(`오류가 발생하였습니다: ${error.message}`);
        }
      }
    }
  };

  const handleLike = async () => {
    await toggleLike();
    onLikeToggle(review.postId, !liked);
  };

  const photos = Array.isArray(review.images) ? review.images : [];
  const isCurrentUser = profileData && profileData.nickname === review.nickname;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: reviewModalStyles.overlay,
        content: reviewModalStyles.modal,
      }}
      contentLabel="Review Modal"
    >
      <button onClick={closeModal} style={reviewModalStyles.closeButton}>
        X
      </button>
      <div style={reviewModalStyles.profileContainer}>
        <img
          src={review.profileImageUrl}
          alt="profile"
          style={reviewModalStyles.profileImg}
        />
        <div style={reviewModalStyles.profileInfo}>
          <div style={reviewModalStyles.profileName}>{review.nickname}</div>
          <div style={reviewModalStyles.date}>
            {formatDate(review.createDate)}
          </div>
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
          <LikeButton liked={liked} toggleLike={handleLike} likeCount={likeCount} />
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
              <img src="/img/ReviewEditIcon.png" alt="edit" />
            </button>
            <button
              onClick={handleDeleteClick}
              style={reviewModalStyles.delButton}
            >
              <img src="/img/ReviewDelIcon.png" alt="delete" />
            </button>
          </div>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {likeError && <p style={{ color: 'red' }}>{likeError}</p>}
    </Modal>
  );
};

export default ReviewModal;