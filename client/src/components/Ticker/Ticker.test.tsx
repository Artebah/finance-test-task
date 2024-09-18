import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Ticker } from "./Ticker";

describe("<Layout />", () => {
  test("it should mount", () => {
    //render(<Ticker />);

    const TickerElement = screen.getByTestId("Ticker");

    expect(TickerElement).toBeInTheDocument();
  });
});
