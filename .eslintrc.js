module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:jest/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue',
    'jest'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 'off',
    'no-console': 'warn'
  },
  globals: {}
}
