const text = "press release";
const searchParams = new URLSearchParams({ search: text });

describe("Search page", () => {
  it("searches from filter input yields results", () => {
    cy.visit("/search", {
      onLoad: () => {
        cy.get("[data-cy=clear]").should("have.attr", "disabled");
        cy.get("input[type=search]").type(`${text}{enter}`);

        cy.on("url:changed", (newUrl) => {
          expect(newUrl).to.contain(searchParams.toString());
          cy.get("ul li").its("length").should("be.gte", 1);
        });
      },
    });
  });
  it("resets search when clear button clicked", () => {
    cy.visit(`/search?${searchParams.toString()}`, {
      onLoad: () => {
        cy.get("[data-cy=clear]").click();

        cy.on("url:changed", (newUrl) => {
          cy.get("input[type=search]").should("have.value", "");
          cy.get("[data-cy=clear]").should("have.attr", "disabled");
          expect(newUrl).to.not.contain("?search");
        });
      },
    });
  });
});
