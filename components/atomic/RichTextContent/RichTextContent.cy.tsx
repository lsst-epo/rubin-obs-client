import RichTextContent from "./index";
import { striptags } from "@/lib/utils/strings";
import { mount } from "cypress/react18";

const props = {
  text: "<p>My text <strong>here</strong></p><p>Another line here</p>",
};
const selector = "[data-cy=rich-text-content]";

describe("<RichTextContent>", () => {
  it("exists", () => {
    mount(<RichTextContent {...props} />);
    cy.get(selector).should("exist");
  });
  it("embeds rich text content", () => {
    mount(<RichTextContent {...props} />);
    cy.get(selector).should((e) => {
      expect(e).to.contain(striptags(props.text));
      expect(e.children()).to.have.length(2);
    });
  });
  it("passes additional HTML attribute props", () => {
    const id = "myTextContent";
    mount(<RichTextContent id={id} {...props} />);
    cy.get(selector).should((e) => {
      expect(e).to.have.attr("id", id);
    });
  });
});
