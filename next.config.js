import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let API_URL;

// Check to see if the environment variable DOCKER_GATEWAY_IP is populated, if so
// then the URL should be constructed for a Docker static build
if (
  process.env.DOCKERIZED &&
  process.env.DOCKER_GATEWAY_IP &&
  parseInt(process.env.DOCKER_GATEWAY_IP) !== -1 && // The getApiGatewayURL script returns -1 if an error occurs grabbing the IP
  process.env.DOCKER_GATEWAY_PORT
) {
  API_URL = `http://${process.env.DOCKER_GATEWAY_IP}:${process.env.DOCKER_GATEWAY_PORT}`;
}

/** @type {import('next').NextConfig} */
export default {
  async generateBuildId() {
    return "rubin-obs-client-next-build-id";
  },
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: API_URL
          ? `${API_URL}/assets/:path*`
          : "http://localhost:9000/assets/:path*", // Proxy to Backend
      },
    ];
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
        hostname: "noirlab.edu",
      },
    ],
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
