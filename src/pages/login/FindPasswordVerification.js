import React from 'react';
import { Logo, LoginTitle, LoginForm } from "../../components/CommonComponents";
import { commonStyles, LoginText } from "../../styles/styles";
import { useNavigate } from 'react-router-dom';


const inputs = [
  { label: "이름", type: "name", id: "name", required: true },
  { label: "이메일", type: "email", id: "email", required: true },
  { label: "인증번호", type: "number", id: "number", required: true }
];

function FindPassword() {
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    navigate('/findpassword-verification');
  };
  return (
    <div>
      <Logo />
      <LoginTitle text="비밀번호 찾기" />
      <LoginForm inputs={inputs} buttonText="인증" onSubmit={handleSubmit} />
    </div>
  )
}

export default FindPassword