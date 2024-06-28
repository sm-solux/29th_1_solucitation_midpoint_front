import React from "react";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import SearchBox from "../components/SearchComponents";

const ReviewPage = () => {
  return (
    <div>
      <div>
        <Logo />
        <SearchBox />
        <h1>ReviewPage</h1>
      </div>
    </div>
  );
};

export default ReviewPage;
