export const myPageStyles = {
  container: {
    maxWidth: '1170px',
    height:'50px',
    margin: '0 auto',
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
    fontSize:'25px'
  },
  navLinkText: {
    marginLeft: '5px',
    color:'#fff',
  },
  navLinkHover: {
    textDecoration: 'underline',
  },

  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'55px',
    marginLeft:'700px',
  },

  profileItem: {
    marginBottom: '10px',
    alignItems: 'center', 
  },

  profileLabel: {
    width: '100px',
    display: 'inline-block',
    marginRight: '5px',
    marginBottom: '30px',
    color: '#1B4345',
    textSize: '25px',
    fontWeight: 'bold',
  },

  profileText: {
    width:'300px',
    display: 'inline-block',
    paddingBottom: '6px',
    borderBottom: '3px solid black',
    color: '#1B4345',
    textSize:'25px',
    fontWeight: 'bold',
  },

  profileButtonContainer: {
    alignItems: 'center',
    marginTop:'40px',
  },

  profileButtonEdit: {
    width: '100px',
    height:'35px',
    color: '#ffffff',
    backgroundColor: '#1B4345',
    marginLeft: '100px',
    border: 'none',
    fontSize:'17px',
  },
  
  profileButtonQuit: {
    width: '100px',
    height:'35px',
    color: '#fff',
    backgroundColor:'#D00303',
    marginLeft: '50px',
    border: 'none',
    fontSize:'17px',
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
    width: '300px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: "8px",
    padding: '10px',
  },

  locateontainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',  // 아이콘과 텍스트 사이의 간격 조정
  },
  icon: {
    width: '22px',
    height: '22px',
  },
  text: {
    marginRight: 'auto',  // 텍스트를 왼쪽으로 정렬
  },

};
