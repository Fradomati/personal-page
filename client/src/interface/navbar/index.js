import React from "react";
import { NavContainer, UlNavBar, LiNavBar } from "./style";

export const NavBar = () => {
  return (
    <NavContainer>
      <UlNavBar>
        <LiNavBar>Example 1</LiNavBar>
        <LiNavBar>Example 2</LiNavBar>
        <LiNavBar>Example 3</LiNavBar>
      </UlNavBar>
    </NavContainer>
  );
};
