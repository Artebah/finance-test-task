import React, { FC } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto 0;
  padding: 0 14px;
`;

export { Layout };
