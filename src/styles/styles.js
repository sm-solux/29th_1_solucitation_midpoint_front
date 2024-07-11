import styled from "styled-components";

export const commonStyles = {
  header: {
    position: "fixed",
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    top: 0,
    zIndex: 1000,
  },
  logo_div: {
    marginLeft: "4.5rem",
  },
  logo: {
    fontFamily: "AkiraExpanded",
    fontSize: "2rem",
    color: "#1B4345",
    display: "inline-block",
    verticalAlign: "middle",
    cursor: "pointer",
  },
  move_div: {
    height: "40px",
    float: "right",
    marginTop: "10px",
    marginRight: "4.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkContainer: {
    position: "relative",
    display: "inline-block",
    margin: "0 10px",
    textAlign: "center",
  },
  link: {
    fontSize: "1.5rem",
    color: "#000000",
    height: "20px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    // padding: '10px 16px',
    paddingLeft: "52px",
    marginBottom: "12px",
    fontWeight: "bold",
    marginRight: "-15px",
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
    marginTop: "7.15rem",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "calc(100vh - 10% - 12.6rem)",
    paddingTop: "6.3rem",
    paddingBottom: "6.3rem",
  },

  nav: {
    display: "flex",
    gap: "2rem",
    marginRight: "3rem",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#F2F2EF",
  },
  content: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "8px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    width: "100%",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "1rem",
  },
  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  profileName: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    flex: 1,
    width: "500px", // 고정된 크기
    padding: "0.7rem",
    fontSize: "1rem",
    border: "1px solid #FFF",
    borderRadius: "4px",
    marginRight: "0.5rem",
    textAlign: "center",
  },
  selectField: {
    flex: 1,
    padding: "0.7rem",
    fontSize: "1rem",
    border: "1px solid #FFF",
    borderRadius: "4px",
    textAlign: "center",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'><polyline points='0,0 70,100 140,0' style='fill:none;stroke:black;stroke-width:20'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 15px center",
    backgroundSize: "12px",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  },
  submitButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1B4345",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  placeButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1B4345",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "3rem",
  },
  addButton: {
    cursor: "pointer",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundImage: 'url("/img/plusbutton.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  destination: {
    display: "flex",
    width: "100%",
    marginTop: "1rem",
  },
};

export const LoginFormContainer = styled.form`
  width: 44rem; 
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 내부 내용물을 왼쪽으로 정렬 */
  background-color: transparent !important;
  margin-top: 2.6rem;
`;

export const LoginInputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 44rem;
  margin-bottom: 3.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.3rem solid #1b4345;
  font-size: 1.4rem;
  font-weight: 800;
`;

export const LoginInputLabel = styled.label`
  width: 9.5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  color: #1b4345;
`;

export const LoginInputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
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
  width: 100%;
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
`;

export const DefaultProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  margin-top: -0.3rem;
  cursor: pointer;
  align-self: flex-start;
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
  flex-direction: row; 
  align-items: center;
  width: 29rem;
  height: 2.5rem;
  margin-top: 3.8rem;
  margin-bottom: 5.1rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.25rem solid #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
  margin-right: 0.8rem;
`;

export const VerificationLabel = styled.label`
  width: 7rem;
  color: #1b4345;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const VerificationInput = styled.input`
  width: 65%;
  padding: 10px;
  border: none;
  font-size: 1rem;
  background-color: transparent !important;
  outline: none;
`;

export const VerificationButton = styled.button`
  width: 16%;
  height: 2.7rem;
  padding: 1rem;
  margin-top: 4.1rem;
  margin-right: 0.3rem;
  border: 0.2rem solid #1b4345;
  border-radius: 0.2rem;
  background-color: transparent;
  color: #1b4345;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSelect = styled.select`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #fff;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  appearance: none;
  webkitappearance: none;
  mozappearance: none;
  textalignlast: center;
`;

export const StyledOption = styled.option`
  padding: 1rem;
`;
