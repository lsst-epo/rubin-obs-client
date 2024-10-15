context("POST /charming-overlords", () => {
  it("rejects requests without a code", () => {
    cy.request({
      url: "/api/charming-overlords",
      method: "POST",
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });
  it("rejects invalid codes", () => {
    cy.request({
      url: "/api/charming-overlords",
      body: { code: "somecode" },
      method: "POST",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
