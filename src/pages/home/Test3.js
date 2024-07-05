import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles, ButtonContainer, ProgressBarContainer, ProgressBar, ProgressIndicator } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

const Test3 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 다음 페이지로 이동하거나 완료 동작 수행
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
        <h2 style={{ marginBottom: '2rem' }}>Q3. 어떤 분위기를 선호하시나요?</h2>
        <ProgressBarContainer>
          <ProgressBar style={{ width: '100%' }}>
            <ProgressIndicator />
          </ProgressBar>
        </ProgressBarContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/relaxed.png" alt="차분한" />
            <span>차분한</span>
          </ButtonContainer>
          <ButtonContainer onClick={handleClick}>
            <img src="/img/energetic.png" alt="활발한" />
            <span>활발한</span>
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Test3;
