import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createJiti } from "jiti";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jiti = createJiti(__filename);

await jiti.import("./env");

/** @type {import('next').NextConfig} */
export default {
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
    ],
    minimumCacheTTL: 3600, // 1 hour
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
};
