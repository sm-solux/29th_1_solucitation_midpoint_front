import React from "react";
import styled from "styled-components";
import { Logo } from "../../components/CommonComponents";
import { LoginTitle } from "../../components/LoginComponents";
import { commonStyles, LoginText } from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const LoginButton = styled.button`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.01rem;
  width: 28rem;
  height: 4rem;
  border: none;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 2.6rem;
  margin-bottom: -1.65rem;
`;

function LoginPage() {
  // 회원가입 및 자체로그인 navigate
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login/join");
  };
  const toDirectLogin = () => {
    navigate("/login/direct");
  };

  // 카카오로그인 구현
  const Rest_api_key = "REST API KEY"; //REST API KEY
  const redirect_uri = "http://localhost:3000/auth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <Logo />
      <div style={commonStyles.centerContainer}>
        <LoginTitle text="로그인" />
        <LoginButton style={{ backgroundColor: "#F7E04B", color: "#21201E" }}>
          <img
            src="/img/kakao.png"
            style={{ width: 19, marginRight: 8 }}
            onClick={kakaoLogin}
          />
          카카오계정 로그인
        </LoginButton>
        <LoginButton
          style={{ backgroundColor: "#1B4345", color: "#FFFFFF" }}
          onClick={toDirectLogin}
        >
          미드포인트 로그인
        </LoginButton>
        <LoginText style={{ marginTop: "6rem" }} onClick={onClick}>
          회원가입
        </LoginText>
      </div>
    </div>
  );
}

export default LoginPage;
