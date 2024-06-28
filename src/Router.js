import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import App from "./App";
import LoginPage from "./pages/login/LoginPage";
import DirectLoginPage from "./pages/login/DirectLoginPage";
import FindPassword from "./pages/login/FindPassword";
import FindPasswordVerification from "./pages/login/FindPasswordVerification";
import Join from "./pages/login/Join";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/directlogin" element={<DirectLoginPage />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/findpassword-verification" element={<FindPasswordVerification />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
