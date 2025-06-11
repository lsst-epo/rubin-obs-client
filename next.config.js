import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createJiti } from "jiti";
import createNextIntlPlugin from "next-intl/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jiti = createJiti(__filename);

await jiti.import("./env");

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
export default withNextIntl({
  async generateBuildId() {
    return "rubin-obs-client-next-build-id";
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "rubin.canto.com",
      },
      {
        protocol: "https",
        hostname: "**.noirlab.edu",
      },
      {
        protocol: "https",
        hostname: "noirlab.edu",
      },
    ],
    minimumCacheTTL: 3600, // 1 hour
  },
  async headers() {
    return [
      {
        source: "/:all*",
        has: [
          {
            type: "query",
            key: "_rsc",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public,max-age=3600,s-maxage=3600,stale-while-revalidate",
          },
          {
            key: "cache-control",
            value: "public,max-age=3600,s-maxage=3600,stale-while-revalidate",
          },
        ],
      },
    ];
  },
  experimental: {
    forceSwcTransforms: true,
  },
  cacheMaxMemorySize: 0,
  staticPageGenerationTimeout: 2000,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      ssr: true,
    },
  },
  sassOptions: {
    includePaths: [
      join(__dirname, "theme/styles"),
      join(__dirname, "components"),
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
});
