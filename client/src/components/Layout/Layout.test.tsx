import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Layout } from "./Layout";

describe("<Layout />", () => {
  test("it should mount", () => {
    render(<Layout> </Layout>);

    const LayoutElement = screen.getByTestId("Layout");

    expect(LayoutElement).toBeInTheDocument();
  });
});
