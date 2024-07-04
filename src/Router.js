import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import MyPage from "./pages/MyPage";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import DirectLoginPage from "./pages/login/DirectLoginPage";
import FindPassword from "./pages/login/FindPassword";
import Join from "./pages/login/Join";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/directlogin" element={<DirectLoginPage />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/join" element={<Join />} />
=======
        <Route path="/" element={<ReviewPage />} />
        <Route path="/Review" element={<ReviewPage />} />
        <Route path="/Mypage" element={<MyPage />} />
>>>>>>> origin/feature/review
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
