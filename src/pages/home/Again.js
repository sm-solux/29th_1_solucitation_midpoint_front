import React from 'react';
import { commonStyles } from '../../styles/styles'; 
import { Logo } from '../../components/CommonComponents';

const Again = () => {
  const handleRetry = () => {
    // 다시 찾기 버튼 클릭 시 수행할 동작
    // 예: 홈으로 이동 또는 다른 페이지로 이동
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
        <h1 style={{ color: '#EC5640', marginBottom: '3rem', textAlign: 'center' }}>
          <span style={{ backgroundColor: '#fff', padding: '0 10px' }}>
            중간지점을 찾을 수 없습니다.
          </span>
          <div style={{ borderTop: '2px solid #EC5640'}} />
        </h1>
        <button type="button" style={commonStyles.retryButton} onClick={handleRetry}>
          다시 찾기
        </button>
      </div>
    </div>
  );
};

export default Again;
