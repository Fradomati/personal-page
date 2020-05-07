import React from "react";
import { HomeContainer, DivHome } from "./styles";
import { NavBar } from "../../interface/navbar/index";

export const Home = () => {
  return (
    <HomeContainer>
      <DivHome>Bienvenido al primer proyecto en solitario!</DivHome>
      <NavBar />
    </HomeContainer>
  );
};
