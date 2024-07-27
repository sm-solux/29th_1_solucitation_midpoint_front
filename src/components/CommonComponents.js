import React, { useState, useEffect } from "react";
import axios from 'axios';
import { commonStyles } from "../styles/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

// 헤더 (배경색 설정 가능 / default는 transparent)
function Logo({ exist = true, bgColor = "transparent" }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/home");
  };

  const loggedInLinks = [
    { name: "home", path: "/home", label: "홈" },
    { name: "review", path: "/Review", label: "게시판" },
    { name: "mypage", path: "/MyPage", label: "마이페이지" },
    { name: "logout", path: "/", label: "로그아웃" },
  ];

  const loggedOutLinks = [
    { name: "home", path: "/home", label: "홈" },
    { name: "review", path: "/Review", label: "게시판" },
    { name: "login", path: "/login", label: "로그인" },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const linkStyle = {
    ...commonStyles.link,
    textDecoration: "none",
  };

  const activeLinkStyle = {
    ...linkStyle,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  };

  const getLinkStyle = (link) => {
    const isActive = location.pathname.startsWith(link.path);
    if (link.name === "logout") {
      return linkStyle;
    }
    return isActive ? activeLinkStyle : linkStyle;
  };

  //로그아웃 부분
    const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      console.error("No tokens found for logout.");
      setIsLoggedIn(false);
      navigate("/home");
      return;
    }

    try {
      const response = await axios.post(
        "http://3.36.150.194:8080/api/member/logout",
        {},
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "logout-token": `Bearer ${refreshToken}`,
          },
        }
      );
      console.log("Logout Successful:", response.data.message);
      
      localStorage.removeItem("accessToken"); //로그아웃 3번방법 3번
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          if (data.error === "access_token_expired") { //accesstoken 재발금 받는 부분은 미구현
            console.error("The access token has expired.");
          } else if (data.error === "invalid_token") {
            console.error("The access token is invalid.");
          }
        } else {
          console.error("Logout failed:", data.message || error.message);
        }
      } else {
        console.error("Logout failed:", error.message);
      }
      setIsLoggedIn(false);
      navigate("/home");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

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
            {link.name === "logout" ? (
              <span
                style={getLinkStyle(link)}
                onClick={handleLogout}
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

export default Logo;

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
            alert("입력시간을 초과했습니다.");
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
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div>
      <h5
        style={{
          color: "#EC5640",
          marginLeft: "6.5rem",
        }}
      >
        {formatTime(seconds)}
      </h5>
    </div>
  );
};

export { Logo, Timer };
