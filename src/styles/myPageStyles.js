import styled from "styled-components";

export const myPageStyles = {
  container: {
    maxWidth: '1000px',
    height:'40px',
    margin: '125px auto 60px auto',
    backgroundColor: '#000',
    marginTop: '110px'
  },
  nav: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    display: 'flex',
    margin: '0 55px',
    padding: '10px',
    alignItems: 'center', 
    color:'#000',

  },
  navLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize:'17px'
  },
  navLinkText: {
    marginLeft: '5px',
    color:'#fff',
  },
  navLinkHover: {
    textDecoration: 'underline',
  },

  profileContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  profileItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profilePictureItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  verificationContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileLabel: {
    minWidth: '100px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1B4345',
  },
  profileText: {
    flex: 1,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1B4345',
    borderBottom: '3px solid black',
    paddingBottom: '6px',
  },
  profileEditContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  profileEditText: {
    flex: 1,
    border: 'none',
    borderBottom: '3px solid black',
    backgroundColor: 'transparent',
    color: '#1B4345',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 0',
    outline: 'none',
  },
  profileButton: {
    marginLeft: '10px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: 'transparent',
    border: '2px solid #1B4345',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  profileButtonEdit: {
    marginRight: '10px',
    padding: '10px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1B4345',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  profileButtonQuit: {
    padding: '10px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#D00303',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  profileButtonCancel: {
    marginLeft: '10px',
    padding: '10px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: 'transparent',
    border: '2px solid #1B4345',
    borderRadius: '2px',
    cursor: 'pointer',
  },

  favoritesContainer: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '100px',
    marginTop: '50px',
  },

  favoritesLocateContainer: {
    width: '200px',
    height: '150px',
    backgroundColor: 'white',
    borderRadius: "8px",
    padding: '10px',
  },

  favoritesFriendsContainer: {
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: "8px",
    padding: '10px',
  },

  locateontainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginLeft: '20px',
    whiteSpace: 'pre-wrap',
    paddingBottom: '15px',
    cursor:'pointer',
  },

  addFriendButton: {
    border: 'none',
    backgroundColor: 'transparent',
    display: 'inline-block',
    cursor: 'pointer',
  },

  overlay: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
  },
  
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '350px',
    backgroundColor: '#F2F2EF',
    padding: "20px",
    border: '3px solid #000',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1B4345',
    position: 'absolute',
    fontSize: '30px',
    fontWeight: 'bold',
    top: '30px',
    right: '30px',
    zIndex: '1000',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addImg: {
    width: '60px',
    display: 'block',
    margin: '0 auto',
  },
  inputName: {
    width: '400px',
    height: '40px',
    border: 'none',
    textAlign: 'center',
    color: '#000',
    fontSize: '15px',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  inputLocate: {
    width: '400px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    outline: 'none',
  },
  addFriendModalButton: {
    width: '100px',
    height: '35px',
    color: '#ffffff',
    backgroundColor: '#1B4345',
    border: 'none',
    fontSize: '15px',
    marginTop: '30px',
  },
  favoriteButtonEdit: {
    width: '80px',
    height: '35px',
    color: '#ffffff',
    backgroundColor: '#1B4345',
    border: 'none',
    fontSize: '15px',
    marginTop: '50px',
  },
  favoriteButtonQuit: {
    width: '80px',
    height: '35px',
    color: '#fff',
    backgroundColor: '#D00303',
    border: 'none',
    fontSize: '15px',
    marginLeft: '55px',
  },
};

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
