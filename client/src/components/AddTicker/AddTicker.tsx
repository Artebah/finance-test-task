import React, { FC } from "react";
import { TickerData } from "../../types/TickerData";
import styled from "styled-components";
import { socket } from "../../socket";

interface AddTickerProps {
  initialTickers: TickerData[];
}

const AddTicker: FC<AddTickerProps> = ({ initialTickers }) => {
  const removedTickers = initialTickers.filter((ticker) => ticker.removed);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tickerName = e.target.value;

    socket.emit("addTicker", tickerName);
  };

  const defaultSelectValue = removedTickers.length ? "Choose ticker" : "No tikers available";

  console.log(defaultSelectValue);

  return (
    <div>
      <StyledH2>Add removed tickers</StyledH2>
      <StyledSelect onChange={onChange} defaultValue={defaultSelectValue} name="add-ticker" id="add-ticker">
        {removedTickers.length ? (
          <>
            <option>Choose ticker</option>

            {removedTickers.map((ticker) => (
              <option key={ticker.name} value={ticker.name}>
                {ticker.name}
              </option>
            ))}
          </>
        ) : (
          <option>All tickers are added</option>
        )}
      </StyledSelect>
    </div>
  );
};

const StyledH2 = styled.h2`
  line-height: 1;
  margin: 0 0 20px;
`;

const StyledSelect = styled.select`
  width: 100%;
  border-radius: 10px;
  padding: 5px 10px;
`;

export { AddTicker };
