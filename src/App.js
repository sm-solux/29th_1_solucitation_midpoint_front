// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Again from './pages/home/Again'; // Again 컴포넌트 가져오기

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Again />} /> {/* 기본 경로를 Again으로 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
