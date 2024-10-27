module.exports = {
  extends: ["plugin:jest-dom/recommended", "plugin:testing-library/react"],
  rules: {
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-focus": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",

    "testing-library/await-async-queries": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-container": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": ["error", "react"],
    "testing-library/no-node-access": "error",
    "testing-library/no-promise-in-fire-event": "error",
    "testing-library/prefer-find-by": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/prefer-screen-queries": "error",
    "testing-library/prefer-user-event": "error",
  },
};
