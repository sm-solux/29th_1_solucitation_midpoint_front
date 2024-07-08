import React, { useState, useRef } from "react";
import { Logo } from "../../components/CommonComponents";
import { JoinForm, JoinTitle } from "../../components/LoginComponents";
import { useNavigate } from "react-router-dom";

const inputs = [
  { label: "이름", type: "name", id: "name", required: true },
  { label: "닉네임", type: "text", id: "nickname", required: true },
  { label: "이메일", type: "email", id: "email", required: true },
  { label: "비밀번호", type: "password", id: "password", required: true },
  {
    label: "비밀번호 확인",
    type: "password",
    id: "passwordVerification",
    required: true,
  },
];

function Join() {
  const [verificationVisible, setVerificationVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setVerificationVisible(true);
  };

  const handleProfileChange = (event) => {
    console.log(event.target.files[0]);
  };

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <Logo />
      <JoinTitle text="회원가입" />
      <JoinForm
        inputs={inputs}
        buttonText="인증요청"
        onSubmit={handleSubmit}
        onProfile={handleProfileChange}
        hideButton={verificationVisible}
        showVerification={verificationVisible}
        onVerificationSubmit={handleVerificationSubmit}
      />
    </div>
  );
}

export default Join;
