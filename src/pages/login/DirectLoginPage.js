import React from "react";
import styled from "styled-components";
import { Logo, LoginTitle, LoginForm } from "../../components/CommonComponents";
import { commonStyles, LoginText } from "../../styles/styles";





const inputs = [
  { label: "이메일", type: "email", id: "email", required: true },
  { label: "비밀번호", type: "password", id: "password", required: true }
];

function DirectLoginPage() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };
  return (
    <div>
      <Logo />
      <LoginTitle text="로그인" />
      <LoginForm inputs={inputs} buttonText="로그인" onSubmit={handleSubmit}/>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3rem'}}>
        <LoginText style={{marginRight: '2rem'}}>비밀번호 찾기</LoginText>
        <LoginText>회원가입</LoginText>
      </div>
    </div>
  );
}

export default DirectLoginPage;
