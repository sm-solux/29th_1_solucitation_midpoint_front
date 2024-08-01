import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Logo } from "../../components/CommonComponents";
import { LoginTitle } from "../../components/LoginComponents";
import { commonStyles, LoginText } from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginButton = styled.button`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.01rem;
  width: 28rem;
  height: 4rem;
  border: none;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 2.6rem;
  margin-bottom: -1.65rem;
`;

function LoginPage() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login/join");
  };
  const toDirectLogin = () => {
    navigate("/login/direct");
  };

  const [kakaoConfig, setKakaoConfig] = useState(null);

  useEffect(() => {
    const fetchKakaoConfig = async () => {
      try {
        const response = await fetch(
          "http://3.36.150.194:8080/api/auth/kakao-login-info",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const configData = await response.json();
        setKakaoConfig(configData);
      } catch (error) {
        console.error("Failed to fetch Kakao configuration:", error);
      }
    };

    fetchKakaoConfig();
  }, []);

  const kakaoLogin = () => {
    if (kakaoConfig) {
      const { clientId, redirectUri } = kakaoConfig;
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = kakaoURL;
    } else {
      console.error("카카오 설정이 아직 로드되지 않았습니다.");
    }
  };

  return (
    <div>
      <Logo />
      <div style={commonStyles.centerContainer}>
        <LoginTitle text="로그인" />
        <LoginButton
          style={{ backgroundColor: "#F7E04B", color: "#21201E" }}
          onClick={kakaoLogin}
          disabled={!kakaoConfig}
        >
          <img
            src="/img/kakao.png"
            style={{ width: 19, marginRight: 8 }}
            alt="Kakao Logo"
          />
          카카오계정 로그인
        </LoginButton>
        <LoginButton
          style={{ backgroundColor: "#1B4345", color: "#FFFFFF" }}
          onClick={toDirectLogin}
        >
          미드포인트 로그인
        </LoginButton>
        <LoginText style={{ marginTop: "6rem" }} onClick={onClick}>
          회원가입
        </LoginText>
      </div>
    </div>
  );
}

const OAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const [oauthData, setOauthData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (code) {
      const fetchOAuthData = async (code) => {
        console.log("Starting fetchOAuthData with code:", code);
        try {
          const response = await fetch(
            `http://3.36.150.194:8080/api/auth/oauth2/code/kakao?code=${code}`,
            {
              method: "POST",
            }
          );

          console.log("Fetch response:", response);
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error data from server:", errorData);
            throw new Error(
              `HTTP error! Status: ${
                response.status
              }, Details: ${JSON.stringify(errorData)}`
            );
          }

          const data = await response.json();
          console.log("Server response data:", data);
          setOauthData(data);
          console.log("Access Token:", data.accessToken);
        } catch (error) {
          setError(error.message);
          console.error("Error occurred while fetching OAuth data:", error);
        }
      };

      fetchOAuthData(code);
    } else {
      console.error("No OAuth code found in URL");
    }
  }, [code]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (oauthData) {
    return <div>로그인 성공! Access Token: {oauthData.accessToken}</div>;
  }

  return <div>로그인 중입니다.</div>;
};

export { LoginPage, OAuth };
