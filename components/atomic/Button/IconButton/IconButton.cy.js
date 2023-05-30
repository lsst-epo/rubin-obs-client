import IconButton from "./index.js";

describe("<IconButton>", () => {
  it("IconButton Exists", () => {
    cy.mount(<IconButton />);
    cy.get("[data-cy=icon-button]").should("exist");
  });

  it("IconButton has Visible Text", () => {
    cy.mount(<IconButton visibleText="Stuff" icon="CaretDown" />);
    cy.get("[data-cy=icon-button]").contains("Stuff");
  });

  it("IconButton has Icon", () => {
    cy.mount(<IconButton icon="CaretDown" />);
    cy.get("[data-cy=icon-button]").children("svg");
  });

  it("IconButton has Screen Reader Text", () => {
    cy.mount(<IconButton icon="CaretDown" accessibleText="Screen Reader only text" />);
    cy.get("[data-cy=icon-button]").contains("Screen Reader only text");
  });
});
