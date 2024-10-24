module.exports = {
  env: {
    "jest/globals": true,
    jest: true,
  },
  plugins: ["jest", "jest-dom", "testing-library"],
  extends: [("./jest-rules.js", "./jest-testing-rules.js")].map(
    require.resolve
  ),
  rules: {},
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
