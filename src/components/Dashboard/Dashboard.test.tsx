import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("../RocketLaunchDashboard/RocketLaunchDashboard", () => () => <></>);

test("renders Dashboard", () => {
  const { container } = render(<Dashboard />);
  const heading = container.getElementsByTagName("h1")[0];
  expect(heading.textContent).toEqual("Welcome to Moonshot Calendar Inc.");
});
