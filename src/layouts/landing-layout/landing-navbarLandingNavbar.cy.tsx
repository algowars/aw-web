import React from "react";
import LandingNavbar from "./landing-navbar";

describe("<LandingNavbar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LandingNavbar />);
  });
});
