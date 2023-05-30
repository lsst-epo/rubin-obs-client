Cypress.on('uncaught:exception', (err, runnable) => {
  if(err.message.includes("Missing required parameter 'client_id'")) {
    return false
  }
})

describe('poke around the website', () => {
  it('loads homepage', () => {
    cy.visit(Cypress.env("WEBSITE_URL"))

    // Commented out for now because navigating the hamburguesa menu without
    // unique IDs is a nightmare
    //
    // cy.get(".c-global-header__hamburger-block").then(hamburger => {
    //   hamburger.click();
    //   cy.get(".c-nav-list__link-text").contains("About").then(aboutLink => {
    //     console.log("logging aboutLink: ", aboutLink);
    //     aboutLink.click();
    //     cy.get(".c-subnav-list__link").contains("About").then(aboutMenuLink => {
    //       aboutMenuLink.click();
    //       cy.url().should("include", "/about");
    //     })
    //   })
    // });
  });
})
