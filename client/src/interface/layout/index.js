import React from "react";
import { PageContainer, MainContainer } from "./style";

export const Layout = ({ children }) => {
  return (
    <MainContainer>
      <PageContainer>{children}</PageContainer>;
    </MainContainer>
  );
};
