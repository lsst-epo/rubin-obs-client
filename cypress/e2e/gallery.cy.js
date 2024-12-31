const imageId = "i14v2mktbl35905mnh5d4f2721";
const videoId = "411i4249ad1urftfshek6aqh0e";
const gallerySlug = "camera-construction";

describe("Gallery", () => {
  context("Gallery feed", () => {
    beforeEach(() => {
      cy.visit(`/gallery/${gallerySlug}`);
    });
    it("has a gallery title", () => {
      cy.get("h1").should("exist");
    });
    it("shows a feed of assets", () => {
      cy.get("h1 ~ ul").should("exist");
      cy.get("h1 ~ ul > li").its("length").should("be.gt", 0);
    });
    it("paginates results", () => {
      cy.get(`h1 ~ ul > li > a >img`)
        .first()
        .then(($img) => {
          cy.get("a[rel='next']").first().click();
          cy.on("url:changed", (newUrl) => {
            cy.get(`h1 ~ ul > li > a > img`)
              .first()
              .then(($nextImg) => {
                expect($nextImg.attr("id")).to.not.be($img.attr("id"));
              });
          });
        });
    });
    it("links to an individual asset", () => {
      cy.get(`h1 ~ ul > li > a >img`)
        .first()
        .then(($img) => {
          cy.log($img);
          cy.visit(`/gallery/${$img.parent().attr("href")}`);

          cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain(
              `/gallery/${gallerySlug}/${$img.attr("id")}`
            );
          });
        });
    });
  });
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
      cy.get("[data-cy=back-to-gallery").click();
      cy.on("url:changed", (newUrl) => {
        expect(newUrl).to.contain(`/gallery/${gallerySlug}`);
      });
    });
  });
  context("Single video", () => {
    beforeEach(() => {
      cy.visit(`/gallery/${gallerySlug}/${videoId}`);
    });
    it("has the video", () => {
      cy.get("video > source")
        .should("have.attr", "src")
        .and("contain", videoId);
      cy.get("video > source", { includeShadowDom: true })
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
