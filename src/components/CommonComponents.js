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
  // 기능 미구현 상태
};

const onProfilePictureChange = (event) => {
  const file = event.target.files[0];
};

// 회원가입 폼
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
        <form>
          <Verification>
            <VerificationLabel htmlFor="verificationCode">
              인증코드 입력
            </VerificationLabel>
            <VerificationInput type="text" id="verificationCode" required />
          </Verification>
          <JoinButton
            type="submit"
            style={{
              margin: "-2rem auto",
              marginBottom: "6rem",
            }}
            onClick={onVerificationSubmit}
          >
            완료
          </JoinButton>
        </form>
      )}
    </LoginFormContainer>
  );
};

// 비밀번호 찾기 폼
const FindPasswordForm = ({
  inputs,
  buttonText,
  onSubmit,
  hideButton,
  showVerification,
  onVerificationSubmit,
}) => {
  return (
    <LoginFormContainer onSubmit={onSubmit}>
      {inputs.map(({ label, type, id, required }) => (
        <LoginInputGroup key={id}>
          <LoginInputLabel htmlFor={id}>{label}</LoginInputLabel>
          <LoginInputField type={type} id={id} required={required} />
        </LoginInputGroup>
      ))}
      {!hideButton && (
        <LoginSubmitButton type="submit">{buttonText}</LoginSubmitButton>
      )}
      {showVerification && (
        <form>
          <LoginInputGroup>
            <LoginInputLabel style={{ fontSize: "1.4rem" }}>
              인증번호
            </LoginInputLabel>
            <LoginInputField type="text" id="verificationCode" required />
          </LoginInputGroup>
          <JoinButton
            type="submit"
            style={{
              margin: "0rem auto",
              marginTop: "4.2rem",
            }}
            onClick={onVerificationSubmit}
          >
            인증
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
  FindPasswordForm,
};
