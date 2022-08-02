module.exports = {
  src: "e2e/browser-tests/**/*.js",
  baseUrl: "https://rubinobs.org",
  browsers: [
    "chrome:headless",
    "firefox:headless",
    "chrome:emulation:device=iphone X",
    "safari",
    "edge",
  ],
};
