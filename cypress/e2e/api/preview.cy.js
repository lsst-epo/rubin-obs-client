const url = "/api/preview";
const uri = "news";
const invalidUri = "badnews";
const secret = Cypress.env("CRAFT_SECRET_TOKEN");
const token = "previewToken";

context("GET /preview", () => {
  it("rejects requests that do not come from Craft", () => {
    cy.request({
      url,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(401);
    });
  });
  it("rejects requests that do not have a secret", () => {
    const params = new URLSearchParams({ "x-craft-preview": true });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(401);
    });
  });
  it("rejects requests that do not have a preview URI", () => {
    const params = new URLSearchParams({ "x-craft-preview": true, secret });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(422);
    });
  });
  it("rejects requests that have an invalid URI", () => {
    const params = new URLSearchParams({
      "x-craft-preview": true,
      secret,
      uri: invalidUri,
    });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(422);
    });
  });
  it("redirects to a preview page", () => {
    const params = new URLSearchParams({
      "x-craft-preview": true,
      secret,
      uri,
      token,
    });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
    }).then(({ redirects, headers }) => {
      expect(redirects.length).to.be.gt(0);
    });
  });
});
