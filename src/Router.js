import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import MyPage from "./pages/MyPage";
import App from "./App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewPage />} />
        <Route path="/Review" element={<ReviewPage />} />
        <Route path="/Mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
