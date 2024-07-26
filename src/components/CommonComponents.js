import React, { useState, useEffect } from 'react';
import { commonStyles } from '../styles/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 헤더 (배경색 설정 가능 / default는 transparent)
function Logo({ exist = true, bgColor = 'transparent' }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/home');
  };

  const loggedInLinks = [
    { name: 'home', path: '/home', label: '홈' },
    { name: 'review', path: '/Review', label: '게시판' },
    { name: 'mypage', path: '/MyPage', label: '마이페이지' },
    { name: 'logout', path: '/', label: '로그아웃' },
  ];

  const loggedOutLinks = [
    { name: 'home', path: '/home', label: '홈' },
    { name: 'review', path: '/Review', label: '게시판' },
    { name: 'login', path: '/login', label: '로그인' },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;
  //뒤에를 loggedOutLinks로 수정해야함 마이페이지 작업 때문에 수정했음

  const linkStyle = {
    ...commonStyles.link,
    textDecoration: 'none',
  };

  const activeLinkStyle = {
    ...linkStyle,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  };

  const getLinkStyle = (link) => {
    const isActive = location.pathname.startsWith(link.path);
    if (link.name === 'logout') {
      return linkStyle;
    }
    return isActive ? activeLinkStyle : linkStyle;
  };

  return (
    <header style={commonStyles.header(bgColor)}>
      <div style={commonStyles.logo_div}>
        {exist && (
          <h1 style={commonStyles.logo} onClick={onClick}>
            MIDPOINT
          </h1>
        )}
      </div>
      <div style={commonStyles.move_div}>
        {links.map((link) => (
          <div style={commonStyles.linkContainer} key={link.name}>
            {link.name === 'logout' ? (
              <span
                style={getLinkStyle(link.path)}
                onClick={() => setIsLoggedIn(false)}
              >
                {link.label}
              </span>
            ) : (
              <Link to={link.path} style={getLinkStyle(link)}>
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}

// 4분 타이머
const Timer = ({ isActive, resetTimer }) => {
  const [seconds, setSeconds] = useState(240);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          } else {
            clearInterval(interval);
            alert('입력시간을 초과했습니다.');
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (resetTimer) {
      setSeconds(240);
    }
  }, [resetTimer]);

  // 초를 분과 초로 변환하는 함수
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  return (
    <div>
      <h5
        style={{
          color: '#EC5640',
          marginRight: '0.5rem',
          marginLeft: '0.5rem',
        }}
      >
        {formatTime(seconds)}
      </h5>
    </div>
  );
};

export { Logo, Timer };
