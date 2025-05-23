import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  shared: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .catch("test")
      .default("test"),
  },
  server: {
    BING_INDEXNOW_KEY: z.string().min(1).optional(),
    CANTO_BASE_URL: z.string().url(),
    CLOUD_ENV: z.enum(["PROD", "INT", "DEV"]).default("DEV"),
    CRAFT_REVALIDATE_SECRET_TOKEN: z.string().min(1),
    CRAFT_SECRET_TOKEN: z.string().min(1),
    GOOGLE_APP_SECRET: z.string().min(1),
    SKYVIEWER_BASE_URL: z.string().url(),
    NOIRLAB_REVALIDATE: z.coerce
      .number()
      .min(1)
      .catch(60 * 5),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CONTACT_FORM_POST_URL: z.string().url(),
    NEXT_PUBLIC_EFD_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_APP_ID: z.string().min(1),
    NEXT_PUBLIC_HASURA_SECRET: z.string().min(1).optional(),
    NEXT_PUBLIC_NOIRLAB_BASE_URL: z.string().url(),

    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().min(1).optional(),
    NEXT_PUBLIC_SURVEY_SPARROW: z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .optional()
      .default("false"),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CONTACT_FORM_POST_URL:
      process.env.NEXT_PUBLIC_CONTACT_FORM_POST_URL,
    NEXT_PUBLIC_EFD_URL: process.env.NEXT_PUBLIC_EFD_URL,
    NEXT_PUBLIC_GOOGLE_APP_ID: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
    NEXT_PUBLIC_HASURA_SECRET: process.env.NEXT_PUBLIC_HASURA_SECRET,
    NEXT_PUBLIC_NOIRLAB_BASE_URL: process.env.NEXT_PUBLIC_NOIRLAB_BASE_URL,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_SURVEY_SPARROW: process.env.NEXT_PUBLIC_SURVEY_SPARROW,
    NODE_ENV: process.env.NODE_ENV,
  },
});
