import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Midpoint from './pages/home/Midpoint';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Midpoint />} />
        {/* 다른 라우트들은 필요에 따라 추가합니다 */}
      </Routes>
    </Router>
  );
}

export default App;
