import React from "react";
import { NavContainer, UlNavBar, LiNavBar } from "./style";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <NavContainer>
      <UlNavBar>
        <LiNavBar>
          <Link to="/profile">Perfil</Link>
        </LiNavBar>
        <LiNavBar>Example 2</LiNavBar>
        <LiNavBar>
          <Link to="/coords">Mapa</Link>
        </LiNavBar>
      </UlNavBar>
    </NavContainer>
  );
};
