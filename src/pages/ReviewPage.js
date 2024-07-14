import React, { useState } from "react";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import SearchBox from "../components/SearchComponents";
import ReviewCard from "../components/ReviewComponents";
import WriteModal from "../components/WriteModalComponents";
import ReviewModal from '../components/ReviewModalComponents';
import { reviewStyles } from '../styles/reviewStyles';

const ReviewPage = () => {
  const currentUser = 'user1';

  const initialReviews = [
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg",
      tags: ["#식사", "#여럿이"],
      placeName: "맛있는 식당",
      content: '아오 맛있어~아오 맛있어~아오 맛있어~너무 맛있어서 눈물이나요',
      author: 'user1',
      likes: 5,
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg",
      tags: ["#카페", "#팀플"],
      placeName: "편안한 카페",
      content: '아오 맛있어~2',
      author: 'user2',
      likes: 3,
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg",
      tags: ["#카페", "#자연"],
      placeName: "편안한 카페",
      content: '아오 맛있어~3',
      author: 'user1',
      likes: 4,
    },
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg",
      tags: ["#쇼핑", "#산책"],
      placeName: "편안한 카페",
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

  const openWriteModal = (review, isEditing) => {
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
    if (isEditing) {
      const updatedReviews = reviews.map((review) =>
        review.author === currentUser && review.placeName === (selectedReview?.placeName || newReview.placeName)
          ? newReview
          : review
      );
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, newReview]);
    }
    closeWriteModal();
  };

  const deleteReview = (reviewToDelete) => {
    const updatedReviews = reviews.filter((review) => review !== reviewToDelete);
    setReviews(updatedReviews);
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
      <button onClick={() => openWriteModal(null, false)} style={reviewStyles.writeButton}>
        <img src="/img/WriteButtonIcon.png" alt="write button" style={reviewStyles.writeButton} />
      </button>
      {selectedReview && (
        <ReviewModal
          isOpen={reviewModalIsOpen}
          review={selectedReview}
          closeModal={closeReviewModal}
          currentUser={currentUser}
          openWriteModal={openWriteModal}
          deleteReview={deleteReview}
        />
      )}
      <WriteModal
        isOpen={writeModalIsOpen}
        closeModal={closeWriteModal}
        addReview={addReview}
        existingReview={selectedReview}
        isEditing={isEditing}
      />
    </div>
  );
};


export default ReviewPage;
