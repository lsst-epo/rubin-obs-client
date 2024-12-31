import { defineConfig } from "@hey-api/openapi-ts";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: `${process.env.NOIRLAB_BASE_URL}/public/documentation/schema/`,
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
    filter: "^\\w+ /public/api/v2",
  },
});
