import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test1 from './pages/home/Test1';
import Test2 from './pages/home/Test2';
import Test3 from './pages/home/Test3';
import Result1 from './pages/home/Result1';
import Result2 from './pages/home/Result2';
import Result3 from './pages/home/Result3';
import Result4 from './pages/home/Result4'; // 추가된 Result4 import
import Midpoint from './pages/home/Midpoint';

function App() {
  const [answers, setAnswers] = useState({});

  const updateAnswers = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test1 updateAnswers={updateAnswers} />} />
        <Route path="/test2" element={<Test2 updateAnswers={updateAnswers} answers={answers} />} />
        <Route path="/test3" element={<Test3 updateAnswers={updateAnswers} answers={answers} />} />
        <Route path="/result1" element={<Result1 />} />
        <Route path="/result2" element={<Result2 />} />
        <Route path="/result3" element={<Result3 />} />
        <Route path="/result4" element={<Result4 />} /> {/* 추가된 경로 */}
        <Route path="/midpoint" element={<Midpoint />} />
      </Routes>
    </Router>
  );
}

export default App;