const imageId = "3q7c8ug6ml0df90ig6ua5e1g11";
const videoId = "3q7c8ug6ml0df90ig6ua5e1g11";
const gallerySlug = "camera-construction";

describe("Gallery", () => {
  context("Single image", () => {
    beforeEach(() => {
      cy.visit(`/gallery/${gallerySlug}/${imageId}`);
    });
    it("has a breadcrumb", () => {
      cy.get("[data-cy=breadcrumb]").should("exist");
      cy.get("[data-cy=breadcrumb] > ol > li > a").should("have.length", 2);
      cy.get("[data-cy=breadcrumb] > ol > li > a")
        .eq(0)
        .should("have.attr", "href")
        .and("contain", `/gallery/${gallerySlug}`)
        .and("not.contain", imageId);
      cy.get("[data-cy=breadcrumb] > ol > li > a")
        .eq(1)
        .should("have.attr", "href")
        .and("contain", `/gallery/${gallerySlug}/${imageId}`);
    });
    it("has a page title", () => {
      cy.get("h1").should("not.to.match", ":empty");
    });
    it("has the image", () => {
      cy.get("[data-cy=canto-image]")
        .should("have.attr", "src")
        .and("contain", imageId);
      cy.get("[data-cy=canto-image]", { includeShadowDom: true })
        .filter("[src]:not([src='']")
        .filter(":visible")
        .should(($imgs) =>
          $imgs.map((i, /** @type {HTMLImageElement} */ img) =>
            expect(img.naturalWidth).to.be.greaterThan(0)
          )
        );
    });
    it("has a caption", () => {
      cy.get("figcaption").should("not.to.match", ":empty");
    });
    it("can download the original", () => {
      cy.get("[data-cy=canto-download]").then((link) => {
        const { searchParams } = new URL(link.prop("href"));
        cy.request(link.prop("href")).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers).to.include({
            "content-disposition": `attachment; filename="${searchParams.get(
              "name"
            )}"`,
          });
        });
      });
    });
    it("has a link back to the parent", () => {
      cy.get("[data-cy=back-to-gallery")
        .should("have.attr", "href")
        .and("contain", `/gallery/${gallerySlug}`);
    });
  });
  context("Single video", () => {
    it("has the image", () => {
      cy.get("[data-cy=canto-video]")
        .should("have.attr", "src")
        .and("contain", imageId);
      cy.get("[data-cy=canto-video]", { includeShadowDom: true })
        .filter("[src]:not([src='']")
        .filter(":visible")
        .should(($imgs) =>
          $imgs.map((i, /** @type {HTMLImageElement} */ img) =>
            expect(img.naturalWidth).to.be.greaterThan(0)
          )
        );
    });
  });
});
