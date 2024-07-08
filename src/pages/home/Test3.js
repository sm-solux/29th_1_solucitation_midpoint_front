import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles, ButtonContainer, ProgressBarContainer, ProgressBar, ProgressIndicator } from '../../styles/styles';
import { Logo } from '../../components/CommonComponents';

const Test3 = () => {
  const [activeButton, setActiveButton] = useState(null); // 현재 활성화된 버튼 상태
  const navigate = useNavigate();

  const handleClick = (button) => {
    setActiveButton(button); // 클릭한 버튼의 상태를 설정
    // 완료 처리를 위해 setTimeout 제거
  };

  const handleNextClick = () => {
    // 완료 처리 로직 추가 (필요에 따라)
    alert('완료되었습니다!');
  };

  const handlePrevClick = () => {
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
        <h1 style={{ marginBottom: '4rem', position: 'relative' }}>Q3. 어떤 분위기를 선호하시나요?
          <button 
            onClick={handlePrevClick} 
            style={{ 
              position: 'absolute',
              top: '150%',
              left: '-152px', // 필요한 만큼 왼쪽으로 이동
              transform: 'translateY(-50%)',
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '2rem', 
              color: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            {'<'}
          </button>
          <span 
            style={{ 
              position: 'absolute',
              top: '150%',
              right: '-168px', // 필요한 만큼 오른쪽으로 이동
              transform: 'translateY(-50%)',
              fontSize: '1rem',
              color: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            완료!
          </span>
        </h1>
        <ProgressBarContainer>
          <ProgressBar style={{ width: '100%' }}>
            <ProgressIndicator style={{ right: 0 }} />
          </ProgressBar>
        </ProgressBarContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <ButtonContainer
            onClick={() => handleClick('calm')}
            style={{ backgroundColor: activeButton === 'calm' ? '#1B4345' : '#fff' }}
          >
            <img src="/img/relaxed.png" alt="차분한" />
            <span style={{ color: activeButton === 'calm' ? '#fff' : '#1B4345' }}>차분한</span>
          </ButtonContainer>
          <ButtonContainer
            onClick={() => handleClick('energetic')}
            style={{ backgroundColor: activeButton === 'energetic' ? '#1B4345' : '#fff' }}
          >
            <img src="/img/energetic.png" alt="활발한" />
            <span style={{ color: activeButton === 'energetic' ? '#fff' : '#1B4345' }}>활발한</span>
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Test3;
