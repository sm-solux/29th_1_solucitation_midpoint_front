import React, {useState} from "react";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import SearchBox from "../components/SearchComponents";
import ReviewCard from "../components/ReviewComponents";
import WriteModal from "../components/WriteModalComponents";
import ReviewModal from '../components/ReviewModalComponents';
import { searchStyles } from '../styles/searchStyles';

const ReviewPage = () => {
  const initialReviews = [
  {
    photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg",
    tags: ["식사", "여럿이"],
    placeName: "맛있는 식당",
    content: '아오 맛있어~아오 맛있어~아오 맛있어~너무 맛있어서 눈물이나요',
  },
  {
    photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
    content: '아오 맛있어~2',
  },
    {
    photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
    content: '아오 맛있어~3',
  },
      {
    photo: "http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
    content: '아오 맛있어~4',
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
      <div style={reviewContainer}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} onReviewClick={openReviewModal} />
        ))}
      </div>
      <button onClick={openWriteModal} style={searchStyles.writeButton}>
        글쓰기
      </button>
      <ReviewModal isOpen={reviewModalIsOpen} review={selectedReview} closeModal={closeReviewModal} />
      <WriteModal isOpen={writeModalIsOpen} closeModal={closeWriteModal} addReview={addReview} />
    </div >
  );
};

const reviewContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  overflowY: "auto",
  gap: "20px",
  padding: "20px",
  margin: "0 auto", 
  maxWidth: "1200px",
  backgroundColor: "transparent",
};

export default ReviewPage;
