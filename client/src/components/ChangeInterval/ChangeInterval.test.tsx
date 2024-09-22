import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeInterval } from "./ChangeInterval";
import "setimmediate";
import { socket } from "../../socket";

jest.mock("../../socket", () => ({
  socket: {
    emit: jest.fn(),
  },
}));

describe("ChangeInterval component", () => {
  test("sibmits form with valid interval", () => {
    render(<ChangeInterval />);

    const inputIntervalEl = screen.getByLabelText("Set tickers interval");
    const formIntervalEl = screen.getByTestId("interval-form");

    fireEvent.change(inputIntervalEl, { target: { value: 3000 } });

    fireEvent.submit(formIntervalEl);

    expect(socket.emit).toBeCalledWith("changeInterval", "3000");
  });

  test("submits form with small interval and confirms", () => {
    window.confirm = jest.fn().mockReturnValue(true);

    render(<ChangeInterval />);

    const inputIntervalEl = screen.getByLabelText("Set tickers interval");
    const formIntervalEl = screen.getByTestId("interval-form");

    fireEvent.change(inputIntervalEl, { target: { value: "500" } });
    fireEvent.submit(formIntervalEl);

    expect(window.confirm).toHaveBeenCalledWith(
      "An interval of less than 1 second can impact processor productivity"
    );
    expect(socket.emit).toHaveBeenCalledWith("changeInterval", "500");
  });
});
