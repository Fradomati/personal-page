import React from "react";
import { PageContainer } from "./style";

export const Layout = ({ children }) => {
  console.log("hola");
  return <PageContainer>{children}</PageContainer>;
};
