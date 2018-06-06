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
    '<rootDir>/node_modules/(?!mwangaben-vthelpers)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|styl)$': 'identity-obj-proxy'
  },
  reporters: process.env.CI ? ['default', 'jest-junit'] : undefined,
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mocks__'],
  setupFiles: ['<rootDir>/jest.setup.js']
}
