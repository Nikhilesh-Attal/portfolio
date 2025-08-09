const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
}

module.exports = createJestConfig(customJestConfig)
