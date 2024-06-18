const perfectionistRecommended = require('eslint-plugin-perfectionist/configs/recommended-line-length');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const perfectionist = require('eslint-plugin-perfectionist');
const prettier = require('eslint-plugin-prettier');
const tsEslint = require('typescript-eslint');
const jsdoc = require('eslint-plugin-jsdoc');
// const eslint = require('@eslint/js');
//const { FlatCompat } = require('@eslint/eslintrc');

//const compat = new FlatCompat({
//  baseDirectory: __dirname
//});

const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

const banConstEnum = {
  message: 'Please use non-const enums. This project automatically inlines enums.',
  selector: 'TSEnumDeclaration[const=true]',
};

module.exports = tsEslint.config(
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          'newlines-between': 'never',
          type: 'line-length',
          order: 'desc',
          groups: [],
        },
      ],
      // Enforce the use of 'import type' for importing types
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      // 优先使用 interface 而不是 type
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // most of the codebase are expected to be env agnostic
      'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

      // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // code to indicate intentional type errors, improving code clarity and maintainability.
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      // This rule enforces the preference for using '@ts-expect-error' comments in TypeScript
      'no-restricted-syntax': ['error', banConstEnum],
      'perfectionist/sort-exports': 'off',
      'no-debugger': 'error',
      'sort-imports': 'off',
      // 禁止 == 判断
      eqeqeq: 'error',
    },
    extends: [
      // eslint.configs.recommended,
      tsEslint.configs.base,
      eslintPluginPrettierRecommended,
      perfectionistRecommended,
      jsdoc.configs['flat/recommended'],
    ],
    plugins: {
      // 'import-x': importX,
      perfectionist,
      prettier,
    },
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
  },

  // tests, no restrictions (runs in Node / Vitest with jsdom)
  {
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'no-console': 'off',
    },
    files: ['**/__tests__/**', 'packages/dts-test/**'],
    languageOptions: {
      globals: {},
    },
    plugins: {},
  },

  // JavaScript files
  {
    rules: {
      // We only do `no-unused-vars` checks for js files, TS files are checked by TypeScript itself.
      'no-unused-vars': ['error', { args: 'none', vars: 'all' }],
    },
    files: ['*.js'],
  },
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'jsdoc/require-jsdoc': 'off',
      eqeqeq: 'off',
    },
    files: ['**/__tests__/**'],
  },
  {
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'jsdoc/require-jsdoc': 'off',
      eqeqeq: 'off',
    },
    files: ['**/scripts/**.[jt]s', 'rollup.config.js'],
  },

  // Node scripts
  {
    rules: {
      'no-restricted-syntax': ['error', banConstEnum],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-restricted-globals': 'off',
      'jsdoc/require-jsdoc': 'off',
      'no-console': 'off',
      'no-undef': 'off',
    },
    files: [
      'eslint.config.js',
      'rollup*.config.js',
      'scripts/**',
      './*.{js,ts}',
      'packages/*/*.js',
      '.prettierrc.js',
      'jest.config.js',
      'commitlint.config.js',
    ],
  },

  {
    ignores: [
      '*.sh',
      'node_modules',
      '*.md',
      '*.woff',
      '*.ttf',
      '.vscode',
      '.idea',
      'dist',
      '/public',
      '/docs',
      '.husky',
      '.local',
      '/bin',
      '.eslintrc.js',
      'prettier.config.js',
      '/src/mock/*',
      'coverage',
      '.github',
      'pnpm-lock.yaml',
      '.output',
      '*.d.ts',
      'temp',
      'docs-html',
    ],
  },
);
