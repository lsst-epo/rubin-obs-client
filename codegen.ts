import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  generates: {
    "./gql/": {
      documents: [
        "app/[locale]/gallery/**/*.{ts,tsx}",
        "lib/api/galleries/*.ts",
      ],
      preset: "client",
    },
  },
  config: {
    useTypeImports: true,
    avoidOptionals: true,
    nonOptionalTypename: true,
  },
  schema: process.env.NEXT_PUBLIC_API_URL,

  ignoreNoDocuments: true, // for better experience with the watcher
};

export default config;
