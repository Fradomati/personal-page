import React from "react";
import { PageContainer, MainContainer } from "./style";
import { NavBar } from "../navbar/index";

export const Layout = ({ children }) => {
  return (
    <MainContainer>
      <PageContainer>
        {children}
        <NavBar />
      </PageContainer>
    </MainContainer>
  );
};
