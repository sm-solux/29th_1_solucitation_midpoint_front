import React from "react";
<<<<<<< HEAD
import styled from "styled-components";
import { Link } from "react-router-dom";
=======
>>>>>>> origin/feature/review
import "../styles/global.css";
import { Logo } from "../components/CommonComponents";

const Intro = styled.h1`
  font-size: 10.2rem;
  font-weight: 800;
  color: #ec5640;
  margin-left: 9rem;
  margin-top: 5.5rem;
`;

const SubIntro = styled.h5`
  font-size: 5rem;
  font-weight: 400;
  color: #ec5640;
  margin-left: 9rem;
  margin-top: -7rem;
`;

const MainPage = () => {
  return (
    <div>
      <div>
        <Logo />
        <Intro>
          우리,
          <br />
          어디서 만나?
        </Intro>
        <SubIntro>WHERE TO MEET</SubIntro>
      </div>
    </div>
  );
};

export default MainPage;
