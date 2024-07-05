import React, { useState } from "react";
import "../styles/global.css";
import { myPageStyles } from '../styles/myPageStyles';
import { Logo } from "../components/CommonComponents";
import MyPageProfile from '../components/MyPageProfile';
import MyPageFavorites from '../components/MyPageFavorites';
import MyPageSearchHistory from '../components/MyPageSearchHistory';
import MyPagePosts from '../components/MyPagePosts';

  const links = [
    { name: 'profile', label: '회원 정보' , icon: '/img/MyPageProfileIcon.png' },
    { name: 'favorites', label: '즐겨찾기', icon: '/img/MyPageFavoriteIcon.png' },
    { name: 'history', label: '검색 기록', icon: '/img/MyPageSearchHistoryIcon.png' },
    { name: 'posts', label: '내가 쓴 글', icon: '/img/MyPagePostsIcon.png' }
];
  

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState('profile');


  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <MyPageProfile />;
      case 'favorites':
        return <MyPageFavorites />;
      case 'history':
        return <MyPageSearchHistory />;
      case 'posts':
        return <MyPagePosts />;
      default:
        return <MyPageProfile />;
    }
  };
  
  return (
    <div>
      <div>
        <Logo />
      </div>
      <div>
      <nav style={myPageStyles.container}>
        <ul style={myPageStyles.nav}>
          {links.map((link) => (
            <li key={link.name} style={myPageStyles.navItem}>
              <a
                href="#"
                style={{
                  ...myPageStyles.navLink,
                  color: currentPage === link.name ? '#fff' : myPageStyles.navLink.color, 
                  textDecoration: currentPage === link.name ? myPageStyles.navLinkHover.textDecoration : 'none' 
                }}
                onClick={() => setCurrentPage(link.name)}
              >
              <img src={link.icon} alt={link.label} width="15" height="15" style={{ marginRight: '5px' }} />
              <span style={myPageStyles.navLinkText}>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div style={myPageStyles.content}>{renderPage()}</div>
      </div>
  </div>
  );
};

export default MyPage;
