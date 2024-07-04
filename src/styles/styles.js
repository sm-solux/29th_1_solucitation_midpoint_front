import styled from "styled-components";

export const commonStyles = {
<<<<<<< HEAD
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
`

=======
  header: {
    position: 'fixed',
    top: 10,
    left: 40,
    width: '100%',
    padding: '10px 0',
  },
  logo_div: {
    width: "400px",
    display: "inline",
    margin: "0 auto",
  },
  logo_img: {
    display: 'inline-block',
    width: 29,
    marginRight: '10px',
    verticalAlign: 'middle'
  },
  logo: {
    fontSize: '25px',
    color: '#000000',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  move_div: {
    width: "600px",
    height: "40px",
    float: 'right',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 10px',
    textAlign: 'center',
  },
  link: {
    fontSize: '25px',
    color: '#000',
    height:"20px",
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    position: 'relative',
    padding: '10px 20px',
    marginBottom: '5px',
  },
  icon: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-10px',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'black',
  },
};
>>>>>>> origin/feature/review
