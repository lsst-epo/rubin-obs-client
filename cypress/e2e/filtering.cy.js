describe("Filtering dynamic data", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/news");
  });

  it("Should show all filtered items", () => {
    cy.get("button").contains("Filter").click();
    cy.get("a").contains("a", "All").click();

    cy.on("url:changed", (newUrl) => {
      const url = new URL(newUrl);
      const params = new URLSearchParams(url.search);
      expect(params.get("filter")).to.contain("");
    });
  });
  it("Should show selected filter", () => {
    const filter = "Press Release";

    cy.get("button").contains("Filter").click();
    cy.get("a").contains(filter).click();

    cy.on("url:changed", (newUrl) => {
      const url = new URL(newUrl);
      const params = new URLSearchParams(url.search);

      cy.get(".pretitle").should("have.text", filter);
      expect(params.get("filter")).to.contain("85");
    });
  });
  it("Should change sort order", () => {
    const dropdownId = "sort-dropdown";
    const sort = "Ascending";

    cy.get("button").contains("Sort").click();
    cy.get("a").contains(sort).click();

    cy.on("url:changed", (newUrl) => {
      const url = new URL(newUrl);
      const params = new URLSearchParams(url.search);

      expect(params.get("sort")).to.contain(sort.toLowerCase());
    });
  });
});
