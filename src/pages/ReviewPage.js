import React, { useState, useEffect } from 'react';
import { Logo } from '../components/CommonComponents';
import SearchBox from '../components/SearchComponents';
import ReviewCard from '../components/ReviewComponents';
import ReviewModal from '../components/ReviewModalComponents';
import WriteModal from '../components/WriteModalComponents';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewPage = () => {
  const currentUser = 'user1';

  const initialReviews = [
    {
      id: 1,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_6.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg',
      ],
      tags: ['#식사', '#여럿이'],
      placeName: '맛있는 식당',
      content: '아오 맛있어~아오 맛있어~아오 맛있어~너무 맛있어서 눈물이나요',
      author: 'user1',
      likes: 0,
    },
    {
      id: 2,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_6.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg',
      ],
      tags: ['#카페', '#팀플'],
      placeName: '편안한 카페',
      content: '아오 맛있어~2',
      author: 'user2',
      likes: 3,
    },
    {
      id: 3,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_6.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg',
      ],
      tags: ['#카페', '#자연'],
      placeName: '편안한 카아페',
      content: '아오 맛있어~3',
      author: 'user1',
      likes: 4,
    },
    {
      id: 4,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg',
      ],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카페',
      content: '아오 맛있어~4',
      author: 'user3',
      likes: 2,
    },
    {
      id: 5,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg',
      ],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카프리썬',
      content: '아오 맛있어~4',
      author: 'user3',
      likes: 2,
    },
    {
      id: 6,
      photos: [
        'http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg',
        'http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg',
      ],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카페',
      content: '아오 맛있어~6',
      author: 'user3',
      likes: 7,
    },
    {
      id: 7,
      photos: ['http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg'],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카페',
      content: '아오 맛있어~7',
      author: 'user3',
      likes: 1,
    },
    {
      id: 8,
      photos: ['http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg'],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카르페',
      content: '아오 맛있어~7',
      author: 'user3',
      likes: 2,
    },
    {
      id: 9,
      photos: ['http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg'],
      tags: ['#쇼핑', '#산책'],
      placeName: '편안한 카페',
      content: '아오 맛있어~4',
      author: 'user3',
      likes: 2,
    },
  ];

  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [clickedTags, setClickedTags] = useState([]);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreReviews();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reviews]);

  const loadMoreReviews = () => {
    const newReviews = [];
    setReviews((prevReviews) => [...prevReviews, ...newReviews]);
  };

  const openWriteModal = (review = null, isEditing = false) => {
    setSelectedReview(review);
    setIsEditing(isEditing);
    setWriteModalIsOpen(true);
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setReviewModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setSelectedReview(null);
  };

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setSelectedReview(null);
  };

  const addReview = (newReview, isEditing) => {
    if (isEditing && selectedReview) {
      const updatedReviews = reviews.map((review) =>
        review.id === selectedReview.id
          ? { ...review, ...newReview, id: review.id }
          : review
      );
      setReviews(updatedReviews);
    } else {
      const newId = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;
      setReviews((prevReviews) => [
        ...prevReviews,
        { ...newReview, id: newId },
      ]);
    }
    closeWriteModal();
  };

  const deleteReview = (reviewToDelete) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewToDelete.id
    );
    setReviews(updatedReviews);
  };

  return (
    <div>
      <Logo bgColor='#F2F2F2' />
      <div style={{ marginTop: '120px' }}>
        <SearchBox
          reviews={reviews}
          setFilteredReviews={setFilteredReviews}
          clickedTags={clickedTags}
          setClickedTags={setClickedTags}
        />
      </div>
      <div style={reviewStyles.reviewContainer}>
        {filteredReviews.length > 0
          ? filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onReviewClick={openReviewModal}
                currentUser={currentUser}
              />
            ))
          : <p>No reviews found</p>
          }
      </div>
      <button
        onClick={() => openWriteModal(null, false)}
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
          deleteReview={deleteReview}
          setReviews={setReviews}
        />
      )}
      <WriteModal
        isOpen={writeModalIsOpen}
        closeModal={closeWriteModal}
        addReview={addReview}
        existingReview={selectedReview || {}}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ReviewPage;
