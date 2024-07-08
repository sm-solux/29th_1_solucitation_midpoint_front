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
    paddingBottom:'15px'
  },

  addFriendButton: {
    border: 'none',
    backgroundColor: 'transparent',
    display: 'inline-block',
    cursor: 'pointer',
  },

};
