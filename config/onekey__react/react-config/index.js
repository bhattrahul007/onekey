module.exports = {
  env: {
    browser: true,
  },
  plugins: ["jsx-a11y", "react-hooks", "react", "react-refresh"],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["./react-a11y-rules.js", "./react-rules.js"].map(require.resolve),
  rules: {},
};
