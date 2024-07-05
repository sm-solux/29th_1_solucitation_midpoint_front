import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles, ButtonContainer, ProgressBarContainer, ProgressBar, ProgressIndicator } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

const Test1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/test2');
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
        <h1 style={{ marginBottom: '5rem' }}>Q1. 식사 예정이신가요?</h1>
        <ProgressBarContainer>
          <ProgressBar style={{ width: '33%' }}>
            <ProgressIndicator />
          </ProgressBar>
        </ProgressBarContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/spoon.png" alt="네" />
            <span>네</span>
          </ButtonContainer>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/crossmark.png" alt="아니요" />
            <span>아니요</span>
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Test1;
