const { defineConfig } = require("cypress");
require('dotenv').config({ path: './.env' });

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    WEBSITE_URL: process.env.WEBSITE_URL
  }
});
