const { tsMonorepoConfig } = require('@guanghechen/jest-config')
const path = require('path')

const baseConfig = tsMonorepoConfig(__dirname)

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '\\.styl$': path.join(__dirname, 'jest.identity-obj-proxy.js'),
  },
  setupFilesAfterEnv: ['<rootDir>/../../jest.setupEnzyme.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: [
    '<rootDir>/index.js',
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['packages/react-code-editor/src/editor.tsx'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 60,
      lines: 90,
      statements: 90,
    },
  },
}
