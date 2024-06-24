import React from "react";
import { commonStyles } from "../styles/styles"; 

const Logo = () => {
  return (
    <div style={{ marginTop: "15px" }}>
      <img src="/img/logo.png" style={commonStyles.logo_img} alt="Logo" />
      <h1 style={commonStyles.logo}>MIDPOINT</h1>
    </div>
  );
};

export { Logo };
