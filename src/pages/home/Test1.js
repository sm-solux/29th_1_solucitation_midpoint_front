import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles, ButtonContainer, ProgressBarContainer, ProgressBar, ProgressIndicator } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

const Test1 = ({ updateAnswers }) => {
  const [activeButton, setActiveButton] = useState(null); 
  const navigate = useNavigate();

  const handleClick = (button) => {
    setActiveButton(button);
    updateAnswers('test1', button);
    setTimeout(() => {
      navigate('/test2');
    }, 200); 
  };

  const handleNextClick = () => {
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
        <h1 style={{ marginBottom: '4rem', position: 'relative' }}>Q1. 식사 예정이신가요?
          <button 
            onClick={handleNextClick} 
            style={{ 
              position: 'absolute',
              top: '150%',
              right: '-220px',
              transform: 'translateY(-50%)',
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '2rem', 
              color: 'rgba(0, 0, 0, 0.5)', 
            }}
          >
            {'>'}
          </button>
        </h1>
        <ProgressBarContainer>
          <ProgressBar style={{ width: '0%' }}>
            <ProgressIndicator />
          </ProgressBar>
        </ProgressBarContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <ButtonContainer
            onClick={() => handleClick('yes')}
            style={{ backgroundColor: activeButton === 'yes' ? '#1B4345' : '#fff' }}
          >
            <img src="/img/spoon.png" alt="네" />
            <span style={{ color: activeButton === 'yes' ? '#fff' : '#1B4345' }}>네</span>
          </ButtonContainer>
          <ButtonContainer
            onClick={() => handleClick('no')}
            style={{ backgroundColor: activeButton === 'no' ? '#1B4345' : '#fff' }}
          >
            <img src="/img/crossmark.png" alt="아니요" />
            <span style={{ color: activeButton === 'no' ? '#fff' : '#1B4345' }}>아니요</span>
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Test1;
