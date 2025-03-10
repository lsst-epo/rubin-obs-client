import { defineConfig, defaultPlugins } from "@hey-api/openapi-ts";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  experimentalParser: true,
  input: `${process.env.NEXT_PUBLIC_NOIRLAB_BASE_URL}/public/documentation/schema/`,
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./services/noirlab",
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/schemas",
    "@hey-api/client-next",
    "zod",
    { name: "@hey-api/typescript", style: "PascalCase", enums: "javascript" },
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      asClass: true,
      name: "@hey-api/sdk",
      transformer: true,
    },
  ],
});
