import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test1 from './pages/home/Test1';
import Test2 from './pages/home/Test2';
import Test3 from './pages/home/Test3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
      </Routes>
    </Router>
  );
}

export default App;
