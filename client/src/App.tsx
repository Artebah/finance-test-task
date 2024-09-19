import React from "react";
import "./socket";
import "normalize.css";
import styled from "styled-components";
import { fakeData } from "./mock/fakeData";
import { Layout } from "./components/Layout/Layout";
import { Ticker } from "./components/Ticker/Ticker";

function App() {
  return (
    <div className="App">
      <Layout>
        <StyledTitle>Price tickers in realtime</StyledTitle>

        {fakeData.map((tickerData) => (
          <Ticker key={tickerData.name} tickerData={tickerData} />
        ))}
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
