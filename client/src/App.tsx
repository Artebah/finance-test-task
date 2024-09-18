import React from "react";
import "./socket";
import "normalize.css";
import { Layout } from "./components/Layout/Layout";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Layout>
        <StyledTitle>Price tickers in realtime</StyledTitle>
      </Layout>
    </div>
  );
}

const StyledTitle = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export default App;
