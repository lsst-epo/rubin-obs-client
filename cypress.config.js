import { loadEnvConfig } from "@next/env";

const { defineConfig } = require("cypress");
const projectDir = process.cwd();

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: loadEnvConfig(projectDir).combinedEnv,
});
