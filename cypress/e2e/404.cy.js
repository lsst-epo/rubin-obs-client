describe("404", () => {
  it("Page not Found", () => {
    cy.visit("./totally-bogus-page-url", { failOnStatusCode: false });
    cy.get("h1").should("be.visible").contains("Page not found");
  });
});
