module.exports = {
  collectCoverageFrom: [
    'src/**',
    'packages/**/src/**',
    '!**/packages/**/dist/**',
    '!**/packages/**/src/index.ts',
    // "!packages/**/node_modules",
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      functions: 50,
      branches: 50,
      lines: 50,
    },
  },
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(jsx?|tsx?)$',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};
