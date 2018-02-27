module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  transformIgnorePatterns: [
    '<roodDir>/node_modules/(?!@swish)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|styl)$': 'identity-obj-proxy'
  },
  mapCoverage: true,
  testResultsProcessor: process.env.CI ? 'jest-junit' : undefined,
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
  setupFiles: ['<rootDir>/jest.setup.js']
}
