describe("News", () => {
  it("News Posts Landing has no detectable a11y violations on load", () => {
    cy.visit("/news?filter=84");
    cy.injectAxe();
    cy.contains("Loading the News...").should("not.exist");
    cy.checkAxe();
  });

  it("News Post has no detectable a11y violations on load", () => {
    cy.visit("/news?filter=84");
    cy.contains("Loading the News...").should("not.exist");
    cy.get("a.news")
      .first()
      .then(($el) => {
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.checkAxe();
      });
  });

  it("News Releases Landing has no detectable a11y violations on load", () => {
    cy.visit("/news?filter=85");
    cy.injectAxe();
    cy.contains("Loading the News...").should("not.exist");
    cy.intercept({
      method: "GET",
      url: "https://noirlab.edu/public/api/v2/**/*",
    }).as("getRelease");
    cy.injectAxe();
    cy.wait("@getRelease").then(() => {
      cy.checkAxe();
    });
  });

  it("News Release has no detectable a11y violations on load", () => {
    cy.visit("/news?filter=85");
    cy.contains("Loading the News...").should("not.exist");
    cy.get("a.news")
      .first()
      .then(($el) => {
        cy.intercept({
          method: "GET",
          url: "https://noirlab.edu/public/api/v2/**/*",
        }).as("getRelease");
        cy.visit($el.attr("href"));
        cy.injectAxe();
        cy.wait("@getRelease").then(() => {
          cy.checkAxe();
        });
      });
  });
});
