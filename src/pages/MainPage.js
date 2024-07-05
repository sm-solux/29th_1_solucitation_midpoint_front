import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";
import { commonStyles } from "../styles/styles";

const Intro = styled.h1`
  font-family: "AkiraExpanded";
  font-size: 10rem;
  font-weight: 900;
  color: #1b4345;
  margin-top: 17%;
  margin-bottom: 0.5rem;
`;

const SubIntro = styled.h5`
  font-family: "AkiraExpanded";
  font-size: 4rem;
  font-weight: 400;
  color: #1b4345;
  margin-top: 0rem;
`;

const MainPage = () => {
  return (
    <div>
      <div style={commonStyles.centerContainer}>
        <Intro>MIDPOINT</Intro>
        <SubIntro>WHERE TO MEET</SubIntro>
      </div>
    </div>
  );
};

export default MainPage;
