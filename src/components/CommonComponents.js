import React, { useState, useRef } from "react";
import {
  commonStyles,
  LoginFormContainer,
  LoginInputField,
  LoginInputGroup,
  LoginInputLabel,
  LoginSubmitButton,
  JoinInputGroup,
  JoinInputLabel,
  ProfilePictureInput,
  ProfilePictureLabel,
  DefaultProfileImage,
  joinTitle,
  JoinButton,
  Verification,
  VerificationLabel,
  VerificationInput,
} from "../styles/styles";
import { Link } from 'react-router-dom';

function Logo() {

  const links = [
    { name: 'home', path: '/Review', label: '홈' },
    { name: 'review', path: '/Review', label: '게시판' },
    { name: 'mypage', path: '/MyPage', label: '마이페이지' },
    { name: 'logout', path: '', label: '로그아웃' }
  ];
    return (
    <header style={commonStyles.header}>
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
>>>>>>> 4a75e7140fc2ab23a8d7e6ba081f78d8a9966a74
  );
};

export { Logo };
