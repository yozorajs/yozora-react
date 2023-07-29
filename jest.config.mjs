import { tsMonorepoConfig } from '@guanghechen/jest-config'
import path from 'node:path'
import url from 'node:url'

export default async function () {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const baseConfig = await tsMonorepoConfig(__dirname, {
    useESM: true,
    tsconfigFilepath: path.join(__dirname, 'tsconfig.test.esm.json'),
  })

  const packageDir = path.relative(__dirname, path.resolve()) + '/'
  const config = {
    ...baseConfig,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
    collectCoverageFrom: [
      '<rootDir>/index.js',
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: ['packages/react-code-editor/src/editor.tsx'],
    coverageThreshold: Object.fromEntries(
      [
        [
          'global',
          {
            branches: 50,
            functions: 60,
            lines: 90,
            statements: 90,
          },
        ],
        [
          'packages/react-admonition/src/icons.tsx',
          {
            functions: 50,
          },
        ],
        [
          'packages/react-code/src/component.tsx',
          {
            lines: 80,
            statements: 80,
          },
        ],
        [
          'packages/react-code-editor/src/component/SimpleCodeEditor.tsx',
          {
            branches: 60,
            functions: 50,
            lines: 42,
            statements: 40,
          },
        ],
        [
          'packages/react-code-live/src/component.tsx',
          {
            branches: 25,
          },
        ],
      ]
        .filter(([p]) => !p.startsWith('packages/') || p.startsWith(packageDir))
        .map(([p, val]) => (p.startsWith(packageDir) ? [path.join(__dirname, p), val] : [p, val])),
    ),
  }
  return config
}
