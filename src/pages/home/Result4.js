import React from 'react';
import { commonStyles } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';
import { useNavigate } from 'react-router-dom';

const Result4 = ({ answers }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/midpoint');
  };

  return (
    <div style={commonStyles.container}>
      <header style={commonStyles.header}>
        <Logo />
        <nav style={commonStyles.nav}>
          <a href="/" style={commonStyles.link}>홈</a>
          <a href="/Review" style={commonStyles.link}>게시판</a>
          <a href="/MyPage" style={commonStyles.link}>마이페이지</a>
          <a href="/login" style={commonStyles.link}>로그아웃</a>
        </nav>
      </header>
      <div style={commonStyles.content}>
        <h1 style={{ marginBottom: '4rem' }}>당신을 위한 만남 목적 추천</h1>
        <div style={commonStyles.resultOptions}>
          <div style={commonStyles.resultOption}>
            <div style={commonStyles.resultOptionBox}>
              <img src="/img/hotple.png" alt="핫플" style={commonStyles.resultOptionImg} />
              <span style={commonStyles.resultOptionText}>핫플</span>
            </div>
          </div>
          <div style={commonStyles.resultOption}>
            <div style={commonStyles.resultOptionBox}>
              <img src="/img/friend.png" alt="친목" style={commonStyles.resultOptionImg} />
              <span style={commonStyles.resultOptionText}>친목</span>
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

export default Result4;
