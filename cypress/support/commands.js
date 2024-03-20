// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
// Define at the top of the spec file or just import it
function axeLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

Cypress.Commands.add("checkAxe", () => {
  // cy.configureAxe({
  //   checks: [
  //     {
  //       id: "custom-aria-allowed-role",
  //       evaluate: function(node, options, virtualNode, data) {
  //         // eslint-disable-next-line no-console
  //         console.log(node);
  //         node.attr
  //         return true;
  //       },
  //       options: {
  //         allowImplicit: true,
  //         ignoredTags: [],
  //       },
  //       metadata: {
  //         impact: "minor",
  //         messages: {
  //           pass: "ARIA role is allowed for given element",
  //           fail: {
  //             /* eslint-disable no-undef */
  //             singular: `ARIA role ${this.data.values} is not allowed for given element`,
  //             plural: `ARIA roles ${this.data.values} are not allowed for given element`,
  //           },
  //           incomplete: {
  //             singular: `ARIA role ${this.data.values} must be removed when the element is made visible, as it is not allowed for the element`,
  //             plural: `ARIA roles ${this.data.values} must be removed when the element is made visible, as they are not allowed for the element`,
  //             /* eslint-enable no-undef */
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   rules: [
  //     {
  //       id: "aria-allowed-role",
  //       any: ["custom-aria-allowed-role", "aria-allowed-role"],
  //     },
  //   ],
  // });
  cy.checkA11y(null, null, axeLog, true);
});

Cypress.Commands.add("checkUrl", (url) => {
  cy.request({ url, failOnStatusCode: false })
    .its("status")
    .should("equal", 200);
});
