import React from "react";
import "normalize.css";
import styled from "styled-components";
import { Layout } from "./components/Layout/Layout";
import { Ticker } from "./components/Ticker/Ticker";
import { socket } from "./socket";
import { TickerData } from "./types/TickerData";

function App() {
  const [tickers, setTickers] = React.useState<TickerData[]>([]);

  React.useEffect(() => {
    socket.on("ticker", (newTickers) => {
      console.log(newTickers);
      setTickers(newTickers);
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <StyledTitle>Price tickers in realtime</StyledTitle>

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
  margin-bottom: 20px;
`;

export default App;
