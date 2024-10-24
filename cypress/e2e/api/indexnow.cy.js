const indexNowKey = Cypress.env("BING_INDEXNOW_KEY");
const baseUrl = "/api/indexnow/";
const keyFile = `${indexNowKey}.txt`;
const invalidFileName = `123.txt`;
const invalidFileType = `${indexNowKey}.pdf`;

context("GET /api/indexnow/[keyFile]", () => {
  it("rejects requests with incorrect file type", () => {
    cy.request({
      url: `${baseUrl}${invalidFileType}`,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(body).to.eq("Invalid file type");
      expect(status).to.eq(400);
    });
  });
  it("rejects requests with incorrect filename", () => {
    cy.request({
      url: `${baseUrl}${invalidFileName}`,
      method: "GET",
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(body).to.eq("Invalid key");
      expect(status).to.eq(400);
    });
  });
  it("returns an indexNow key", () => {
    cy.request({
      url: `${baseUrl}${keyFile}`,
      method: "GET",
    }).then(({ status, body, headers }) => {
      expect(body).to.eq(indexNowKey);
      expect(headers["content-type"]).to.eq("text/plain");
      expect(status).to.eq(200);
    });
  });
});
