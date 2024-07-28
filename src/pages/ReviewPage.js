import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Logo } from '../components/CommonComponents';
import SearchBox from '../components/SearchComponents';
import ReviewCard from '../components/ReviewComponents';
import ReviewModal from '../components/ReviewModalComponents';
import WriteModal from '../components/WriteModalComponents';
import { reviewStyles } from '../styles/reviewStyles';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('currentUser');
    if (userToken && storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return { currentUser, isLoggedIn };
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

//리뷰 불러오기
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
        likeCnt: review.likeCnt // likeCnt 추가
      }));

      setReviews(fetchedReviews);
      setFilteredReviews(fetchedReviews);
    } catch (error) {
      setError('게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch reviews error:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    filteredReviews,
    setFilteredReviews,
    error,
    setError,
    setReviews,
  };
};

const ReviewPage = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const {
    reviews,
    filteredReviews,
    setFilteredReviews,
    error,
    setError,
    setReviews,
  } = useFetchReviews(isLoggedIn);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [clickedTags, setClickedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 게시글 상세보기
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

      console.log("Response data:", response.data); // 응답 데이터 로깅

      // response data 받기
      const fetchedReviewDetails = {
        postId: postId, // postId를 직접 설정
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

      console.log("Fetched review details:", fetchedReviewDetails); // fetchedReviewDetails 로깅
      setSelectedReview(fetchedReviewDetails);
      setReviewModalIsOpen(true); // Open review modal
    } catch (error) {
      setError('해당 게시글 조회 중 오류가 발생하였습니다.');
      console.error('Fetch review details error:', error);
    }
  }, []);

  const openWriteModal = () => {
    setSelectedReview(null);
    setWriteModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setSelectedReview(null);
  };

  const openReviewModal = async (postId) => {
    console.log("Opening review modal for postId:", postId); // postId 로깅
    await fetchReviewDetails(postId);
    console.log("Selected review after fetching details:", selectedReview); // selectedReview 로깅
  };

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setSelectedReview(null);
  };

  const handleWriteButtonClick = () => {
    openWriteModal();
  };

  const addReview = async (newReview, isEditing) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };

      const formData = new FormData();
      formData.append(
        'postDto',
        JSON.stringify({
          title: newReview.placeName,
          content: newReview.content,
          postHashtag: newReview.tags,
        })
      );
      newReview.photos.forEach((photo) => formData.append('postImages', photo));

      let response;
      if (isEditing && selectedReview) {
        response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/posts/${selectedReview.postId}`,
          formData,
          { headers }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/posts`,
          formData,
          { headers }
        );
      }

      setReviews((prevReviews) => {
        if (isEditing && selectedReview) {
          return prevReviews.map((review) =>
            review.postId === selectedReview.postId ? response.data : review
          );
        }
        return [...prevReviews, response.data];
      });
      alert(
        isEditing
          ? '게시글을 성공적으로 수정하였습니다.'
          : '게시글을 성공적으로 등록하였습니다.'
      );
      window.location.reload(); // 페이지 새로 고침
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.errors
            ? error.response.data.errors
                .map((err) => `${err.field}: ${err.message}`)
                .join(', ')
            : error.response.data;
          setError(errorMessage);
        } else if (error.response.status === 401) {
          setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
        } else if (error.response.status === 404) {
          setError('해당 게시글이 존재하지 않습니다.');
        } else if (error.response.status === 403) {
          setError(
            '해당 게시글을 수정할 권한이 없습니다. 본인이 작성한 글만 수정할 수 있습니다.'
          );
        } else {
          setError(
            `게시글 등록 과정에서 오류가 발생하였습니다: ${error.response.data}`
          );
        }
      } else {
        setError(
          `게시글 등록 과정에서 오류가 발생하였습니다: ${error.message}`
        );
      }
      console.error('Error adding review:', error);
    }
  };

  const toggleLike = async (postId) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
        {},
        { headers }
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.postId === postId
              ? { ...review, likes: !review.likes, likeCnt: review.likes ? review.likeCnt - 1 : review.likeCnt + 1 }
              : review
          )
        );

        if (selectedReview && selectedReview.postId === postId) {
          setSelectedReview((prevReview) => ({
            ...prevReview,
            likes: !prevReview.likes,
            likeCnt: prevReview.likes ? prevReview.likeCnt - 1 : prevReview.likeCnt + 1,
          }));
        }
        setError(null);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
            break;
          case 404:
            setError(error.response.data);
            break;
          case 500:
            setError(
              `좋아요 상태를 변경하는 중 오류가 발생하였습니다: ${error.message}`
            );
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
  };

  return (
    <div>
      <Logo bgColor='#F2F2F2' />
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
          (filteredReviews.length > 0 ? filteredReviews : reviews).map(
            (review) => (
              <ReviewCard
                key={review.postId}
                review={review}
                onReviewClick={openReviewModal}
              />
            )
          )
        )}
      </div>
      <button onClick={handleWriteButtonClick} style={reviewStyles.writeButton}>
        <img
          src='/img/WriteButtonIcon.png'
          alt='write button'
          style={reviewStyles.writeButton}
        />
      </button>
      {selectedReview && (
        <ReviewModal
          isOpen={reviewModalIsOpen}
          review={selectedReview}
          closeModal={closeReviewModal}
          currentUser={currentUser}
          openWriteModal={() => openWriteModal(selectedReview)}
          deleteReview={(review) => {
            setReviews((prevReviews) =>
              prevReviews.filter((r) => r.postId !== review.postId)
            );
          }}
          setReviews={setReviews}
          toggleLike={toggleLike}
        />
      )}
      <WriteModal
        isOpen={writeModalIsOpen}
        closeModal={closeWriteModal}
        addReview={addReview}
        existingReview={{}} //writeButton 눌렀을 때 빈 내용 전달
        currentUser={currentUser}
      />
    </div>
  );
};

export default ReviewPage;