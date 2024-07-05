import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles, ButtonContainer, ProgressBarContainer, ProgressBar, ProgressIndicator } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

const Test2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/test3');
  };

  return (
    <div style={commonStyles.container}>
      <header style={commonStyles.header}>
        <Logo />
        <nav style={commonStyles.nav}>
          <a href="/Review" style={commonStyles.link}>홈</a>
          <a href="/Review" style={commonStyles.link}>게시판</a>
          <a href="/MyPage" style={commonStyles.link}>마이페이지</a>
          <a href="#" style={commonStyles.link}>로그아웃</a>
        </nav>
      </header>
      <div style={commonStyles.content}>
        <h2 style={{ marginBottom: '2rem' }}>Q2. 어떤 장소를 선호하시나요?</h2>
        <ProgressBarContainer>
          <ProgressBar style={{ width: '66%' }}>
            <ProgressIndicator />
          </ProgressBar>
        </ProgressBarContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/city.png" alt="도시" />
            <span>도시</span>
          </ButtonContainer>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/nature.png" alt="자연" />
            <span>자연</span>
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Test2;
