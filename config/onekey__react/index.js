module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:security/recommended-legacy',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    './react-config/index.js',
    './jest-config/index.js',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'sonarjs',
    'security',
    'unicorn',
    'promise',
    'react-refresh',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // React Rules

    // TypeScript Rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',

    // sonarjs rules
    'sonarjs/no-nested-conditional': 'off',

    // Import Rules
    'import/order': [
      'off',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-unused-modules': 'error',
    'import/no-deprecated': 'warn',

    // General Rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'sonarjs/cognitive-complexity': ['error', 15],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['vite.config.ts'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
  ignorePatterns: [
    '*.d.ts', // Ignore all .d.ts files
    '*.config.js', // Ignore any .config.js files
    '*.config.ts', // Ignore any .config.ts files
    'env', // Ignore env files
    'dist/', // Ignore dist directory
    'out/', // Ignore out directory
    'node_modules/', // Ignore node_modules directory
    '*.md',
    '*.json',
    '.eslintrc.cjs',
  ],
};
