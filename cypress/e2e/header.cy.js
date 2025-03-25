describe("Header", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");
  });
  it("has a logo image", () => {
    cy.get("[data-cy=logo] > picture").should("exist");
    cy.get("[data-cy=logo] > picture > img")
      .invoke("attr", "alt")
      .should("have.length.gt", 0);
    cy.get("[data-cy=logo]").invoke("attr", "href").should("have.length.gt", 0);
  });
  it("has navigation links", () => {
    cy.get("[data-cy=header] nav > ul").should("exist");
    cy.get("[data-cy=header] nav > ul").children().should("have.length.gt", 0);
  });
  it("has a toggle for language", () => {
    cy.get("[data-cy=localeToggle]").should("exist");
    cy.get("[data-cy=localeToggle] button").filter(":visible").click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("es");
    });
  });
  it("yields results when searching", () => {
    cy.get("[data-cy=searchBar] button[aria-expanded=false]")
      .filter(":visible")
      .click();
    cy.get("[data-cy=searchBar] [role=search]")
      .filter(":visible")
      .should("be.visible")
      .type("rubin{enter}");
    cy.intercept("http://localhost:3000/search?search=rubin").as("search");
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("?search=rubin");
    });
    cy.get("ul li").its("length").should("be.gte", 1);
  });
});
