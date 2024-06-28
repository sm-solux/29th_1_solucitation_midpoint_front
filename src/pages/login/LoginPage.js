import React from "react";
import styled from "styled-components";
import { Logo, LoginTitle } from "../../components/CommonComponents";
import { commonStyles, LoginText } from "../../styles/styles";

const LoginButton = styled.button`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.01rem;
  width: 28rem;
  height: 4rem;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 2.6rem;
  margin-bottom: -1.65rem;
`;


function LoginPage() {
  
  return (
    <div>
      <Logo />
      <LoginTitle text="로그인" />
      <div style={commonStyles.centerContainer}>
        <LoginButton style={{ backgroundColor: "#F7E04B", color: "#21201E" }}>
          <img src="/img/kakao.png" style={{ width: 19, marginRight: 8 }} />
          카카오계정 로그인
        </LoginButton>
        <LoginButton style={{ backgroundColor: "#1B4345", color: "#FFFFFF" }} >
          미드포인트 로그인
        </LoginButton>
        <LoginText>회원가입</LoginText>
      </div>
    </div>
  );
}

export default LoginPage;
