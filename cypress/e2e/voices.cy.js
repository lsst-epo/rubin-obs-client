describe("Voices", () => {
  it(`Voices Landing has no detectable a11y violations on load`, () => {
    cy.visit("/explore/voices");
    cy.injectAxe();
    cy.contains("Loading the Rubin Voices...").should("not.exist");
    cy.checkAxe();
  });

  it(`Voices All has no detectable a11y violations on load`, () => {
    cy.visit("/explore/voices/all-voices");
    cy.injectAxe();
    cy.contains("Loading the Rubin Voices...").should("not.exist");
    cy.checkAxe();
  });

  it(`Voices Article has no detectable a11y violations on load`, () => {
    cy.visit("/explore/staff/ardis-herrold");
    cy.injectAxe();
    cy.checkAxe();
  });
});
