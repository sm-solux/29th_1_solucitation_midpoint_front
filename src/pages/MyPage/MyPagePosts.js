import React, { useState } from "react";
import ReviewCard from "../../components/ReviewComponents";
import ReviewModal from '../../components/ReviewModalComponents';
import { reviewStyles } from '../../styles/reviewStyles';

const MyPagePosts = () => {
  //가상 데이터
  const currentUser = 'user1';

  const initialReviews = [
    {
      photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg",
      tags: ["식사", "여럿이"],
      placeName: "맛있는 식당",
      content: '아오 맛있어~아오 맛있어~아오 맛있어~너무 맛있어서 눈물이나요',
      author: 'user1',
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

  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);


  const openReviewModal = (review) => {
    setSelectedReview(review);
    setReviewModalIsOpen(true);
  };


  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setSelectedReview(null);
  }
  
  const userReviews = initialReviews.filter(review => review.author === currentUser);

  return (
    <div>
      <div style={{ marginTop: '100px' }}></div>
      <div style={reviewStyles.reviewContainer}>
        {userReviews.map((review, index) => (
          <ReviewCard key={index} review={review} onReviewClick={openReviewModal} currentUser={currentUser} />
        ))}
      </div>
      {selectedReview && (
        <ReviewModal 
          isOpen={reviewModalIsOpen}
          review={selectedReview}
          closeModal={closeReviewModal}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default MyPagePosts;
