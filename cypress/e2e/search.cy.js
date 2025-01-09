describe("Search page", () => {
  before(() => {
    cy.visit("/search");
  });
  it("Searching from filter input yields results", () => {
    cy.get("[data-cy=clear]").should("have.attr", "disabled");
    cy.get("input[type=search]").type("press release{enter}");

    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("?search=press+release");
      cy.get("ul li").its("length").should("be.gte", 1);
      cy.get("[data-cy=clear]").click();

      cy.on("url:changed", (newUrl) => {
        cy.get("input[type=search]").should("have.value", "");
        cy.get("[data-cy=clear]").should("have.attr", "disabled");
        expect(newUrl).to.not.contain("?search");
      });
    });
  });
});
