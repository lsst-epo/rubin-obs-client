const path = require("path");
const nextBuildId = require("next-build-id");
// const cacheStrategy = require("./public/cache.js");

let API_URL;

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   runtimeCaching: cacheStrategy
// });

// Check to see if the environment variable DOCKER_GATEWAY_IP is populated, if so
// then the URL should be constructed for a Docker static build
// if (
//   process.env.DOCKERIZED &&
//   process.env.DOCKER_GATEWAY_IP &&
//   parseInt(process.env.DOCKER_GATEWAY_IP) !== -1 && // The getApiGatewayURL script returns -1 if an error occurs grabbing the IP
//   process.env.DOCKER_GATEWAY_PORT
// ) {
//   API_URL = `http://${process.env.DOCKER_GATEWAY_IP}:${process.env.DOCKER_GATEWAY_PORT}`;
// }

// module.exports = withPWA({
  module.exports = {
  async generateBuildId() {
    return nextBuildId({ dir: __dirname });
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
  staticPageGenerationTimeout: 2000,
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "theme/styles"),
      path.join(__dirname, "components"),
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  }
// });
  };
