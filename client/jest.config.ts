import type { Config } from "jest";

const config: Config = {
  // Use jsdom for DOM APIs (React Testing Library needs this)
  testEnvironment: "jest-fixed-jsdom",

  // Transform TypeScript/TSX files via ts-jest with ESM support
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json",
        // Use ESM-compatible output since the project uses "type": "module"
        useESM: true,
      },
    ],
  },

  // Handle ESM modules
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Module name mapping for non-JS imports
  moduleNameMapper: {
    // Handle CSS imports (return empty object)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle image/font imports (return empty string)
    "\\.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot)$":
      "<rootDir>/src/test/mocks/fileMock.ts",
  },

  // Setup files to run after Jest is initialized
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],

  // Test file patterns
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}", "<rootDir>/src/**/*.spec.{ts,tsx}"],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/mocks/**",
    "!src/test/**",
  ],
};

export default config;
