import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChangeInterval } from "./ChangeInterval";

describe("<Layout />", () => {
  test("it should mount", () => {
    //render(<ChangeInterval />);

    const ChangeIntervalElement = screen.getByTestId("ChangeInterval");

    expect(ChangeIntervalElement).toBeInTheDocument();
  });
});
