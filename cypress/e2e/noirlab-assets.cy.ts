const image = "noirlab2511a";
const video = "top_end_assembly_on_the_summit";

describe("NOIRLab Asset Ingest", () => {
  it("should display image assets", () => {
    cy.visit(`/gallery/collections/news-images/${image}`, {
      onLoad: () => {
        cy.get("h1").should("exist");
        cy.get("[data-cy=gallery-image]").should("exist");
      },
    });
  });
  it("should display video assets", () => {
    cy.visit(`/gallery/collections/news-videos/${video}`, {
      onLoad: () => {
        cy.get("h1").should("exist");
        cy.get("[data-testid=video-player]").should("exist");
      },
    });
  });
});
