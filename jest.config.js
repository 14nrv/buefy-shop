module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|styl)$': 'identity-obj-proxy'
  },
  reporters: process.env.CI ? ['default', 'jest-junit'] : undefined,
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mocks__']
}
