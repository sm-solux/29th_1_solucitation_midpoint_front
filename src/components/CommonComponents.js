import React, {useState} from "react";
import { commonStyles } from "../styles/styles"; 
import { Link } from 'react-router-dom';

function Logo() {
  const [activeIcon, setActiveIcon] = useState(''); // 현재 활성화된 아이콘 상태

  const handleClick = (iconName) => {
    setActiveIcon(iconName);
  };

  const links = [
    { name: 'home', path: '/Review', label: '홈' },
    { name: 'review', path: '/Review', label: '게시판' },
    { name: 'mypage', path: '/MyPage', label: '마이페이지' },
    { name: 'logout', path: '', label: '로그아웃' }
  ];
    return (
    <header>
    <div style={commonStyles.logo_div}>
      <img src="/img/logo.png" style={commonStyles.logo_img} alt="Logo" />
        <h1 style={commonStyles.logo}>MIDPOINT</h1>
    </div>
    <div style={commonStyles.move_div}>
      {links.map(link => (
        <div style={commonStyles.linkContainer} key={link.name}>
          {link.name === 'logout' ? (
            <span
              style={commonStyles.link}
              onClick={() => handleClick(link.name)}
            >
              {link.label}
              {activeIcon === link.name && <span style={commonStyles.icon}></span>}
            </span>
          ) : (
            <Link
              to={link.path}
              style={commonStyles.link}
              onClick={() => handleClick(link.name)}
            >
              {link.label}
              {activeIcon === link.name && <span style={commonStyles.icon}></span>}
            </Link>
          )}
        </div>
      ))}
        </div>
        </header>
  );
}

export { Logo };
