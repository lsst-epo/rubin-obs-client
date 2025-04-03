const imageId = "i14v2mktbl35905mnh5d4f2721";
const videoId = "2lego96oip6eb8ph7etg16pj59";
const gallerySlug = "camera-construction";

describe("Gallery", () => {
  context("Gallery feed", () => {
    beforeEach(() => {
      cy.visit(`/gallery`);
    });
    it("has a gallery title", () => {
      cy.get("h1").should("exist");
    });
    it("shows a feed of assets", () => {
      cy.get("h1 ~ * > ul").should("exist");
      cy.get("h1 ~ * > ul > li").its("length").should("be.gt", 0);
    });
    it("paginates results", () => {
      cy.get(`h1 ~ * > ul > li > a >img`)
        .first()
        .then(($img) => {
          cy.get("a[rel='next']").first().click();
          cy.on("url:changed", (newUrl) => {
            cy.get(`h1 ~ ul > li > a > img`)
              .first()
              .then(($nextImg) => {
                expect($nextImg.attr("id")).not.to.be($img.attr("id") || "");
              });
          });
        });
    });
    it("links to an individual asset", () => {
      cy.get(`h1 ~ * > ul > li > a > img`)
        .first()
        .then(($img) => {
          const href = $img.parent().attr("href");

          expect(href?.length).to.be.greaterThan(0);

          if (href) {
            cy.visit(href);

            cy.on("url:changed", (newUrl) => {
              expect(newUrl).to.contain($img.attr("id"));
            });
          }
        });
    });
  });
  context("Single image", () => {
    beforeEach(() => {
      cy.visit("/gallery?type=image");
      cy.get(`h1 ~ * > ul > li > a > img`)
        .first()
        .then(($img) => {
          cy.visit($img.parent().attr("href") || "");
        });
    });
    it("has a breadcrumb", () => {
      cy.get("[data-cy=breadcrumb]").should("exist");
      cy.get("[data-cy=breadcrumb] > ol > li > a").should("have.length", 2);
      cy.get("[data-cy=breadcrumb] > ol > li > a")
        .eq(0)
        .should("have.attr", "href")
        .and("contain", "/gallery")
        .and("not.contain", imageId);
      cy.get("[data-cy=breadcrumb] > ol > li > a")
        .eq(1)
        .should("have.attr", "href")
        .and("contain", "/gallery/collections/");
    });
    it("has a page title", () => {
      cy.get("h1").should("not.to.match", ":empty");
    });
    it("has the image", () => {
      cy.get("[data-cy=gallery-image]").should("have.attr", "src");
      cy.get("[data-cy=gallery-image]", { includeShadowDom: true })
        .filter("[src]:not([src='']")
        .filter(":visible")
        .should(($imgs) =>
          $imgs.map((i, img) => expect(img.clientWidth).to.be.greaterThan(0))
        );
    });
    it("has a caption", () => {
      cy.get("figcaption").should("not.to.match", ":empty");
    });
    it("can download the original", () => {
      cy.get("[data-cy=canto-download]").then((link) => {
        const { searchParams } = new URL(link.prop("href"));
        cy.request({
          url: link.prop("href"),
          headers: { referer: Cypress.env("NEXT_PUBLIC_BASE_URL") },
        }).then((response) => {
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
        expect(newUrl).to.contain("/gallery");
      });
    });
  });
  context("Single video", () => {
    beforeEach(() => {
      cy.visit("/gallery?type=video");
      cy.get(`h1 ~ * > ul > li > a > img`)
        .first()
        .then(($img) => {
          cy.visit($img.parent().attr("href") || "");
        });
    });
    it("has the video", () => {
      cy.get("video > source").should("have.attr", "src");
      cy.get("video > source", { includeShadowDom: true })
        .filter("[src]:not([src='']")
        .filter(":visible")
        .should(($imgs) =>
          $imgs.map((i, img) => expect(img.clientWidth).to.be.greaterThan(0))
        );
    });
  });
});
