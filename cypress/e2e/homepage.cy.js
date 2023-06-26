describe("Search from Homepage", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");
  });

  it("Searching yields results", () => {
    cy.get(".c-search-bar__toggle").click();
    cy.get("#headerSearchBar").should("be.visible").type("rubin{enter}");
    cy.intercept("http://localhost:3000/search?search=rubin").as("search");
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("?search=rubin");
    });
    cy.get("ul li").its("length").should("be.gte", 1);
  });
});
