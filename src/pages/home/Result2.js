import React from 'react';
import { commonStyles } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import { useNavigate } from 'react-router-dom';

const Result2 = ({ answers }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/midpoint');
  };

  return (
    <div style={commonStyles.container}>
      <Logo />
      <div style={commonStyles.content}>
        <h1 style={{ marginBottom: '4rem' }}>당신을 위한 만남 목적 추천</h1>
        <div style={commonStyles.resultOptions}>
          <div style={commonStyles.resultOption}>
            <div style={commonStyles.resultOptionBox}>
              <img src="/img/walk.png" alt="산책" style={commonStyles.resultOptionImg} />
              <span style={commonStyles.resultOptionText}>산책</span>
            </div>
          </div>
          <div style={commonStyles.resultOption}>
            <div style={commonStyles.resultOptionBox}>
              <img src="/img/hiking.png" alt="등산" style={commonStyles.resultOptionImg} />
              <span style={commonStyles.resultOptionText}>등산</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleNavigate} 
          style={commonStyles.resultButton}
        >
          모임 장소를 찾으러 가볼까요?
        </button>
      </div>
    </div>
  );
};

export default Result2;
