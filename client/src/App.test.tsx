import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import App from "./App";
import { socket } from "./socket";
import { TickerData } from "./types/TickerData";

jest.mock("./socket", () => ({
  socket: {
    on: jest.fn(),
    emit: jest.fn(),
  },
}));

describe("App component", () => {
  const mockTickers: TickerData[] = [
    {
      name: "AAPL",
      active: true,
      removed: false,
      exchange: "NASDAQ",
      price: 150,
      change: 1.5,
      change_percent: 1.0,
      dividend: 0.2,
      yield: 0.5,
      last_trade_time: "2023-09-17T14:48:00.000Z",
    },
    {
      name: "GOOGL",
      active: true,
      removed: false,
      exchange: "NASDAQ",
      price: 2800,
      change: -10,
      change_percent: -0.35,
      dividend: 0.0,
      yield: 0.0,
      last_trade_time: "2023-09-17T14:48:00.000Z",
    },
  ];

  const mockInitialTickers: TickerData[] = [
    {
      name: "AAPL",
      active: true,
      removed: true,
      exchange: "NASDAQ",
      price: 150,
      change: 1.5,
      change_percent: 1.0,
      dividend: 0.2,
      yield: 0.5,
      last_trade_time: "2023-09-17T14:48:00.000Z",
    },
    {
      name: "GOOGL",
      active: true,
      removed: true,
      exchange: "NASDAQ",
      price: 2800,
      change: -10,
      change_percent: -0.35,
      dividend: 0.0,
      yield: 0.0,
      last_trade_time: "2023-09-17T14:48:00.000Z",
    },
  ];

  beforeEach(() => {
    (socket.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "ticker") {
        act(() => {
          callback({ updatedTickers: mockTickers, tickers: mockInitialTickers });
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders App and child elements", () => {
    render(<App />);

    expect(screen.getByText(/Price tickers in realtime/i)).toBeInTheDocument();

    expect(screen.getByRole("option", { name: /AAPL/i })).toBeInTheDocument();

    expect(screen.getByRole("option", { name: /GOOGL/i })).toBeInTheDocument();
  });

  test("renders tickers received from the socket event", async () => {
    render(<App />);

    expect(socket.on).toHaveBeenCalledWith("ticker", expect.any(Function));

    const tickerCallback = (socket.on as jest.Mock).mock.calls[0][1];
    act(() => {
      tickerCallback({ updatedTickers: mockTickers, tickers: mockTickers });
    });

    await waitFor(() => {
      expect(screen.getByText(/AAPL/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/GOOGL/i)).toBeInTheDocument();
    });
  });
});
