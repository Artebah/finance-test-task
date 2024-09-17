import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TemplateName } from "./TemplateName";

describe("<Layout />", () => {
  test("it should mount", () => {
    render(<TemplateName />);

    const TemplateNameElement = screen.getByTestId("TemplateName");

    expect(TemplateNameElement).toBeInTheDocument();
  });
});
