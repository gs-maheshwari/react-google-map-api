import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const root = screen.getByTestId("rootContainer");
  expect(root.childNodes.length).toBeGreaterThan(0);
});
