describe("Education", () => {
  it(`Education Landing has no detectable a11y violations on load`, () => {
    cy.visit("/education");
    cy.injectAxe();
    cy.checkAxe();
  });

  it(`Education FAQ has no detectable a11y violations on load`, () => {
    cy.visit("/education/education-faqs");
    cy.injectAxe();
    cy.checkAxe();
  });

  it(`Glossary has no detectable a11y violations on load`, () => {
    cy.visit("/education/glossary");
    cy.injectAxe();
    cy.contains("Loading the Glossary...").should("not.exist");
    cy.checkAxe();
  });

  it(`Glossary Item has no detectable a11y violations on load`, () => {
    cy.visit("/education/glossary");
    cy.contains("Loading the Glossary...").should("not.exist");
    cy.get("#termColumns a")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.checkAxe();
      });
  });

  it(`Investigations has no detectable a11y violations on load`, () => {
    cy.visit("/education/investigations");
    cy.injectAxe();
    cy.checkAxe();
  });

  it(`Investigation landing has no detectable a11y violations on load`, () => {
    cy.visit("/education/educators/investigations");
    cy.get("article ul a")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.checkAxe();
      });
  });

  it(`Investigation Teacher's Guide landing has no detectable a11y violations on load`, () => {
    cy.visit("/education/educators/investigations");
    cy.get("article ul a")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.get("#guideNavList a")
          .first()
          .then(($el) => {
            cy.visit($el.attr("href"));
            cy.injectAxe();
            cy.checkAxe();
          });
      });
  });

  it(`Investigation Teacher's Guide NGSS has no detectable a11y violations on load`, () => {
    cy.visit("/education/educators/investigations");
    cy.get("article ul a")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.get("#guideNavList a")
          .first()
          .then(($el) => {
            cy.visit($el.attr("href"));
            cy.get("#guideNavList a")
              .eq(4)
              .then(($el) => {
                cy.visit($el.attr("href"));
                cy.injectAxe();
                cy.checkAxe();
              });
          });
      });
  });

  it(`Program Guide has no detectable a11y violations on load`, () => {
    cy.visit("/education/educators/program-guide");
    cy.injectAxe();
    cy.checkAxe();
  });

  it(`Program Guide Standards has no detectable a11y violations on load`, () => {
    cy.visit("/education/educators/program-guide/standards-design");
    cy.injectAxe();
    cy.checkAxe();
  });
});
