import { React, useState } from "react";
import { Logo } from "../../components/CommonComponents";
import { LoginTitle, FindPasswordForm } from "../../components/LoginComponents";
import { commonStyles, LoginText } from "../../styles/styles";

const inputs = [
  { label: "이름", type: "name", id: "name", required: true },
  { label: "이메일", type: "email", id: "email", required: true },
];

function FindPassword() {
  const [verificationVisible, setVerificationVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log("Name:", name);
    console.log("Email:", email);
    setVerificationVisible(true);
  };

  return (
    <div>
      <Logo />
      <div style={commonStyles.centerContainer}>
        <LoginTitle text="비밀번호 찾기" />
        <FindPasswordForm
          inputs={inputs}
          onSubmit={handleSubmit}
          hideButton={verificationVisible}
          showVerification={verificationVisible}
        />
      </div>
    </div>
  );
}

export default FindPassword;
