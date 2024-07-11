import styled from "styled-components";

export const commonStyles = {
  logoImg: {
    display: "inline-block",
    width: "1.6rem",
    height: "auto",
    marginTop: "1.6rem",
    marginLeft: "3.8rem",
    marginRight: "0.5rem",
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#000000",
    display: "inline-block",
  },
  loginTitle: {
    fontSize: "3.4rem",
    textAlign: "center",
    fontWeight: "700",
    marginTop: "7.3rem",
  },
  joinTitle: {
    fontSize: "3.05rem",
    textAlign: "center",
    fontWeight: "700",
    marginTop: "1rem",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '1rem 2rem',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    marginRight: '3rem',
  },
  link: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#F2F2EF',
  },
  content: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '8px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    width: '100%',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '1rem',
  },
  profileImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  profileName: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputField: {
    flex: 1,
    width: '500px', // 고정된 크기
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #FFF',
    borderRadius: '4px',
    marginRight: '0.5rem',
    textAlign: 'center',
  },
  selectField: {
    flex: 1,
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #FFF',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 140 140\' xmlns=\'http://www.w3.org/2000/svg\'><polyline points=\'0,0 70,100 140,0\' style=\'fill:none;stroke:black;stroke-width:20\'/></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '12px',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#1B4345',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  placeButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#1B4345',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '3rem',
  },
  retryButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#1B4345',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addButton: {
    cursor: 'pointer',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundImage: 'url("/img/plusbutton.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  destination: {
    display: 'flex',
    width: '100%',
    marginTop: '1rem',
  },
  testContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#F2F2EF',
  },
  testTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  testOptions: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  optionImg: {
    width: '100px',
    height: '100px',
    marginBottom: '0.5rem',
  },
  optionText: {
    fontSize: '1.2rem',
    fontWeight: '600',
  },
};

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  margin-top: 4.9rem;
`;

export const LoginInputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 44rem;
  margin-bottom: 3.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.3rem solid #1b4345;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const LoginInputLabel = styled.label`
  width: 5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  color: #1b4345;
`;

export const LoginInputField = styled.input`
  flex: 1,
  padding: 10px,
  border: none,
  font-size: 1rem;
  background-color: transparent !important;
  outline: none;
  box-shadow: none;
`;

export const LoginSubmitButton = styled.button`
  width: 8.95rem;
  height: 2.7rem;
  padding: 1rem;
  margin-top: 0.8rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #1b4345;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginText = styled.p`
  font-size: 1.3rem;
  font-weight: 800;
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5px;
    background-color: #000000;
  }
`;

export const JoinInputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 44rem;
  margin-top: -2.45rem;
  margin-bottom: 5.1rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.25rem solid #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const JoinInputLabel = styled.label`
  width: 6rem;
  margin-right: 0.5rem;
  color: #1b4345;
`;

export const ProfilePictureLabel = styled.label`
  margin-top: -1.8rem;
  margin-bottom: 1rem;
  color: #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
  align-self: flex-start;
  margin-left:31.3rem;
`;

export const DefaultProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  margin-top: -0.3rem;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 31.3rem;
`;

export const ProfilePictureInput = styled.input.attrs({
  type: "file",
  id: "profilePicture",
  accept: "image/*",
})`
  display: none;
`;

export const JoinButton = styled.button`
  width: 8.95rem;
  height: 2.7rem;
  padding: 1rem;
  margin-top: 1.6rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #1b4345;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Verification = styled.div`
  display: flex;
  align-items: center;
  width: 44rem;
  margin-top: 3.8rem;
  margin-bottom: 5.1rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.25rem solid #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const VerificationLabel = styled.label`
  width: 6rem;
  color: #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const VerificationInput = styled.input`
  padding: 10px;
  border: none;
  font-size: 1rem;
  background-color: transparent !important;
  outline: none;
`;

export const StyledSelect = styled.select`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #FFF;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #FFF;
  appearance: none;
  WebkitAppearance: none;
  MozAppearance: none;
  textAlignLast: center;
`;

export const StyledOption = styled.option`
  padding: 1rem; 
`;

export const TestFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  margin-top: 4.9rem;
`;

export const ButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: none;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 1rem;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 80px;
    height: auto;
  }

  span {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #1b4345;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 2rem;
  position: relative;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #000; /* 색상을 검은색으로 변경 */
  border-radius: 5px;
  position: relative;
  transition: width 0.3s ease;
`;

export const ProgressIndicator = styled.div`
  width: 20px;
  height: 20px;
  background-color: #000; /* 색상을 검은색으로 변경 */
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: 0; /* 인디케이터를 진행 바의 맨 오른쪽에 위치하게 설정 */
  transform: translateX(50%);
`;

export const PlaceContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center; /* WhiteBox를 가운데로 정렬 */
  padding: 1rem;
`;

export const PlacesList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const PlaceItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    background-color: #000; /* 배경색을 검은색으로 변경 */
    border-radius: 8px;
    padding: 0.5rem;
    flex: 1;

    h3, p {
      color: #fff; /* 글자색을 흰색으로 변경 */
    }

    h3 {
      font-size: 1rem;
      margin: 0;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.8rem;
      margin: 0;
    }
  }
`;

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const WeatherInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }

  span {
    font-size: 1rem;
    color: #666;
  }
`;

export const Right = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const MapContainer = styled.div`
  h2 {
    margin-bottom: 1rem;
  }

  iframe {
    border: 0;
    width: 100%;
    height: 400px;
  }
`;

export const WhiteBox = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%; /* Left 컨테이너 내에서의 크기를 설정 */
  max-width: 90%; /* 최대 너비 설정 */
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #FFF;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  span {
    font-weight: 800; /* 글씨 굵기를 설정 */
  }

  img {
    margin-left: 0.5rem;
  }
`;
