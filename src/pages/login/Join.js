import React, {useState} from "react";
import { Logo, LoginTitle, JoinForm, JoinTitle } from "../../components/CommonComponents";
import { commonStyles, LoginText, Verification, VerificationLabel } from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const inputs = [
  { label: "이름", type: "name", id: "name", required: true },
  { label: "닉네임", type: "name", id: "nickname", required: true },
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
    console.log("Profile picture changed:", event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('profileImage').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    navigate('/join-verification');
  };


  return (
    <div>
      <Logo />
      <JoinTitle text="회원가입" style={{marginTop: '-3rem'}} />
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
