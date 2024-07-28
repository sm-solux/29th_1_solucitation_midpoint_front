import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  useEffect(() => {
    fetch(`http://3.36.150.194:8080/api/auth/oauth2/code/kakao?code=${code}`, {
      method: "POST",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { accessToken, refreshToken } = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/home");
      })
      .catch((error) => {
        console.error("오류 발생", error);
      });
  }, [code, navigate]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}
export default KakaoRedirect;
