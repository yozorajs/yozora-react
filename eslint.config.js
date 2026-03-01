import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import { importX } from 'eslint-plugin-import-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const tsconfigPath = './tsconfig.test.json'

export default [
  {
    ignores: [
      '.vscode/',
      '**/__tmp__/',
      '**/__test__/fixtures/',
      '**/__test__/cases/',
      '**/coverage/',
      '**/doc/',
      '**/example/',
      '**/lib/',
      '**/node_modules/',
      '**/resources/',
      '**/script/fixtures/',
    ],
  },
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  {
    rules: {
      'array-callback-return': 'warn',
      eqeqeq: ['warn', 'smart'],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-console': 'off',
      'no-param-reassign': ['error', { props: true }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-return-assign': ['error', 'always'],
      'no-template-curly-in-string': 'warn',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: tsconfigPath,
      },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'generic' }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: true },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'no-public', parameterProperties: 'no-public' },
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true, ignoreVoidOperator: true },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksConditionals: true, checksVoidReturn: true },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/prefer-enum-initializers': 'error',
    },
  },
  {
    rules: {
      'import-x/first': 'error',
      'import-x/no-cycle': ['error', { ignoreExternal: true }],
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import-x/no-self-import': 'error',
      'import-x/no-unresolved': 'off',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], 'internal', 'parent', 'sibling'],
          'newlines-between': 'never',
        },
      ],
    },
  },
  {
    files: [
      'packages/core-react-renderer/src/component/renderer/*.tsx',
      'packages/react-markdown/src/component/renderer/*.tsx',
    ],
    rules: {
      'import-x/no-named-as-default': 'off',
    },
  },
  {
    files: ['**/__test__/**/*.ts', '**/__test__/**/*.tsx'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-named-as-default': 'off',
      'no-plusplus': 'off',
      'no-prototype-builtins': 'off',
      'no-template-curly-in-string': 'off',
    },
  },
  {
    files: ['script/**/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['eslint.config.js', 'rollup.config.mjs', 'vitest.config.ts'],
    rules: {
      'import-x/no-anonymous-default-export': 'off',
    },
  },
  eslintConfigPrettier,
]
