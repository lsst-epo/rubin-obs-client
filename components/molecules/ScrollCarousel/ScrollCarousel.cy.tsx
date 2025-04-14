import { mount } from "cypress/react18";
import ScrollCarousel from ".";

describe("<ScrollCarousel>", () => {
  it("renders to page", () => {
    mount(
      <ScrollCarousel>
        <div />
        <div />
        <div />
      </ScrollCarousel>
    );
    cy.get("[data-cy=scroll-carousel]").should("exist");
  });
  it("has a radio button for each child", () => {
    mount(
      <ScrollCarousel>
        <div />
        <div />
        <div />
      </ScrollCarousel>
    );
    cy.get("[role=radio]").its("length").should("eq", 3);
  });
  it("should change the scroll position after clicking a radio input", () => {
    mount(
      <ScrollCarousel style={{ width: "100%", height: "100px" }}>
        <div />
        <div />
        <div />
      </ScrollCarousel>
    );

    cy.get("[role=radio]").last().click({ force: true });
    cy.get("[data-cy=scroll-carousel]")
      .first()
      .then((element) => {
        const { scrollLeft } = element.get(0);

        expect(scrollLeft).to.be.greaterThan(0);
      });
  });
  it("should change the selected radio after scroll", () => {
    mount(
      <ScrollCarousel style={{ width: "100%", height: "100px" }}>
        <div />
        <div />
        <div />
      </ScrollCarousel>
    );

    cy.get("[data-cy=scroll-carousel]").scrollTo("bottomRight");

    cy.get("[role=radio]").last().should("have.attr", "data-checked");
  });
});
