import "./env.config.js";
import { env } from "./env.js";
import { defineConfig } from "cypress";

const config = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: env.NEXT_PUBLIC_BASE_URL,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env,
});

export default config;
