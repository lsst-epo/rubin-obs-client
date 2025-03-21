import "./env.config.js";
import type { CodegenConfig } from "@graphql-codegen/cli";
import { env } from "./env";

const config: CodegenConfig = {
  generates: {
    "./gql/": {
      documents: [
        "app/api/**/*.ts",
        "app/[locale]/gallery/**/*.{ts,tsx}",
        "app/[locale]/search/**/*.{ts,tsx}",
        "lib/api/galleries/*.ts",
        "lib/api/search/*.ts",
        "lib/api/globals/navigation.ts",
        "services/craft/**/*.ts",
      ],
      preset: "client",
    },
  },
  config: {
    useTypeImports: true,
    avoidOptionals: true,
    nonOptionalTypename: true,
  },
  schema: env.NEXT_PUBLIC_API_URL,

  ignoreNoDocuments: true, // for better experience with the watcher
};

export default config;
