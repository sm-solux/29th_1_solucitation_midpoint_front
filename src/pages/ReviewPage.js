import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Logo } from '../components/CommonComponents';
import SearchBox from '../components/SearchComponents';
import ReviewCard from './review/ReviewCard';
import ReviewModal from './review/ReviewModal';
import WriteModal from './review/WriteModal';
import EditModal from './review/EditModal';
import { reviewStyles } from '../styles/reviewStyles';
import { refreshAccessToken } from '../components/refreshAccess';

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

const useFetchReviews = (isLoggedIn) => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { headers }
      );

      const fetchedReviews = response.data.map((review) => ({
        postId: review.postId,
        firstImageUrl: review.firstImageUrl,
        title: review.title,
        hashtags: review.hashtags.map((tagId) => hashtagMap[tagId]),
        likes: isLoggedIn ? review.likes : false,
      }));

      console.log(fetchedReviews);
      setReviews(fetchedReviews);
      setFilteredReviews(fetchedReviews);
    } catch (error) {
      setError('게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch reviews error:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [isLoggedIn]);

  return {
    reviews,
    filteredReviews,
    setFilteredReviews,
    error,
    setError,
    setReviews,
    fetchReviews,
  };
};

const ReviewPage = () => {
  const { currentUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const {
    reviews,
    filteredReviews,
    setFilteredReviews,
    error,
    setError,
    setReviews,
    fetchReviews,
  } = useFetchReviews(isLoggedIn);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [clickedTags, setClickedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviewDetails = useCallback(async (postId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
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

      console.log(fetchedReviewDetails);
      setSelectedReview(fetchedReviewDetails);
    } catch (error) {
      setError('해당 게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch review details error:', error);
    }
  }, []);

  const handleLikeToggle = (postId, newLikeStatus) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.postId === postId ? { ...review, likes: newLikeStatus } : review
      )
    );

    if (selectedReview && selectedReview.postId === postId) {
      setSelectedReview({ ...selectedReview, likes: newLikeStatus });
    }
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
    //document.querySelector('#root').setAttribute('inert', 'true'); // 가끔 있는 button 에러 때문에 구현,, 뺄 지 고민 배경 요소 비활성화
  };

  const closeReviewModal = async () => {
    setReviewModalIsOpen(false);
    await fetchReviews(); // 모달을 닫을 때 리뷰 새로고침
    //document.querySelector('#root').removeAttribute('inert'); // 배경 요소 활성화
  };

  const handleWriteButtonClick = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!isLoggedIn && refreshToken) {
      try {
        await refreshAccessToken(refreshToken);
        setIsLoggedIn(true);
        openWriteModal();
      } catch (error) {
        alert('로그인 후 사용 가능합니다.');
      }
    } else if (isLoggedIn) {
      openWriteModal();
    } else {
      alert('로그인 후 사용 가능합니다.');
    }
  };

  return (
    <div>
      <Logo bgColor="#F2F2F2" />
      <div style={{ marginTop: '120px' }}>
        <SearchBox
          setFilteredReviews={setFilteredReviews}
          setSearchTerm={setSearchTerm}
          clickedTags={clickedTags}
          setClickedTags={setClickedTags}
        />
      </div>
      <div style={reviewStyles.reviewContainer}>
        {error ? (
          <p>{error}</p>
        ) : (
          (filteredReviews.length > 0 ? filteredReviews : reviews).map((review) => (
            <ReviewCard
              key={review.postId}
              review={review}
              onReviewClick={openReviewModal}
              onLikeToggle={handleLikeToggle}
            />
          ))
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

export default ReviewPage;