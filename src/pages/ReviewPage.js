import React, { useState } from "react";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import SearchBox from "../components/SearchComponents";
import ReviewCard from "../components/ReviewComponents";
import WriteModal from "../components/WriteModalComponents";
import ReviewModal from '../components/ReviewModalComponents';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewPage = () => {
  const currentUser = 'user1'; // 현재 사용자

  const initialReviews = [
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg",
      tags: ["식사", "여럿이"],
      placeName: "맛있는 식당",
      content: '아오 맛있어~아오 맛있어~아오 맛있어~너무 맛있어서 눈물이나요',
      author: 'user1', // 작성자 정보 추가
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg",
      tags: ["카페", "분위기 좋은"],
      placeName: "편안한 카페",
      content: '아오 맛있어~2',
      author: 'user2',
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg",
      tags: ["카페", "분위기 좋은"],
      placeName: "편안한 카페",
      content: '아오 맛있어~3',
      author: 'user1',
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg",
      tags: ["카페", "분위기 좋은"],
      placeName: "편안한 카페",
      content: '아오 맛있어~4',
      author: 'user3',
    },
  ];

  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState(null);

  const openWriteModal = () => {
    setWriteModalIsOpen(true);
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setReviewModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
  };

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setSelectedReview(null);
  };

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
    closeWriteModal();
  };

  return (
    <div>
      <Logo />
      <div style={{ marginTop: '100px' }}>
        <SearchBox />
      </div>
      <div style={reviewStyles.reviewContainer}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} onReviewClick={openReviewModal} currentUser={currentUser} />
        ))}
      </div>
      <button onClick={openWriteModal} style={reviewStyles.writeButton}>
        <img src='/img/WriteButtonIcon.png' alt="write button" style={reviewStyles.writeButton} />
      </button>
      {selectedReview && (
        <ReviewModal
          isOpen={reviewModalIsOpen}
          review={selectedReview}
          closeModal={closeReviewModal}
          currentUser={currentUser} // currentUser prop 전달
        />
      )}
      <WriteModal isOpen={writeModalIsOpen} closeModal={closeWriteModal} addReview={addReview} />
    </div>
  );
};

export default ReviewPage;
