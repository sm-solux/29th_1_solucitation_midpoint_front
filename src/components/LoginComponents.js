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
  VerificationButton,
} from "../styles/styles";
import { Timer } from "./CommonComponents";
import { useNavigate } from "react-router-dom";

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
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <LoginSubmitButton type="submit" onClick={onClick}>
        {buttonText}
      </LoginSubmitButton>
    </div>
  </LoginFormContainer>
);

// 회원가입 폼
const JoinForm = ({
  inputs,
  values,
  setValues,
  onProfile,
  showVerification,
  onVerificationSubmit,
}) => {
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // mock data
  const mockVerificationCode = "1234";

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

  // 입력 조건
  const validateInputs = (id, value) => {
    const newErrors = { ...errors };
    if (id === "nickname") {
      if (value.length < 2) {
        newErrors.nickname = "두글자 이상의 닉네임을 입력해 주세요.";
      } else {
        newErrors.nickname = "";
      }
    }
    if (id === "email") {
      const emailInput = document.getElementById("email").value.trim();
      if (!emailRegex.test(emailInput)) {
        newErrors.email = "올바른 이메일 주소를 입력해 주세요.";
      } else {
        newErrors.email = "";
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

  // 회원가입 버튼 함수
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };
    const newErrors = validateInputs(name, value);
    setValues(newValues);
    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};

    inputs.forEach(({ id }) => {
      const newErrors = validateInputs(id, values[id] || "");
      if (newErrors[id]) {
        formErrors[id] = newErrors[id];
      }
    });

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setVerificationVisible(true);
    }
  };

  const resend = (event) => {
    event.preventDefault();
    setResetTimer(true);
    setIsTimerActive(true);
    document.getElementById("verificationCode").value = "";
    setTimeout(() => setResetTimer(false), 1000);
  };

  const verify = (event) => {
    event.preventDefault();
    const verificationCodeInput = document
      .getElementById("verificationCode")
      .value.trim();

    if (verificationCodeInput === mockVerificationCode) {
      setErrors({ ...errors, verificationCode: "" });
      setIsTimerActive(false);
      alert("인증 완료되었습니다!");
      onVerificationSubmit(event);
    } else {
      alert("인증코드가 일치하지 않습니다.");
    }
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit} style={{ marginTop: "4.5rem" }}>
      {/* 회원가입 입력 */}
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

      {/* 프로필 사진 첨부 */}
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

      {/* 인증 요청 버튼 */}
      {!verificationVisible && (
        <div
          style={{
            width: "44rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginSubmitButton type="submit">인증 요청</LoginSubmitButton>
        </div>
      )}

      {/* 인증 버튼 클릭 후 보여지는 verification */}
      {verificationVisible && (
        <div>
          <div style={{ display: "flex" }}>
            <Verification>
              <VerificationLabel htmlFor="verificationCode">
                인증코드 입력
              </VerificationLabel>
              <VerificationInput
                type="text"
                id="verificationCode"
                required
                onChange={(e) => setErrors({ ...errors, verificationCode: "" })}
              />
              <Timer isActive={isTimerActive} resetTimer={resetTimer} />
            </Verification>
            <VerificationButton type="submit" onClick={resend}>
              재전송
            </VerificationButton>
            <VerificationButton type="submit" onClick={verify}>
              인증확인
            </VerificationButton>
          </div>
          <div
            style={{
              width: "44rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <JoinButton type="button" onClick={onVerificationSubmit}>
              완료
            </JoinButton>
          </div>
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
          <LoginInputLabel htmlFor={id} style={{width:'5rem'}}>{label}</LoginInputLabel>
          <LoginInputField type={type} id={id} required={required} />
        </LoginInputGroup>
      ))}
      {!hideButton && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LoginSubmitButton type="submit" style={{ width: "12rem" }}>
            {buttonText}
          </LoginSubmitButton>
        </div>
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
