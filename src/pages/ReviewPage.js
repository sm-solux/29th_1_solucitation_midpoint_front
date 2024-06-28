import React from "react";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import SearchBox from "../components/SearchComponents";
import ReviewCard from "../components/ReviewComponents";

const reviews = [
  {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_3.jpg",
    tags: ["식사", "여럿이"],
    placeName: "맛있는 식당",
  },
  {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_5.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
  },
    {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_7.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
  },
      {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_8.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
  },
            {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_9.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
  },
                  {
    photoUrl: "http://www.lampcook.com/wi_files/food_top100/top5/5_11.jpg",
    tags: ["카페", "분위기 좋은",],
    placeName: "편안한 카페",
  },
];

const ReviewPage = () => {
  return (
    <div>
      <Logo />
      <SearchBox />
      <div style={styles.reviewGrid}>
        {reviews.map((review, index) => (
          <div key={index} style={styles.reviewCard}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 한 줄에 4개씩 컬럼으로 출력합니다.
    gap: "20px", // 그리드 아이템 간격 설정
    padding: "20px", // 그리드 영역 패딩 설정
    justifyContent: "center",
  },
  reviewCard: {
    width: "320px", // 각 리뷰 카드의 너비 설정 (1440px / 4 - 간격)
    boxSizing: "border-box", // 패딩과 테두리를 포함하여 크기 계산
  },
};

export default ReviewPage;
