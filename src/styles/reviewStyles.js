// reviewStyles.js
export const reviewStyles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "transparent",
    border:'none'
  },
  photoContainer: {
    width: "150",
    height: "150",
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
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },
  tag: {
    padding: "5px 10px",
    color:'white',
    backgroundColor: "#EC5640",
    fontSize: "14px",
  },
  placeName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};
