export const reviewStyles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'transparent',
  },
  reviewContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '20px',
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: 'transparent',
  },
  photoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  photo: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
  },
  details: {
    marginTop: '10px',
    marginLeft: '7px',
  },
  tagsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:'7px',
    marginBottom: '5px',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tag: {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#EC5630',
    fontSize: '15px',
  },
  placeName: {
    marginTop: '8px',
    marginLeft: '10px',
    marginBottom: '5px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1B4345',
  },
  writeButton: {
    width: '70px',
    height: '70px',
    position: 'fixed',
    bottom: '50px',
    right: '90px',
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: '#1B4345',
    padding: '5px',
  },
};