import { tsMonorepoConfig } from '@guanghechen/jest-config'
import path from 'node:path'
import url from 'node:url'

export default async function () {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const { default: manifest } = await import(path.resolve('package.json'), {
    assert: { type: 'json' },
  })

  const baseConfig = await tsMonorepoConfig(__dirname, {
    useESM: true,
    tsconfigFilepath: path.join(__dirname, 'tsconfig.test.json'),
  })

  return {
    ...baseConfig,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
    collectCoverageFrom: [
      '<rootDir>/index.js',
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: ['packages/react-code-editor/src/editor.tsx'],
    transformIgnorePatterns: ['<rootDir>/../../node_modules/'],
    coverageThreshold: {
      ...coverageMap[manifest.name],
      global: {
        branches: 50,
        functions: 60,
        lines: 90,
        statements: 90,
        ...coverageMap[manifest.name]?.global,
      },
    },
  }
}

const coverageMap = {
  '@yozora/react-admonition': {
    global: {
      functions: 57,
    },
  },
  '@yozora/react-code': {
    global: {
      lines: 89,
      statements: 89,
    },
  },
  '@yozora/react-code-editor': {
    global: {
      lines: 69,
      statements: 69,
    },
  },
  '@yozora/react-code-live': {
    global: {
      branches: 25,
      functions: 55,
    },
  },
}
