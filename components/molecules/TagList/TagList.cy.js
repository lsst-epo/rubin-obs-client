import TagList from "./index";

const tags = [
  { name: "Static Tag" },
  { name: "Linked Tag", destination: "https://rubinobservatory.org" },
];

describe("<TagList>", () => {
  it("should render an unordered list", () => {
    cy.mount(<TagList />);
    cy.get("ul").should("exist");
  });

  it("should render tag names with a pound symbol by default", () => {
    cy.mount(<TagList tags={tags} />);
    cy.get("ul > li").each(($el, i) => {
      cy.wrap($el).contains(`#${tags[i].name}`);
    });
  });

  it("should omit pound symbol if specified", () => {
    cy.mount(<TagList tags={tags} showPound={false} />);
    cy.get("ul > li").each(($el, i) => {
      cy.wrap($el).contains(tags[i].name);
    });
  });

  it("should render links if provided", () => {
    cy.mount(<TagList tags={tags} />);
    cy.get("ul > li").each(($el, i) => {
      if (tags[i].destination) {
        cy.wrap($el).children("a").should("exist");
      } else {
        cy.wrap($el).children("a").should("not.exist");
      }
    });
  });
});
