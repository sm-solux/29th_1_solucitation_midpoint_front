import React from "react";
import { reviewStyles } from "../styles/reviewStyles"; // 리뷰 스타일 시트를 불러옵니다.

export const ReviewCard = ({ review }) => {
const { photoUrl, tags, placeName } = review;
  return (
    <div style={reviewStyles.card}>
      <div style={reviewStyles.photoContainer}>
        <img src={photoUrl} alt={placeName} style={reviewStyles.photo} />
      </div>
      <div style={reviewStyles.details}>
        <div style={reviewStyles.tags}>
          {tags.map((tag, index) => (
            <span key={index} style={reviewStyles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 style={reviewStyles.placeName}>{placeName}</h3>
      </div>
    </div>
  );
};

export default ReviewCard;