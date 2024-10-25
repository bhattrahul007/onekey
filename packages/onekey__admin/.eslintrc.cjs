module.exports = {
  extends: ['@onekey/eslint-react-plugin'].map(require.resolve),
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: [
        '*.js',
        '*.cjs',
        'playwright.config.ts',
        'playwright.bail.config.ts',
        'bin-cks.cjs',
        'bin-esm.mjs',
        'esm-loader.mjs',
        'esm-loader-playwright.mjs',
        '*.json',
        '*.md',
        '*.yml',
        '*.yaml',
      ],
    },
    {
      files: ['*.e2e.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
    {
      files: ['main.tsx'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
  parserOptions: {
    project: ['./tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
};
