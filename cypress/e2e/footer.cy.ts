/* eslint-disable no-unused-expressions */

describe("Footer", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("/");
  });
  it("has a footer following the main content", () => {
    cy.get("footer").should((element) => {
      const previous = element.prev();
      expect(element).to.exist;
      expect(previous.prop("tagName").toLowerCase()).to.be.eq("main");
    });
  });
  it("has a list of links to social media", () => {
    cy.get("footer [data-cy=socials]").should((element) => {
      expect(element).to.exist;
      expect(element.children().length).to.be.gt(0);
    });
  });
  it("has a navigation list of links", () => {
    cy.get("footer nav ul").should((element) => {
      expect(element).to.exist;
      expect(element.children().length).to.be.gt(0);
    });
  });
  it("has a contact form", () => {
    cy.get("footer form").should("exist");
  });
  it("has a block of funding language", () => {
    cy.get("footer [data-cy=colophon]").should((element) => {
      expect(element).to.exist;
      expect(element.text().length).to.be.gt(0);
    });
  });
});
