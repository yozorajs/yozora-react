import ghcConfigs from '@guanghechen/eslint-config'

export default [
  {
    ignores: [
      '**/__tmp__/',
      '**/__test__/cases/',
      '**/doc/',
      '**/example/',
      '**/node_modules/',
      '**/resources/',
    ],
  },
  ...ghcConfigs,
  {
    files: ['**/*.tsx'],
    rules: {
      'react/jsx-curly-spacing': 'off',
    },
  },
  {
    files: [
      'packages/core-react-renderer/src/component/renderer/*.tsx',
      'packages/react-markdown/src/component/renderer/*.tsx',
    ],
    rules: {
      'import/no-named-as-default': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/__test__/*.spec.ts', '**/__test__/*.spec.tsx'],
    rules: {
      'import/no-named-as-default': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-prototype-builtins': 'off',
    },
  },
]
