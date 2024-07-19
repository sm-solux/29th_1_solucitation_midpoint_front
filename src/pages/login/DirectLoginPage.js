import React from "react";
import styled from "styled-components";
import { Logo } from "../../components/CommonComponents";
import { LoginTitle, LoginForm } from "../../components/LoginComponents";
import { commonStyles, LoginText } from "../../styles/styles";
import { Navigate, useNavigate } from "react-router-dom";

const inputs = [
  { label: "닉네임 또는 이메일", type: "id", id: "id", required: true },
  { label: "비밀번호", type: "password", id: "password", required: true },
];

function DirectLoginPage() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/home')
  };
  const toFindPassword = () => {
    navigate("/login/findpassword");
  };
  const toJoin = () => {
    navigate("/login/join");
  };
  return (
    <div>
      <Logo />
      <div style={commonStyles.centerContainer}>
        <LoginTitle text="로그인" />
        <LoginForm
          inputs={inputs}
          buttonText="로그인"
          onSubmit={handleSubmit}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <LoginText style={{ marginRight: "3rem" }} onClick={toFindPassword}>
            비밀번호 찾기
          </LoginText>
          <LoginText onClick={toJoin}>회원가입</LoginText>
        </div>
      </div>
    </div>
  );
}

export default DirectLoginPage;
