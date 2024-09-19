import React from "react";
import "normalize.css";
import styled from "styled-components";
import { Layout } from "./components/Layout/Layout";
import { Ticker } from "./components/Ticker/Ticker";
import { socket } from "./socket";
import { TickerData } from "./types/TickerData";
import { ChangeInterval } from "./components/ChangeInterval/ChangeInterval";
import { AddTicker } from "./components/AddTicker/AddTicker";

function App() {
  const [tickers, setTickers] = React.useState<TickerData[]>([]);
  const [initialTickers, setInitialTickers] = React.useState<TickerData[]>([]);

  React.useEffect(() => {
    socket.on("ticker", ({ updatedTickers, tickers }) => {
      setTickers(updatedTickers);
      setInitialTickers(tickers);
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <StyledTitle>Price tickers in realtime</StyledTitle>
        <StyledActionsWrapper>
          <ChangeInterval />
          <AddTicker initialTickers={initialTickers} />
        </StyledActionsWrapper>

        {tickers.map((tickerData) => (
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
  margin-bottom: 40px;
`;

const StyledActionsWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export default App;
