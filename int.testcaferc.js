module.exports = {
  src: "e2e/int-tests/**/*.js",
  baseUrl: "https://int.rubinobs.org",
  browsers: [
    "chrome:headless"
  ],
  retryTestPages: true,
  color: true,
}