const path = require('path')
const { compilerOptions } = require('./tsconfig')

const moduleNameMapper = {}
for (const moduleName of Object.getOwnPropertyNames(compilerOptions.paths)) {
  const paths = compilerOptions.paths[moduleName].map(p =>
    path.resolve(__dirname, p),
  )
  let pattern = '^' + moduleName.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&') + '$'
  moduleNameMapper[pattern] = paths.length === 1 ? paths[0] : paths
}

module.exports = {
  bail: true,
  verbose: true,
  testEnvironment: 'jsdom',
  errorOnDeprecated: true,
  roots: ['<rootDir>/src', '<rootDir>/__test__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    ...moduleNameMapper,
    '\\.styl$': path.join(__dirname, 'jest.identity-obj-proxy.js'),
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../../jest.setupEnzyme.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost/',
  testRegex: '/(__test__)/[^/]+\\.spec\\.tsx?$',
  testPathIgnorePatterns: ['/coverage/', '/lib/', '/node_modules/'],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/index.js',
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['packages/code-editor/src/editor.tsx'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 60,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['lcov', 'text', 'text-summary'],
}
