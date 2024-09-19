import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddTicker } from "./AddTicker";

describe("<Layout />", () => {
  test("it should mount", () => {
    //render(<AddTicker />);

    const AddTickerElement = screen.getByTestId("AddTicker");

    expect(AddTickerElement).toBeInTheDocument();
  });
});
