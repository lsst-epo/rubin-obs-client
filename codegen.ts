import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  generates: {
    "./gql/": {
      documents: [
        "app/[locale]/gallery/**/*.{ts,tsx}",
        "app/[locale]/search/**/*.{ts,tsx}",
        "lib/api/galleries/*.ts",
        "lib/api/search/*.ts",
      ],
      preset: "client",
    },
  },
  config: {
    useTypeImports: true,
    avoidOptionals: true,
  },
  schema: process.env.NEXT_PUBLIC_API_URL,

  ignoreNoDocuments: true, // for better experience with the watcher
};

export default config;
