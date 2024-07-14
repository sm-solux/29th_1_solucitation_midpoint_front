import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/login/LoginPage";
import DirectLoginPage from "./pages/login/DirectLoginPage";
import FindPassword from "./pages/login/FindPassword";
import Join from "./pages/login/Join";
import Home from "./pages/home/HomeMain";
import ReviewPage from "./pages/ReviewPage";
import MyPage from "./pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/direct" element={<DirectLoginPage />} />
        <Route path="/login/findpassword" element={<FindPassword />} />
        <Route path="/login/join" element={<Join />} />
        <Route path='/home' element={<Home/>} />
        <Route path="/Review" element={<ReviewPage />} />
        <Route path="/Mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;