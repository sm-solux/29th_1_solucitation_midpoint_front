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
    padding: 0,
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
  flexDirection: 'column',
  width: 'fit-content',
  margin: '0 auto',
},

  profileItem: {
    marginBottom: '10px',
    alignItems: 'center', 
  },

  profileLabel: {
    width: '150px',
    display: 'inline-block',
    marginBottom: '40px',
    color: '#1B4345',
    fontSize: '18px',
    fontWeight: 'bold',
  },

  profileText: {
    width:'400px',
    display: 'inline-block',
    paddingBottom: '6px',
    borderBottom: '3px solid black',
    color: '#1B4345',
    fontSize: '18px',
    fontWeight: 'bold',
  },

  profileButtonEdit: {
    width: '100px',
    height:'35px',
    color: '#ffffff',
    backgroundColor: '#1B4345',
    border: 'none',
    fontSize: '17px',
    margin:'40px auto 0 150px'
  },
  
  profileButtonQuit: {
    width: '100px',
    height:'35px',
    color: '#fff',
    backgroundColor:'#D00303',
    border: 'none',
    fontSize: '17px',
    marginLeft:'75px'
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
