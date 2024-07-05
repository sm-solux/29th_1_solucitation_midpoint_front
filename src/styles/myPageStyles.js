export const myPageStyles = {
  container: {
    maxWidth: '800px',
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
    color:'#000',
    margin: '0 55px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center', 

  },
  navLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
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
    marginLeft:'500px',
  },

  profileItem: {
    marginBottom: '10px',
    alignItems: 'center', 
  },

  profileLabel: {
    width: '100px',
    fontWeight: 'bold',
    marginRight: '5px',
    marginBottom:'30px',
    display: 'inline-block',
    color: '#1B4345',
  },

  profileText: {
    color: '#1B4345',
    fontWeight: 'bold',
  },
  profileButtonContainer: {
    alignItems: 'center',
    marginTop:'40px',
  },

  profileButtonEdit: {
    width:'75px',
    color: '#ffffff',
    backgroundColor: '#1B4345',
    marginLeft: '100px',
    border:'none',
  },
  
  profileButtonQuit: {
    width:'75px',
    color: '#fff',
    backgroundColor:'#D00303',
    marginLeft: '50px',
    border:'none',
  },

};
