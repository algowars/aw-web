describe("Accounts", () => {
  beforeEach(function () {
    cy.intercept("GET", "/api/v1/account/find/profile").as("getProfile");
    cy.intercept("POST", "/api/v1/account").as("createAccount");
    cy.intercept("POST", "/api/trpc/user.syncFromLogin*").as("syncFromLogin");
    cy.intercept("POST", "/api/trpc/user.getBySub*").as("getBySub");

    cy.visit("/");
  });

  // it("Creating an account", () => {
  //   cy.get("[data-cy=signup-btn]").click();

  //   cy.generateRandomEmail().then((email) => {
  //     cy.generateRandomPassword().then((password) => {
  //       cy.signupViaAuth0Ui(email, password);
  //     });
  //   });

  //   cy.wait("@getProfile").its("response.statusCode").should("eq", 404);
  //   cy.url().should("include", "/account/setup");

  //   cy.generateRandomUsername().then((username) => {
  //     cy.get("[data-cy=username-input]").type(username);
  //     cy.get("[data-cy=complete-setup-btn]").click();
  //   });

  //   cy.wait("@createAccount").its("response.statusCode").should("eq", 200);
  //   cy.url().should("include", "/");
  // });

  it("Creating an account", () => {
    cy.get("[data-cy=signup-btn]").click();

    cy.generateRandomEmail().then((email) => {
      cy.generateRandomPassword().then((password) => {
        cy.signupViaAuth0Ui(email, password);
      });
    });

    cy.url().should("include", "/account/setup");
  });
});
