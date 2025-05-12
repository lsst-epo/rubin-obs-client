import { fallbackLng } from "@/lib/i18n/settings";

describe("Localized routing", () => {
  it("should localize the browser", () => {
    cy.visit("/").then((window) => {
      cy.getAllCookies();
      cy.get("html").should("have.attr", "lang", fallbackLng);
    });
  });
  it("has a toggle for language", () => {
    cy.visit("/").then(() => {
      cy.get("[data-cy=localeToggle]").should("exist");
      cy.get("[data-cy=localeToggle] button").filter(":visible").click();
      cy.on("url:changed", () => {
        cy.get("html").should("have.attr", "lang", "es");
      });
    });
  });
  it("stays in the language selected", () => {
    cy.visit("/").then(() => {
      cy.get("[data-cy=localeToggle] button").filter(":visible").click();

      cy.visit("/about").then(() => {
        cy.get("html").should("have.attr", "lang", "es");
      });
    });
  });
});
