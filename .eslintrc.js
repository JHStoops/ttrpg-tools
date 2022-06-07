module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': ['warn', {
      code: 120, tabWidth: 2, ignoreComments: true, ignoreTrailingComments: true, ignoreUrls: true,
    }],
  },
};
