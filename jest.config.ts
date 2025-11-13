module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
    "^.+\\.svg$": "jest-transformer-svg",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  testMatch: ["**/?(*.)+(test|spec).(ts|tsx)"],

  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results",
        outputName: "junit.xml",
        addFileAttribute: "true",
      },
    ],
  ],

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
};
