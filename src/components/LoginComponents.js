import React, { useState, useRef } from "react";
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
  JoinButton,
  Verification,
  VerificationLabel,
  VerificationInput,
} from "../styles/styles";

const LoginTitle = ({ text }) => {
  return <h1 style={commonStyles.loginTitle}>{text}</h1>;
};

const JoinTitle = ({ text }) => {
  return <h1 style={commonStyles.joinTitle}>{text}</h1>;
};

// 로그인 폼
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
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);

  const handleDefaultProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    onProfile(event);
  };

  // input validation
  const validateInputs = (id, value) => {
    const newErrors = { ...errors };
    if (id === "nickname") {
      if (value.length < 2) {
        newErrors.nickname = "닉네임은 두 글자 이상이어야 합니다.";
      } else {
        newErrors.nickname = "";
      }
    }
    if (id === "password") {
      if (value.length < 8 || value.length > 16) {
        newErrors.password = "비밀번호는 8자 이상 16자 이하여야 합니다.";
      } else {
        newErrors.password = "";
      }
      if (
        values.passwordVerification &&
        value !== values.passwordVerification
      ) {
        newErrors.passwordVerification = "비밀번호가 일치하지 않습니다.";
      } else {
        newErrors.passwordVerification = "";
      }
    }
    if (id === "passwordVerification") {
      if (value !== values.password) {
        newErrors.passwordVerification = "비밀번호가 일치하지 않습니다.";
      } else {
        newErrors.passwordVerification = "";
      }
    }
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };
    const newErrors = validateInputs(name, value);
    setValues(newValues);
    setErrors({ ...errors, ...newErrors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      {inputs.map(({ label, type, id, required }) => (
        <JoinInputGroup key={id}>
          <JoinInputLabel htmlFor={id}>{label}</JoinInputLabel>
          <LoginInputField
            type={type}
            id={id}
            name={id}
            required={required}
            onChange={handleChange}
          />
          {errors[id] && (
            <p style={{ color: "red", marginBottom: "0rem", fontSize: "1rem" }}>
              {errors[id]}
            </p>
          )}
        </JoinInputGroup>
      ))}
      <ProfilePictureLabel htmlFor="profilePicture">
        프로필 사진 선택
      </ProfilePictureLabel>
      {selectedProfileImage && (
        <DefaultProfileImage
          src={selectedProfileImage}
          style={{
            borderRadius: "50%",
          }}
          onClick={handleDefaultProfileClick}
        />
      )}
      {!selectedProfileImage && (
        <DefaultProfileImage
          src="/img/default-profile.png"
          onClick={handleDefaultProfileClick}
        />
      )}
      <ProfilePictureInput
        id="profilePicture"
        ref={fileInputRef}
        onChange={handleProfileChange}
      />
      {!hideButton && (
        <LoginSubmitButton type="submit">{buttonText}</LoginSubmitButton>
      )}
      {showVerification && (
        <div>
          <Verification>
            <VerificationLabel htmlFor="verificationCode">
              인증코드 입력
            </VerificationLabel>
            <VerificationInput type="text" id="verificationCode" required />
          </Verification>
          <JoinButton
            type="button"
            style={{
              margin: "-2rem auto",
              marginBottom: "6rem",
            }}
            onClick={onVerificationSubmit}
          >
            완료
          </JoinButton>
        </div>
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

export { LoginTitle, JoinTitle, LoginForm, JoinForm, FindPasswordForm };
