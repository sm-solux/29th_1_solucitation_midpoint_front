import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReviewCard from '../review/ReviewCard';
import ReviewModal from '../review/ReviewModal';
import WriteModal from '../review/WriteModal';
import EditModal from '../review/EditModal';
import { reviewStyles } from '../../styles/reviewStyles';
import { refreshAccessToken } from '../../components/refreshAccess';
import { myPageStyles } from '../../styles/myPageStyles';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        try {
          await refreshAccessToken(refreshToken);
          setIsLoggedIn(true);
          setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        } catch (error) {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  return { currentUser, isLoggedIn, setIsLoggedIn };
};

const hashtagMap = {
  1: '#식사',
  2: '#카페',
  3: '#공부',
  4: '#문화생활',
  5: '#쇼핑',
  6: '#자연',
  7: '#산책',
  8: '#친목',
  9: '#여럿이',
  10: '#혼자',
};

const useFetchMyReviews = (isLoggedIn) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  const fetchReviewsMine = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/mine`,
        { headers }
      );

      const fetchedReviews = response.data.map((review) => ({
        postId: review.postId,
        firstImageUrl: review.firstImageUrl,
        title: review.title,
        hashtags: review.hashtags.map((tagId) => hashtagMap[tagId]),
        likes: review.likes,
      }));

      setReviews(fetchedReviews);
    } catch (error) {
      setError('게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch my reviews error:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchReviewsMine();
    }
  }, [isLoggedIn]);

  return { reviews, setReviews, error, setError };
};

const MyPagePosts = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const { reviews, setReviews, error, setError } = useFetchMyReviews(isLoggedIn);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviewDetails = useCallback(async (postId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        { headers }
      );

      const fetchedReviewDetails = {
        postId: postId,
        profileImageUrl: response.data.profileImagerUrl,
        nickname: response.data.nickname,
        title: response.data.title,
        content: response.data.content,
        createDate: response.data.createDate,
        postHashtags: response.data.postHashtags.map(
          (tagId) => hashtagMap[tagId]
        ),
        images: response.data.images,
        likeCnt: response.data.likeCnt,
        likes: response.data.likes,
      };

      setSelectedReview(fetchedReviewDetails);
      setReviewModalIsOpen(true);
    } catch (error) {
      setError('해당 게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch review details error:', error);
    }
  }, [setError]);

  const handleLikeToggle = (postId, newLikeStatus) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.postId === postId ? { ...review, likes: newLikeStatus } : review
      )
    );
  };

  const openWriteModal = () => {
    setWriteModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
  };

  const openEditModal = (review) => {
    setSelectedReview(review);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openReviewModal = async (postId) => {
    await fetchReviewDetails(postId);
    setReviewModalIsOpen(true);
  };

  const closeReviewModal = async () => {
    setReviewModalIsOpen(false);
    window.location.reload();
  };

  const handleWriteButtonClick = () => {
    openWriteModal();
  };

  return (
    <div>
      <div style={{ marginTop: '100px' }}></div>
      <div style={reviewStyles.reviewContainer}>
        {error ? (
          <p>{error}</p>
        ) : (
          reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.postId}
                review={review}
                onReviewClick={openReviewModal}
                onLikeToggle={handleLikeToggle}
              />
            ))
          ) : (
            <div style={myPageStyles.postsNone}>작성한 글이 없습니다.</div>
          )
        )}
      </div>
      <button
        onClick={handleWriteButtonClick}
        style={reviewStyles.writeButton}
      >
        <img
          src="/img/WriteButtonIcon.png"
          alt="write button"
          style={reviewStyles.writeButton}
        />
      </button>
      <WriteModal
        isOpen={writeModalIsOpen}
        closeModal={closeWriteModal}
        currentUser={currentUser}
        setReviews={setReviews}
      />
      {selectedReview && (
        <EditModal
          isOpen={editModalIsOpen}
          closeModal={closeEditModal}
          existingReview={selectedReview}
          currentUser={currentUser}
          setReviews={setReviews}
        />
      )}
      {selectedReview && (
        <ReviewModal
          isOpen={reviewModalIsOpen}
          review={selectedReview}
          closeModal={closeReviewModal}
          openEditModal={openEditModal}
          onLikeToggle={handleLikeToggle}
          deleteReview={(review) => {
            setReviews((prevReviews) =>
              prevReviews.filter((r) => r.postId !== review.postId)
            );
          }}
        />
      )}
    </div>
  );
};

export default MyPagePosts;