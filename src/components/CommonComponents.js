import React from "react";
import { Link } from 'react-router-dom';

import { commonStyles } from '../styles/styles'

function Logo() {

  const links = [
    { name: 'home', path: '/Home', label: '홈' },
    { name: 'review', path: '/Review', label: '게시판' },
    { name: 'mypage', path: '/MyPage', label: '마이페이지' },
    { name: 'logout', path: '', label: '로그아웃' }
  ];
    return (
    <header style={commonStyles.header}>
    <div style={commonStyles.logo_div}>
        <h1 style={commonStyles.logo}>MIDPOINT</h1>
    </div>
    <div style={commonStyles.move_div}>
      {links.map(link => (
        <div style={commonStyles.linkContainer} key={link.name}>
          {link.name === 'logout' ? (
            <span
              style={commonStyles.link}
            >
              {link.label}
            </span>
          ) : (
            <Link
              to={link.path}
              style={commonStyles.link}
            >
              {link.label}
            </Link>
          )}
        </div>
      ))}
        </div>
        </header>
  );
};

export { Logo };
