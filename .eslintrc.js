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
      "alias": {
        "extensions": [".js", ".json"]
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
    "no-loop-func": "off",
    "no-underscore-dangle": "off",
    "array-bracket-spacing": ["error", "always"],
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "no-lonely-if": "off",
    "default-case": "off",
    "jest/require-hook": "off",
    "jest/prefer-called-with": "off",
    "jest/require-top-level-describe": "off",
    "new-cap": "off",
    "no-param-reassign": "warn",
    "valid-jsdoc": "warn",
    "no-debugger": "warn",
    "prefer-destructuring": "warn",
    "comma-dangle": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",

    // Jest rules
    "jest/prefer-expect-assertions": "off",
    "jest/prefer-strict-equal": "off",
    "jest/no-hooks": "off",
    "jest/no-disabled-tests": "warn"
  },
};
