import React, { FC } from "react";
import styled from "styled-components";
import { TickerData } from "../../types/TickerData";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { getDateString } from "../../helpers/getDateString";
import { ChangeValue } from "../../types/ChangeValue";
import { getTickerChangeValue } from "../../helpers/getTickerChangeValue";
import { socket } from "../../socket";
import { ReactComponent as RemoveIcon } from "../../assets/icons/remove.svg";

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
    name,
    active,
    exchange,
    price,
    change,
    change_percent,
    dividend,
    yield: yieldNum,
    last_trade_time,
  } = tickerData;

  const [isActive, setIsActive] = React.useState(active);

  const $changeValue = getTickerChangeValue(change);

  const onSwitch = () => {
    setIsActive(!isActive);
  };

  const onRemove = () => {
    socket.emit("removeTicker", name);
  };

  React.useEffect(() => {
    socket.emit("switchTickerActivity", { name, active: isActive });
  }, [isActive, name]);

  return (
    <StyledWrapper $isActive={isActive}>
      <StyledCheckbox
        onChange={onSwitch}
        defaultChecked
        type="checkbox"
        name="switch-ticker"
        id="switch-ticker"
      />
      <StyledTicker>{name}</StyledTicker>
      <StyledExchange>{exchange}</StyledExchange>
      <StyledP>{price}$</StyledP>
      <StyledChange $changeValue={$changeValue}>
        {$changeValue === "increase" && "+"}
        {change}
      </StyledChange>
      <StyledChange $isPercent $changeValue={$changeValue}>
        {$changeValue !== "none" && <ArrowDown />}
        {change_percent} %
      </StyledChange>
      <StyledP>{getDateString(last_trade_time)}</StyledP>
      <StyledRemoveButton onClick={onRemove}>
        <RemoveIcon />
      </StyledRemoveButton>
    </StyledWrapper>
  );
};

const StyledP = styled.p`
  font-weight: 500;
`;

const StyledWrapper = styled.div<{ $isActive?: boolean }>`
  padding: 10px 15px;
  font-size: 14px;
  display: grid;
  align-items: center;
  grid-template-columns: 30px 47px 180px repeat(5, 1fr);
  text-align: right;
  gap: 10px;
  border-top: 1px solid #e8eaed;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};

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

const StyledChange = styled.span<{ $changeValue: ChangeValue; $isPercent?: boolean }>`
  color: ${({ $changeValue }) => changePriceStyles[$changeValue].color};
  background: ${({ $changeValue, $isPercent }) =>
    $isPercent ? changePriceStyles[$changeValue].background : ""};
  justify-self: right;
  padding: 5px 7px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  svg {
    fill: ${({ $changeValue }) => changePriceStyles[$changeValue].color};
    transform: ${({ $changeValue }) => changePriceStyles[$changeValue].transform};
  }
`;

const StyledCheckbox = styled.input`
  transform: scale(1.4);
`;

const StyledRemoveButton = styled.button`
  background: none;
  border: 0;
  width: 40px;
  height: 50px;
  justify-self: end;
  cursor: pointer;

  svg {
    transition: all 0.3s ease 0s;
  }

  &:hover {
    svg {
      transform: scale(1.06);
    }
  }
`;

export { Ticker };
