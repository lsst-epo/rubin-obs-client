import { transformWithOxc } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    {
      // Some project .js files contain JSX (Next allows it), but Vite only
      // parses JSX in .jsx/.tsx files
      name: "js-as-jsx",
      enforce: "pre",
      transform(code, id) {
        if (!/\.js$/.test(id) || id.includes("/node_modules/")) return null;
        return transformWithOxc(code, id, {
          lang: "jsx",
          jsx: { runtime: "automatic" },
        });
      },
    },
    tsconfigPaths({ projects: ["./tsconfig.vitest.json"] }),
    react(),
  ],
  // Inline (empty) PostCSS config so Vite skips postcss.config.js, whose
  // Next.js-style string plugin entries Vite can't load
  css: { postcss: {} },
  test: {
    environment: "jsdom",
    clearMocks: true,
    // Negative UTC offset so UTC-midnight dates reliably roll back a day;
    // see helpers/README.md
    env: { TZ: "America/Phoenix" },
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["**/node_modules/**", "cypress/**"],
    coverage: {
      enabled: true,
      provider: "v8",
      include: [
        "app/**/*.{js,jsx,ts,tsx}",
        "components/**/*.{js,jsx,ts,tsx}",
        "contexts/**/*.{js,jsx,ts,tsx}",
        "helpers/**/*.{js,jsx,ts,tsx}",
        "hooks/**/*.{js,jsx,ts,tsx}",
        "lib/**/*.{js,jsx,ts,tsx}",
        "pages/**/*.{js,jsx,ts,tsx}",
        "services/**/*.{js,jsx,ts,tsx}",
      ],
      exclude: [
        "**/*.test.{js,jsx,ts,tsx}", // Ignore test files
        "**/*.stories.{js,jsx,ts,tsx}", // Ignore story files
        "**/mock.{js,jsx,ts,tsx}", // Ignore story files
        "**/*.cy.{js,jsx,ts,tsx}", // Ignore mock data files
        "**/styles.{js,jsx,ts,tsx}", // Ignore styled components
        "**/*.gen.{js,jsx,ts,tsx}", // Ignore generated files
        "**/*.d.ts", // Ignore type files
        "components/svg/**", // Ignore SVGs
        "lib/suncalc.js", // Ignore the 3rd party Suncalc library
      ],
      reporter: ["clover", "json", "lcov", "text", "json-summary"],
      thresholds: {
        /**
         * All thresholds set to zero so they are not blocking CI while we get
         * tests implemented and determine acceptable thresholds
         * ToDo: Incrementally set thresholds as coverage is implemented
         */
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
        "app/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "components/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "contexts/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "helpers/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "hooks/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "lib/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "pages/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
        "services/**": { statements: 0, branches: 0, functions: 0, lines: 0 },
      },
    },
  },
});
