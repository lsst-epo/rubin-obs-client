import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "https://noirlab.edu/public/documentation/schema/",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./lib/api/noirlab/codegen",
  },
  types: {
    dates: "types+transform",
    enums: "javascript",
    name: "PascalCase",
  },
  services: {
    asClass: true,
    filter: "^\\w+ /public/api/v2/releases",
  },
});
