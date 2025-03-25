describe("Homepage", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");
  });
  it("has a hero image with priority loading", () => {
    cy.get("[data-cy=hero] > img")
      .invoke("attr", "src")
      .should("have.length.gt", 0);
    cy.get("[data-cy=hero] > img").should("have.attr", "fetchpriority", "high");
  });
});
