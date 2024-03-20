describe("Gallery", () => {
  it(`Slideshows Landing has no detectable a11y violations on load`, () => {
    cy.visit("/gallery/slideshows");
    cy.injectAxe();
    cy.contains("Loading the Rubin Slideshows...").should("not.exist");
    cy.checkAxe();
  });

  it(`Slideshow has no detectable a11y violations on load`, () => {
    cy.visit("/gallery/slideshows");
    cy.injectAxe();
    cy.contains("Loading the Rubin Slideshows...").should("not.exist");
    cy.get("a.slideshows")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.checkAxe();
      });
  });
});
