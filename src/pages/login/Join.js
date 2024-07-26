import React, { useState } from "react";
import { Logo } from "../../components/CommonComponents";
import { JoinForm, JoinTitle } from "../../components/LoginComponents";
import { useNavigate } from "react-router-dom";

const inputs = [
  { label: "이름", type: "name", id: "name", required: true },
  { label: "닉네임", type: "text", id: "nickname", required: true },
  { label: "이메일", type: "text", id: "email", required: true },
  { label: "비밀번호", type: "password", id: "password", required: true },
  {
    label: "비밀번호 확인",
    type: "password",
    id: "passwordVerification",
    required: true,
  },
];

function Join() {
  const [values, setValues] = useState({});
  const [verificationVisible, setVerificationVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event, formErrors) => {
    event.preventDefault();
    if (formErrors && Object.keys(formErrors).length === 0) {
      setVerificationVisible(true);
    }
  };

  const handleProfileChange = (event) => {
    console.log(event.target.files[0]);
  };

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted values:", values);
    navigate("/login");
  };

  return (
    <div>
      <Logo bgColor="#F2F2EF"/>
      <JoinTitle text="회원가입" />
      <JoinForm
        inputs={inputs}
        values={values}
        setValues={setValues}
        onSubmit={handleSubmit}
        onProfile={handleProfileChange}
        showVerification={verificationVisible}
        onVerificationSubmit={handleVerificationSubmit}
      />
    </div>
  );
}

export default Join;
