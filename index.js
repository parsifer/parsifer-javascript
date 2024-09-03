import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import adonisJSPlugin from '@adonisjs/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin-ts';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * Default list of files to include
 */
export const INCLUDE_LIST = ['**!(resources)/*.ts|js'];

/**
 * Default set of files to ignore
 */
export const IGNORE_LIST = [
  'cdk.out',
  '.cdk.staging',
  'eslint.config.js',
  'eslint.config.ts',
  '*.min.*',
  '*.d.ts',
  'CHANGELOG.md',
  'dist',
  'LICENSE*',
  'output',
  'coverage',
  'temp',
  'build',
  'dist',
  'public/assets',
  'package-lock.json',
  '__snapshots__',
  '!.github',
  '!.vscode',
];

/**
 * Default set of plugins to apply to the config
 */
export const PLUGINS_LIST = {
  '@unicorn': unicorn,
  '@stylistic': stylistic,
  ...eslintPluginPrettierRecommended.plugins,
};

/**
 * Default list of rules to apply
 */
export const RULES_LIST = {
  'semi': ['error', 'always'],
  'arrow-body-style': ['error', 'always'],
  'quotes': ["error", "single", { "avoidEscape": true }],
  'indent': "off",
  'space-before-function-paren': ["error", {
    "anonymous": "always",
    "named": "never",
    "asyncArrow": "always"
  }],
  'no-irregular-whitespace': ['error'],
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'one-var': ['error', 'never'],
  'eol-last': ['error', 'always'],
  'no-cond-assign': ['error', 'except-parens'],
  'comma-dangle': ['error', 'always-multiline'],
  'eqeqeq': ['error', 'always'],
  'new-parens': ['error', 'always'],
  'no-caller': ['error'],
  'no-constant-condition': ['error'],
  'no-control-regex': ['error'],
  'no-debugger': ['error'],
  'no-duplicate-case': ['error'],
  'no-eval': ['error'],
  'no-ex-assign': ['error'],
  'no-extra-boolean-cast': ['error'],
  'no-fallthrough': ['error'],
  'no-inner-declarations': ['error'],
  'no-invalid-regexp': ['error'],
  'no-proto': ['error'],
  'no-shadow': ['off'],
  'no-regex-spaces': ['error'],
  'no-self-compare': ['error'],
  'no-sparse-arrays': ['error'],
  'no-mixed-spaces-and-tabs': ['error'],
  'no-unsafe-negation': ['error'],
  'no-new-wrappers': ['error'],
  'no-self-assign': ['error'],
  'no-this-before-super': ['error'],
  'no-with': ['error'],
  'rest-spread-spacing': ['error', 'never'],
  'no-trailing-spaces': ['error', { ignoreComments: true }],
  'no-undef-init': ['error'],
  'no-unsafe-finally': ['error'],
  'padded-blocks': ['error', 'never'],
  'space-in-parens': ['error', 'never'],
  'use-isnan': ['error'],
  'valid-typeof': ['error', { requireStringLiterals: true }],
  'brace-style': ['error', '1tbs'],
  'curly': ['error', 'multi'],
  'handle-callback-err': ['error', '^(err|error)$'],
  'max-len': [
    'error',
    {
      code: 100,
      comments: 120,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    },
  ],
  'no-array-constructor': ['error'],
  'no-unreachable': ['error'],
  'no-multi-spaces': ['error'],

  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    {
      selector: 'class',
      format: ['PascalCase'],
    },
    {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^I[A-Z]',
        match: false,
      },
    },
  ],

  '@unicorn/prefer-module': 'error',
  '@unicorn/prefer-node-protocol': 'error',
  '@unicorn/filename-case': [
    'error',
    {
      case: 'snakeCase',
    },
  ],
  '@unicorn/no-await-expression-member': 'error',
  '@unicorn/no-for-loop': 'error',
  '@unicorn/no-instanceof-array': 'error',
  '@unicorn/prefer-number-properties': 'error',

  ...eslintPluginPrettierRecommended.rules,

  'prettier/prettier': ['error', { endOfLine: 'auto' }],
};

/**
 * Configures ESLint to use Parsifer's base TypeScript config. You
 * may pass additional config blocks as multiple arguments.
 *
 * @example
 * ```js
 * config()
 *
 * config({
 *   files: [],
 *   ignore: [],
 *   rules: {}
 * })
 * ```
 */
export function config(...configBlocksToMerge) {
  return tseslint.config(
    {
      ignores: IGNORE_LIST,
    },
    tseslint.configs.base,
    {
      name: 'Plugins list',
      plugins: PLUGINS_LIST,
    },
    {
      name: 'Rules',
      files: INCLUDE_LIST,
      rules: RULES_LIST,
    },
    ...configBlocksToMerge
  )
}

/**
 * Configures ESLint to use Parsifer's base TypeScript config tailored
 * for an AdonisJS App. You may pass additional config blocks as multiple
 * arguments.
 *
 * @example
 * ```js
 * config()
 *
 * config({
 *   files: [],
 *   ignore: [],
 *   rules: {}
 * })
 * ```
 */
export function configApp(...configBlocksToMerge) {
  return config(
    {
      name: 'AdonisJS App Defaults',
      plugins: {
        '@adonisjs': adonisJSPlugin
      },
      rules: {
        '@adonisjs/prefer-lazy-controller-import': ['error'],
        '@adonisjs/prefer-lazy-listener-import': ['error'],
      },
    },
    ...configBlocksToMerge
  );
}