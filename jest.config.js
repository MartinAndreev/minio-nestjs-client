// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',
  bail: 4,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  errorOnDeprecated: false,
  resetMocks: true,
  roots: ['./tests'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['index.ts'],
};
