import React, { useState } from "react";
import { commonStyles } from "../styles/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Logo({ exist = true }) {
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

  const getLinkStyle = (path) => {
    const isActive = location.pathname.startsWith(path);
    return isActive ? activeLinkStyle : linkStyle;
  };

  return (
    <header style={commonStyles.header}>
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
                style={getLinkStyle(link.path)}
                onClick={() => setIsLoggedIn(false)}
              >
                {link.label}
              </span>
            ) : (
              <Link to={link.path} style={getLinkStyle(link.path)}>
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}

export { Logo };
