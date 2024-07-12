export const reviewStyles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", //빼니까 구분이 잘 안돼서 구현은 해둠
    backgroundColor: "transparent",
  },
  reviewContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    overflowY: "auto",
    gap: "20px",
    padding: "20px",
    margin: "0 auto", 
    maxWidth: "1200px",
    backgroundColor: "transparent",
  },

  photoContainer: {
    width: "50",
    height: "50",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 10px"
  },
  photo: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
  details: {
    marginTop: "10px",
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    padding: "5px 10px",
    color:'white',
    backgroundColor: "#EC5640",
    fontSize: "14px",
  },
  likeButtonActive: {
    color: '#1B4345',
    fontSize: '23px',
    border: 'none',
  },
  likeButton: {
    color: '#1B4345',
    border: 'none',
    fontSize: '20px',
  },
  like: {
    marginLeft: 'auto',
    fontSize: '1.5em',
    color:'#1B4345',
    cursor: 'pointer',
  },
  placeName: {
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color:'#1B4345',
  },
  content: {
    marginTop: '5px',
    marginBottom: '5px',
    color:'#1B4345',
    fontSize:'14px',
  },
  writeButton: {
    width: '80px',
    height:'80px',
    position: 'fixed',
    bottom: '60px',
    right: '90px',
    cursor: 'pointer',
    borderRadius:'50%',
    backgroundColor: '#1B4345',
    padding:'5px',
  },
};