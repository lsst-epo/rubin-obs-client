const url = "/api/revalidate";
const uri = "news";
const secret = Cypress.env("CRAFT_REVALIDATE_SECRET_TOKEN");

context("GET /revalidate", () => {
  it("rejects missing URI segments", () => {
    cy.request({
      url,
      method: "GET",
    }).then(({ body }) => {
      const { revalidated, message } = body;
      expect(revalidated).to.eq(false);
      expect(message).to.eq("Missing path to revalidate");
    });
  });
  it("rejects missing secret", () => {
    const params = new URLSearchParams({ uri });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
    }).then(({ body }) => {
      const { revalidated, message } = body;
      expect(revalidated).to.eq(false);
      expect(message).to.eq("Invalid token");
    });
  });
  it("revalidates", () => {
    const params = new URLSearchParams({ uri, secret });
    cy.request({
      url: `${url}?${params.toString()}`,
      method: "GET",
    }).then(({ body }) => {
      const { revalidated } = body;
      expect(revalidated).to.eq(true);
    });
  });
});
