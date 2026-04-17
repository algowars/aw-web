import React from "react";
import { ModeToggle } from "./mode-toggle";

describe("<ModeToggle />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ModeToggle />);
  });
});
