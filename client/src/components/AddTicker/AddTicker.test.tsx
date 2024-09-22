import { render, screen, fireEvent } from "@testing-library/react";
import { AddTicker } from "./AddTicker";
import { socket } from "../../socket";

jest.mock("../../socket", () => ({
  socket: {
    emit: jest.fn(),
  },
}));

describe("AddTicker Component", () => {
  test("renders title and default select value when no tickers are available", () => {
    render(<AddTicker initialTickers={[]} />);

    expect(screen.getByText(/Add removed tickers/i)).toBeInTheDocument();

    expect(screen.getByText(/All tickers are added/i)).toBeInTheDocument();
  });

  test("renders removed tickers in the select list", () => {
    const initialTickers = [
      {
        name: "AAPL",
        active: true,
        removed: true,
        exchange: "NASDAQ",
        price: 237.08,
        change: 154.38,
        change_percent: 0.1,
        dividend: 0.46,
        yield: 1.18,
        last_trade_time: "2021-04-30T11:53:21.000Z",
      },
      {
        name: "GOOGL",
        active: true,
        removed: true,
        exchange: "NASDAQ",
        price: 261.46,
        change: 161.45,
        change_percent: 0.41,
        dividend: 0.18,
        yield: 0.98,
        last_trade_time: "2021-04-30T11:53:21.000Z",
      },
    ];

    render(<AddTicker initialTickers={initialTickers} />);

    expect(screen.getByText(/Choose ticker/i)).toBeInTheDocument();

    expect(screen.getByText(/AAPL/i)).toBeInTheDocument();
    expect(screen.getByText(/GOOGL/i)).toBeInTheDocument();
  });

  test("emits socket event when a ticker is selected", () => {
    const initialTickers = [
      {
        name: "AAPL",
        removed: true,
        active: true,
        exchange: "NASDAQ",
        price: 237.08,
        change: 154.38,
        change_percent: 0.1,
        dividend: 0.46,
        yield: 1.18,
        last_trade_time: "2021-04-30T11:53:21.000Z",
      },
    ];

    render(<AddTicker initialTickers={initialTickers} />);

    // getByLabelText returns element in htmlFor
    const selectElement = screen.getByLabelText(/Add removed tickers/i);

    // select element
    console.log(selectElement.outerHTML);

    // fireEvent.change simulates a change event
    fireEvent.change(selectElement, { target: { value: "AAPL" } });

    expect(socket.emit).toHaveBeenCalledWith("addTicker", "AAPL");
  });

  test("disables select element when no removed tickers are available", () => {
    render(<AddTicker initialTickers={[]} />);

    const selectElement = screen.getByLabelText(/Add removed tickers/i);

    expect(selectElement).toBeDisabled();
  });
});
