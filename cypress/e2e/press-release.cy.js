describe("Press release", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/news/rubin-reveal-stellar-streams");
  });

  it("Has page metadata", () => {
    cy.document()
      .get('head meta[name="description"]')
      .should("have.attr", "content");
  });
  it("Has a banner image", () => {
    cy.get("[data-cy=hero] > img")
      .invoke("attr", "alt")
      .should("have.length.gt", 0);
    cy.get("[data-cy=hero] > img")
      .invoke("attr", "src")
      .should("have.length.gt", 0);
  });
  it("Has a headline", () => {
    cy.get("h1").invoke("text").should("have.length.gt", 0);
  });
  it("Has a release date", () => {
    cy.get("time").invoke("text").should("have.length.gt", 0);
    cy.get("time").should("have.attr", "datetime");
  });
  it("Has some text content", () => {
    cy.get("[data-cy=press-release-text]")
      .invoke("text")
      .should("have.length.gt", 0);
  });
  it("Has additional information", () => {
    cy.contains("h3", "More Information")
      .siblings()
      .should("have.class", "c-content-rte");
  });
  it("Has links", () => {
    cy.contains("h3", "Links").siblings().contains("ul");
  });
  it("Has contacts", () => {
    cy.contains("h3", "Contacts").siblings().contains("li");
  });
});
