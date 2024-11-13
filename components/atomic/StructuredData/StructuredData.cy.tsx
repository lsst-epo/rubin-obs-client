import { mount } from "cypress/react";
import { ImageObject } from "schema-dts";
import StructuredData from ".";

const id = "schema";
const imageObject: ImageObject = {
  "@type": "ImageObject",
  contentUrl:
    "https://rubin.canto.com/direct/image/nj40jlebv120p4fm2ijat6345k/Z-ohDijmcrdn1UU-we9M3AqLzj8/original?content-type=image%2Fjpeg&name=Comet.jpg",
  license: "https://www.hernanstockebrand.com/",
  creditText: "RubinObs/NOIRLab/SLAC/DOE/NSF/AURA/H. Stockebrand",
  creator: {
    "@type": "Person",
    name: "Hernan Stockebrand",
  },
  contentSize: "43.21MB",
  dateCreated: "2024-10-16 20:58",
  datePublished: "2024-10-17 05:47",
  caption:
    "Comet Tsuchinshan-ATLAS makes an appearance in the twilight sky next to Rubin Observatory on the night of October 16, 2024. The comet is currently headed away from the Sun on its 80,000-year orbit after making its closest approach on October 9.",
};

describe("<StructuredData>", () => {
  it("renders to page", () => {
    mount(<StructuredData jsonLd={imageObject} id={id} />);
    cy.get(`#${id}`).should("exist");
    cy.get(`#${id}`).invoke("attr", "type").should("eq", "application/ld+json");
  });
  it("attaches schema context", () => {
    mount(<StructuredData jsonLd={imageObject} id={id} />);
    cy.get(`#${id}`).should(
      "have.text",
      JSON.stringify({ "@context": "https://schema.org", ...imageObject })
    );
  });
});
