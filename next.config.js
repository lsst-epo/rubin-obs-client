const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: 'http://localhost:9000/assets/:path*' // Proxy to Backend
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "theme/styles"),
      path.join(__dirname, "components"),
    ],
  },
};
