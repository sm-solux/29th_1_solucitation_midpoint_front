import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomeMain from './pages/home/HomeMain';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeMain />
  </React.StrictMode>
);

reportWebVitals();
