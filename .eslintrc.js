module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ["jest"],
  settings: {
    "import/resolver": {
      alias: {
        extensions: [".js", ".json"],
        map: [
          [ 'data', './data' ],
          [ 'generators', './generators' ],
          [ 'utils', './lib/utils.js' ]
        ]
      }
    }
  },
  rules: {
    'max-len': ['warn', {
      code: 130, tabWidth: 2, ignoreComments: true, ignoreTrailingComments: true, ignoreUrls: true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
    }],
    "semi": ["warn", "never"],
    "eqeqeq": "warn",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-use-before-define": ["error", { "functions": false, "variables": true }],
    "no-param-reassign": "error",
    "array-bracket-spacing": ["error", "always"],
    "no-plusplus": "off",
    "no-lonely-if": "off",
    "valid-jsdoc": "warn",
    "no-debugger": "warn",
    "import/extensions": ["error", {
      "js": "ignorePackages"
    }],

    // Jest rules
    "jest/prefer-expect-assertions": "off",
    "jest/prefer-strict-equal": "off",
    "jest/no-hooks": "off",
    "jest/no-disabled-tests": "warn"
  },
};
