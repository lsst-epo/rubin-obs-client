describe("Search page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/search");
  });

  it("Searching from filter input yields results", () => {
    cy.get("#filterSearchInput").type("press release{enter}");
    cy.intercept("http://localhost:3000/search?search=press+release").as(
      "search"
    );
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("?search=press+release");
    });
    cy.get("ul li").its("length").should("be.gte", 1);
  });
  it("Clear button resets search", () => {
    cy.get("[data-cy='clear']").click();
    cy.intercept("http://localhost:3000/search?search=press+release").as(
      "search"
    );
    cy.on("url:changed", (newUrl) => {
      cy.get("#filterSearchInput").should("have.value", "");
      expect(newUrl).to.be("http://localhost:3000/search");
    });
  });
});
