import React, { FC } from "react";
import styled from "styled-components";
import { TickerData } from "../../types/TickerData";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { getDateString } from "../../helpers/getDateString";
import { ChangeValue } from "../../types/ChangeValue";
import { getTickerChangeValue } from "../../helpers/getTickerChangeValue";

interface TickerProps {
  tickerData: TickerData;
}

const changePriceStyles = {
  increase: {
    color: "rgb(19, 115, 51);",
    background: "rgb(230, 244, 234);",
    transform: "rotate(180deg)",
  },
  decrease: {
    color: "rgb(165, 14, 14);",
    background: "rgb(252, 232, 230);",
    transform: "rotate(0deg)",
  },
  none: {
    color: "#3c4043;",
    background: "#e8eaed;",
    transform: "rotate(0deg)",
  },
};

const Ticker: FC<TickerProps> = ({ tickerData }) => {
  const {
    ticker,
    exchange,
    price,
    change,
    change_percent,
    dividend,
    yield: yieldNum,
    last_trade_time,
  } = tickerData;

  const changeValue = getTickerChangeValue(change);

  return (
    <StyledWrapper>
      <StyledTicker>{ticker}</StyledTicker>
      <StyledExchange>{exchange}</StyledExchange>
      <StyledP>{price}$</StyledP>
      <StyledChange changeValue={changeValue}>
        {changeValue === "increase" && "+"}
        {change}
      </StyledChange>
      <StyledChange isPercent changeValue={changeValue}>
        {changeValue !== "none" && <ArrowDown />}
        {change_percent} %
      </StyledChange>
      <StyledP>{getDateString(last_trade_time)}</StyledP>
    </StyledWrapper>
  );
};

const StyledP = styled.p`
  font-weight: 500;
`;

const StyledWrapper = styled.div`
  padding: 10px 0;
  font-size: 14px;
  display: grid;
  align-items: center;
  grid-template-columns: 47px 180px repeat(3, 160px) auto;
  text-align: right;
  gap: 10px;
  border-top: 1px solid #e8eaed;

  &:last-child {
    border-bottom: 1px solid #e8eaed;
  }
`;

const StyledTicker = styled.span`
  font-size: 12px;
  text-align: center;
  line-height: 1;
  border: 2px solid #333;
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;

const StyledExchange = styled.span`
  font-weight: 500;
  text-align: left;
`;

const StyledChange = styled.span<{ changeValue: ChangeValue; isPercent?: boolean }>`
  color: ${({ changeValue }) => changePriceStyles[changeValue].color};
  background: ${({ changeValue, isPercent }) => (isPercent ? changePriceStyles[changeValue].background : "")};
  justify-self: right;
  padding: 5px 7px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  svg {
    fill: ${({ changeValue }) => changePriceStyles[changeValue].color};
    transform: ${({ changeValue }) => changePriceStyles[changeValue].transform};
  }
`;

export { Ticker };
