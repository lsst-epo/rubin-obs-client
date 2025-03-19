import nextEnv from "@next/env";
import { defineConfig } from "cypress";
const { loadEnvConfig } = nextEnv;
const projectDir = process.cwd();

const config = defineConfig({
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
  env: loadEnvConfig(projectDir).parsedEnv,
});

export default config;
