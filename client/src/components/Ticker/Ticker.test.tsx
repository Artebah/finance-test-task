import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Ticker } from "./Ticker";
import "setimmediate";

import { socket } from "../../socket"; // Adjust the import path as necessary

jest.mock("../../socket"); // Mock the socket module

describe("<Ticker />", () => {
  const tickerData = {
    name: "AMZN",
    active: false,
    removed: false,
    exchange: "NASDAQ",
    price: 260.34,
    change: 128.71,
    change_percent: 0.6,
    dividend: 0.07,
    yield: 0.42,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  };

  beforeEach(() => {
    socket.emit = jest.fn();
  });

  test("renders correctly with given props", () => {
    render(<Ticker tickerData={tickerData} />);

    expect(screen.getByText(tickerData.name)).toBeInTheDocument();
    expect(screen.getByText(tickerData.exchange)).toBeInTheDocument();
    expect(screen.getByText(`${tickerData.price}$`)).toBeInTheDocument();
    expect(screen.getByText(/\+/)).toBeInTheDocument();
  });

  test("onSwitch toggles isActive state", () => {
    render(<Ticker tickerData={tickerData} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(socket.emit).toHaveBeenCalledWith("switchTickerActivity", { name: tickerData.name, active: true });
  });

  test("onRemove emits removeTicker event", () => {
    render(<Ticker tickerData={tickerData} />);

    const removeBtnEl = screen.getByTestId("remove-button");

    fireEvent.click(removeBtnEl);

    expect(socket.emit).toHaveBeenCalledWith("removeTicker", tickerData.name);
  });
});
