import React from "react";
import {
  commonStyles,
  LoginFormContainer,
  LoginInputField,
  LoginInputGroup,
  LoginInputLabel,
  LoginSubmitButton,
  JoinInputGroup,
  JoinInputLabel,
  ProfilePictureInput,
  ProfilePictureLabel,
  DefaultProfileImage,
  joinTitle,
  JoinButton,
  Verification,
  VerificationLabel,
  VerificationInput,
} from "../styles/styles";

const Logo = () => {
  return (
    <div style={{ marginTop: "15px" }}>
      <img src="/img/logo.png" style={commonStyles.logoImg} alt="Logo" />
      <h1 style={commonStyles.logo}>MIDPOINT</h1>
    </div>
  );
};

const LoginTitle = ({ text }) => {
  return <h1 style={commonStyles.loginTitle}>{text}</h1>;
};

const JoinTitle = ({ text }) => {
  return <h1 style={commonStyles.joinTitle}>{text}</h1>;
};

const LoginForm = ({ onSubmit, inputs, buttonText, onClick }) => (
  <LoginFormContainer onSubmit={onSubmit}>
    {inputs.map(({ label, type, id, required }) => (
      <LoginInputGroup key={id}>
        <LoginInputLabel htmlFor={id}>{label}</LoginInputLabel>
        <LoginInputField type={type} id={id} required={required} />
      </LoginInputGroup>
    ))}
    <LoginSubmitButton type="submit" onClick={onClick}>
      {buttonText}
    </LoginSubmitButton>
  </LoginFormContainer>
);

const handleDefaultProfileClick = () => {
  // 기능 구현
};

const onProfilePictureChange = (event) => {
  const file = event.target.files[0];
};

const JoinForm = ({
  inputs,
  buttonText,
  onSubmit,
  onProfile,
  hideButton,
  showVerification,
  onVerificationSubmit,
}) => {
  const fileInputRef = React.useRef(null);

  const handleDefaultProfileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <LoginFormContainer onSubmit={onSubmit}>
      {inputs.map(({ label, type, id, required }) => (
        <JoinInputGroup key={id}>
          <JoinInputLabel htmlFor={id}>{label}</JoinInputLabel>
          <LoginInputField type={type} id={id} required={required} />
        </JoinInputGroup>
      ))}
      <ProfilePictureLabel htmlFor="profilePicture">
        프로필 사진 선택
      </ProfilePictureLabel>
      <DefaultProfileImage
        src="/img/default-profile.png"
        alt="기본 프로필 이미지"
        onClick={handleDefaultProfileClick}
      />
      <ProfilePictureInput
        id="profilePicture"
        ref={fileInputRef}
        onChange={onProfile}
      />
      {!hideButton && (
        <LoginSubmitButton type="submit">{buttonText}</LoginSubmitButton>
      )}
      {showVerification && (
        <form onSubmit={onVerificationSubmit}>
          <Verification>
            <VerificationLabel htmlFor="verificationCode">
              인증코드 입력
            </VerificationLabel>
            <VerificationInput type="text" id="verificationCode" required />
          </Verification>
          <JoinButton
            type="submit"
            style={{ 
              margin: '-2rem auto',
              marginBottom: "6rem",
            }}
          >
            완료
          </JoinButton>
        </form>
      )}
    </LoginFormContainer>
  );
};

export {
  Logo,
  LoginTitle,
  JoinTitle,
  LoginForm,
  JoinForm,
  handleDefaultProfileClick,
  onProfilePictureChange,
};
