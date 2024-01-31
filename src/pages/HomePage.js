import React from "react";
import GreenButton from "../components/Buttons/GreenButton";
import RedButton from "../components/Buttons/RedButton";
// import NavSearch from "../components/SearchBars/NavSearch";
import styled from "styled-components";

const HomePage = () => {
  return (
    <>
      <Div>
        {/* <NavSearch /> */}
        <RedButton />
        <GreenButton />
      </Div>
    </>
  );
};

export default HomePage;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
