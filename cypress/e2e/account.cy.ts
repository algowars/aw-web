describe("Accounts", () => {
  beforeEach(function () {
    cy.intercept("POST", "/api/trpc/user.syncFromLogin*").as("syncFromLogin");
    cy.intercept("POST", "/api/trpc/user.getBySub*").as("getBySub");

    cy.visit("/");
  });

  it("creates an account, logs out, and logs back in", () => {
    cy.get("[data-cy=signup-btn]").click();

    cy.generateRandomEmail().then((email) => {
      cy.generateRandomPassword().then((password) => {
        cy.signupViaAuth0Ui(email, password);

        cy.wait("@syncFromLogin").its("response.statusCode").should("eq", 200);
        cy.url().should("include", "/dashboard");

        cy.get("[data-cy=account-dropdown-trigger]").click();
        cy.get("[data-cy=logout-btn]").click();

        cy.get("[data-cy=login-btn]").click();
        cy.loginViaAuth0Ui(email, password);

        cy.wait("@syncFromLogin").its("response.statusCode").should("eq", 200);
        cy.url().should("include", "/dashboard");
      });
    });
  });
});
