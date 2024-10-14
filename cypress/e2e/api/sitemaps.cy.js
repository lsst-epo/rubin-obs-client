import { XMLValidator, XMLParser } from "fast-xml-parser";
import { languages } from "../../../lib/i18n/settings";

const url = "/sitemap_index.xml";

context("GET /server_index.xml", () => {
  it("returns a well formed XML file", () => {
    cy.request({
      url,
      method: "GET",
    }).then(({ body, headers }) => {
      expect(headers["content-type"]).to.eq("application/xml; charset=utf-8");

      const valid = XMLValidator.validate(body);

      expect(valid).to.eq(true);
    });
  });
  it("contains a sitemap for each locale", () => {
    cy.request({
      url,
      method: "GET",
    }).then(({ body }) => {
      const parser = new XMLParser();
      const {
        sitemapindex: { sitemap },
      } = parser.parse(body);

      expect(sitemap.length).to.eq(languages.length);
    });
  });
  it("contains valid sitemap links", () => {
    cy.request({
      url,
      method: "GET",
    }).then(({ body }) => {
      const parser = new XMLParser();
      const {
        sitemapindex: { sitemap },
      } = parser.parse(body);

      sitemap.forEach(({ loc }) => {
        cy.request({ url: loc, method: "GET" }).then(({ body, headers }) => {
          expect(headers["content-type"]).to.eq(
            "application/xml; charset=utf-8"
          );

          const valid = XMLValidator.validate(body);

          expect(valid).to.eq(true);
        });
      });
    });
  });
});
