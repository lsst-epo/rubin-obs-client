describe("Events", () => {
  it(`Future Events landing has no detectable a11y violations on load`, () => {
    cy.visit("/calendar");
    cy.injectAxe();
    cy.contains("Loading the Calendar...").should("not.exist");
    cy.checkAxe();
  });

  it(`Past Events landing has no detectable a11y violations on load`, () => {
    cy.visit("/calendar?page=1&type=past");
    cy.injectAxe();
    cy.contains("Loading the Calendar...").should("not.exist");
    cy.checkAxe();
  });

  it(`Event has no detectable a11y violations on load`, () => {
    cy.visit("/calendar?page=1&type=past");
    cy.contains("Loading the Calendar...").should("not.exist");
    cy.get("a.events")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.checkAxe();
      });
  });
});
