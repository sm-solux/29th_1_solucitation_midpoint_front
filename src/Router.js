import React, { useState } from 'react'; // useState를 임포트합니다.
import { BrowserRouter as AppRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/login/LoginPage';
import DirectLoginPage from './pages/login/DirectLoginPage';
import FindPassword from './pages/login/FindPassword';
import Join from './pages/login/Join';
import ResetPassword from './pages/login/ResetPassword';
import KakaoRedirect from './pages/login/KakaoRedirect';
import Home from './pages/home/HomeMain';
import ReviewPage from './pages/ReviewPage';
import MyPage from './pages/MyPage';
import Again from './pages/home/Again';
import Test1 from './pages/home/Test1';
import Test2 from './pages/home/Test2';
import Test3 from './pages/home/Test3';
import Result1 from './pages/home/Result1';
import Result2 from './pages/home/Result2';
import Result3 from './pages/home/Result3';
import Result4 from './pages/home/Result4';
import Midpoint from './pages/home/Midpoint';
import { AppProvider } from './contexts/AppContext';

function Router() {
  const [answers, setAnswers] = useState({});

  const updateAnswers = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  return (
    <AppProvider>
      <AppRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/direct" element={<DirectLoginPage />} />
          <Route path="/login/findpassword" element={<FindPassword />} />
          <Route path="/login/join" element={<Join />} />
          <Route path="/login/resetpassword" element={<ResetPassword/>} />
          <Route path="/oauth2/callback" element={<KakaoRedirect/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/Review" element={<ReviewPage />} />
          <Route path="/Mypage" element={<MyPage />} />
          <Route path="/again" element={<Again />} />
          <Route path="/test1" element={<Test1 updateAnswers={updateAnswers} answers={answers} />} />
          <Route path="/test2" element={<Test2 updateAnswers={updateAnswers} answers={answers} />} />
          <Route path="/test3" element={<Test3 updateAnswers={updateAnswers} answers={answers} />} />
          <Route path="/result1" element={<Result1 />} />
          <Route path="/result2" element={<Result2 />} />
          <Route path="/result3" element={<Result3 />} />
          <Route path="/result4" element={<Result4 />} />
          <Route path="/midpoint" element={<Midpoint />} />
        </Routes>
      </AppRouter>
    </AppProvider>
  );
}

export default Router;