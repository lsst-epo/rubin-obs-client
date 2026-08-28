/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "contexts/**/*.{js,jsx,ts,tsx}",
    "helpers/**/*.{js,jsx,ts,tsx}",
    "hooks/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
    "services/**/*.{js,jsx,ts,tsx}",
    "!**/*.test.{js,jsx,ts,tsx}", // Ignore test files
    "!**/*.stories.{js,jsx,ts,tsx}", // Ignore story files
    "!**/mock.{js,jsx,ts,tsx}", // Ignore story files
    "!**/*.cy.{js,jsx,ts,tsx}", // Ignore mock data files
    "!**/styles.{js,jsx,ts,tsx}", // Ignore styled components
    "!**/*.gen.{js,jsx,ts,tsx}", // Ignore generated files
    "!**/*.d.ts", // Ignore type files
    "!components/svg/**", // Ignore SVGs
    "!lib/suncalc.js", // Ignore the 3rd party Suncalc library
  ],
  coverageThreshold: {
    /**
     * All thresholds set to zero so they are not blocking CI while we get
     * tests implemented and determine acceptable thresholds
     * ToDo: Incrementally set thresholds as coverage is implemented
     */
    global: { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./app/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./components/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./contexts/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./helpers/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./hooks/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./lib/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./pages/": { statements: 0, branches: 0, functions: 0, lines: 0 },
    "./services/": { statements: 0, branches: 0, functions: 0, lines: 0 },
  },
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
