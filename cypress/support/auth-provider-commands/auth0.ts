function loginViaAuth0Ui(
  email: string,
  password: string,
  emailInputName = "email",
) {
  cy.origin(
    Cypress.expose("auth0_domain"),
    { args: { email, password, emailInputName } },
    ({ email, password, emailInputName }) => {
      cy.get(`input#${emailInputName}`).type(email);
      cy.get("input#password").type(password, { log: false });
      cy.contains("button[value=default]", "Continue").click();
    },
  );
}

Cypress.Commands.add("loginViaAuth0Ui", (email: string, password: string) => {
  loginViaAuth0Ui(email, password, "username"); // auth0 changes this to username on login
});

Cypress.Commands.add("signupViaAuth0Ui", (email: string, password: string) => {
  loginViaAuth0Ui(email, password);
});

Cypress.Commands.add("loginToAuth0", (email: string, password: string) => {
  const log = Cypress.log({
    displayName: "AUTH0 LOGIN",
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  });
  log.snapshot("before");

  loginViaAuth0Ui(email, password);

  log.snapshot("after");
  log.end();
});
