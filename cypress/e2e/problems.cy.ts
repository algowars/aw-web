describe("Problems", () => {
  beforeEach(function () {
    cy.intercept("POST", "/api/trpc/problem.getProblemsPageable*").as(
      "getProblemsPageable",
    );
    cy.visit("/problems");
  });

  it("navigates to a problem and loads its details", () => {
    cy.get("[data-cy=problem-item]").should("have.length.greaterThan", 0);
    cy.get("[data-cy=problem-item]").first().click();

    cy.url().should("match", /\/problems\/.+/);
    cy.get("[data-cy=problem-title]").should("be.visible").and("not.be.empty");
    cy.get("[data-cy=problem-question]").should("be.visible");
  });
});
