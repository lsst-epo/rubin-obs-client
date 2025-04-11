import { mount } from "cypress/react18";
import SharePopup from ".";

describe("<SharePopup>", () => {
  it("renders to page", () => {
    mount(<SharePopup />);
    cy.get("button").should("exist");
  });
  it("opens a popup", () => {
    mount(<SharePopup />);
    cy.get("button").click();
    cy.get("button ~ div > ul").should((e) => {
      expect(e.attr("aria-label")?.length).to.be.greaterThan(0);
      expect(e.children().length).to.be.greaterThan(0);
    });
  });
});
