import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logo } from '../components/CommonComponents';
import SearchBox from '../components/SearchComponents';
import ReviewCard from '../components/ReviewComponents';
import ReviewModal from '../components/ReviewModalComponents';
import WriteModal from '../components/WriteModalComponents';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [clickedTags, setClickedTags] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [searchTerm, setSearchTerm] = useState('');

  // 해시태그 매핑 데이터
  const hashtagMap = {
    1: '식사',
    2: '카페',
    3: '공부',
    4: '문화생활',
    5: '쇼핑',
    6: '자연',
    7: '산책',
    8: '친목',
    9: '여럿이',
    10: '어린이',
    11: '혼자'
  };

  //태그 출력 
  const predefinedTags = [
    '#식사',
    '#카페',
    '#공부',
    '#문화생활',
    '#쇼핑',
    '#자연',
    '#산책',
    '#친목',
    '#여럿이',
    '#혼자',
  ];

  // 게시글 리스트 불러오는 API
  const fetchReviews = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {};
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, { headers });

      // 응답 데이터를 변환하여 상태에 저장 
      const fetchedReviews = response.data.map(review => ({
        postId: review.postId,
        firstImageUrl: review.firstImageUrl,
        title: review.title,
        hashtags: review.hashtags.map(tagId => hashtagMap[tagId]),
        likes: isLoggedIn ? review.likes : false
      }));

      setReviews(fetchedReviews); // 받아온 데이터를 상태로 설정
    } catch (error) {
      setError('게시글 조회 중 오류가 발생하였습니다.');
      console.error('Error fetching reviews:', error);
    }
  };

    useEffect(() => {
    const userToken = localStorage.getItem('userToken'); // 로그인 여부를 확인하는 별도의 토큰
    const storedUser = localStorage.getItem('currentUser');
    if (userToken && storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /* 게시글 상세보기 API
  const fetchReviewDetails = async (postId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {};
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/{postId}`, { headers });

      console.log('Review details:', response.data); // 상세 데이터 확인
      setSelectedReview(response.data); // 받아온 상세 데이터를 상태로 설정
      setReviewModalIsOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('해당 게시글이 존재하지 않습니다.');
      } else {
        setError(`게시글 조회 중 오류가 발생하였습니다: ${error.message}`);
      }
      console.error('Error fetching review details:', error);
    }
  };*/

  /*검색에 대한 API
  const fetchBySearchTerm = async (text) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {};
      const params = { query: text };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/query?query={query}`, {
        params,
        headers,
      });

      if (response.status === 200) {
        const data = response.data.map(item => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags.map(tagId => hashtagMap[tagId]),
          likes: isLoggedIn ? item.likes : false
        }));
        setFilteredReviews(data);
        setError(null);
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('검색어를 입력해주세요.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };

  const fetchByTags = async (tags) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {};
      const params = { purpose: tags };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/search/purpose?purpose={purpose}`, {
        params,
        headers,
      });

      if (response.status === 200) {
        const data = response.data.map(item => ({
          postId: item.postId,
          firstImageUrl: item.firstImageUrl,
          title: item.title,
          hashtags: item.hashtags.map(tagId => hashtagMap[tagId]),
          likes: isLoggedIn ? item.likes : false
        }));
        setFilteredReviews(data);
        setError(null);
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('최소 하나 이상의 해시태그를 선택해야 합니다.');
        } else if (error.response.status === 500) {
          setError(`게시글 검색 중 오류가 발생하였습니다: ${error.message}`);
        }
      } else if (error.request) {
        setError('서버와 연결할 수 없습니다.');
      } else {
        setError(`오류가 발생하였습니다: ${error.message}`);
      }
    }
  };
  */
  useEffect(() => {
    fetchReviews(); // 컴포넌트가 마운트될 때 데이터 로드
  }, [isLoggedIn]);

  //필터링된 검색어 출력
  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  /*검색에 대한 API
  useEffect(() => {
    if (searchTerm) {
      fetchBySearchTerm(searchTerm);
    } else if (clickedTags.length > 0) {
      fetchByTags(clickedTags);
    } else {
      setFilteredReviews(reviews);
    }
  }, [searchTerm, clickedTags]);
  */
  
  const openWriteModal = (review = null, isEditing = false) => {
    setSelectedReview(review);
    setWriteModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setSelectedReview(null);
  };

  const openReviewModal = (postId) => {
    //fetchReviewDetails(postId); // 게시글 상세보기 출력
  };

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setSelectedReview(null);
  };

  const handleWriteButtonClick = () => {
    /* 로그인 후에 작성 가능하게
    if (isLoggedIn) {
      openWriteModal();
    } else {
      window.confirm('로그인 후 가능합니다.');
    }*/
    openWriteModal();
  };

  /* 게시글 등록
  const addReview = async (newReview, isEditing) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        "Authorization": `Bearer ${accessToken}`,
      };
      const formData = new FormData();
      formData.append('postDto', JSON.stringify({
        title: newReview.placeName,
        content: newReview.content,
        postHashtag: newReview.tags.map(tag => predefinedTags.indexOf(tag) + 1)
      }));
      newReview.photos.forEach((photo, index) => {
        formData.append(`postImages`, photo);
      });

      let response;
      if (isEditing && selectedReview) {
        response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/posts/{postId}`, formData, { headers });
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData, { headers });
      }
      setReviews(prevReviews => prevReviews.map(review => (review.postId === selectedReview.postId ? response.data : review)));
      alert(isEditing ? '게시글을 성공적으로 수정하였습니다.' : '게시글을 성공적으로 등록하였습니다.');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.errors
            ? error.response.data.errors.map(err => `${err.field}: ${err.message}`).join(', ')
            : error.response.data;
          setError(errorMessage);
        } else if (error.response.status === 401) {
          setError('해당 서비스를 이용하기 위해서는 로그인이 필요합니다.');
        } else if (error.response.status === 404) {
          setError('해당 게시글이 존재하지 않습니다.');
        } else if (error.response.status === 403) {
          setError('해당 게시글을 수정할 권한이 없습니다. 본인이 작성한 글만 수정할 수 있습니다.');
        } else {
          setError(`게시글 등록 과정에서 오류가 발생하였습니다: ${error.response.data}`);
        }
      } else {
        setError(`게시글 등록 과정에서 오류가 발생하였습니다: ${error.message}`);
      }
      console.error('Error adding review:', error);
    }
  };*/

  return (
    <div>
      <Logo bgColor='#F2F2F2' />
      <div style={{ marginTop: '120px' }}>
        <SearchBox 
          setFilteredReviews={setFilteredReviews}
          //setSearchTerm={setSearchTerm}
          clickedTags={clickedTags}
          setClickedTags={setClickedTags}
        />
      </div>
      <div style={reviewStyles.reviewContainer}>
        {error ? (
          <p>{error}</p> //에러 출력
        ) : (
          filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard
                key={review.postId}
                review={review}
                onReviewClick={openReviewModal}
              />
            ))
          ) : (
            <p>No reviews found</p>
          )
        )}
      </div>
      <button
        onClick={handleWriteButtonClick}
        style={reviewStyles.writeButton}
      >
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
          openWriteModal={openWriteModal}
          deleteReview={(review) => {
            // 삭제 기능 구현
            setReviews(prevReviews => prevReviews.filter(r => r.postId !== review.postId));
          }}
          setReviews={setReviews}
        />
      )}
      <WriteModal
        isOpen={writeModalIsOpen}
        closeModal={closeWriteModal}
        //addReview={addReview}
        existingReview={selectedReview || {}}
      />
    </div>
  );
};

export default ReviewPage;
