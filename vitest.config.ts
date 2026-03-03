import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

interface ICoverageThresholdValue {
  branches?: number
  functions?: number
  lines?: number
  statements?: number
}

interface ICoverageThresholdFile {
  global?: ICoverageThresholdValue
  files?: Record<string, ICoverageThresholdValue>
}

function getPackageDirName(): string {
  const cwd = process.cwd()
  const match = cwd.match(/packages[/\\]([^/\\]+)$/)
  return match ? match[1] : ''
}

function getPackageAliases(): Record<string, string> {
  const aliases: Record<string, string> = {}
  const packagesDir = path.resolve(__dirname, 'packages')

  if (!fs.existsSync(packagesDir)) return aliases

  const packageDirs = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const dir of packageDirs) {
    const packageRoot = path.resolve(packagesDir, dir)
    const manifestPath = path.resolve(packageRoot, 'package.json')
    const srcPath = path.resolve(packageRoot, 'src')
    if (!fs.existsSync(manifestPath) || !fs.existsSync(srcPath)) continue

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    const packageName = manifest.name
    if (typeof packageName === 'string' && packageName.length > 0) {
      aliases[packageName] = srcPath
    }
  }

  return aliases
}

function loadCoverageThresholds(): Record<string, ICoverageThresholdValue | number> | undefined {
  const packageDir = getPackageDirName()
  if (!packageDir) {
    return undefined
  }

  const thresholdPath = path.resolve(__dirname, 'packages', packageDir, 'coverage.thresholds.json')
  if (!fs.existsSync(thresholdPath)) {
    return undefined
  }

  const thresholdFile: ICoverageThresholdFile = JSON.parse(fs.readFileSync(thresholdPath, 'utf-8'))
  const globalThresholds = thresholdFile.global ?? {}
  const fileThresholds = thresholdFile.files ?? {}

  return {
    ...globalThresholds,
    ...Object.fromEntries(
      Object.entries(fileThresholds).map(([filePath, thresholds]) => [filePath, thresholds]),
    ),
  }
}

function getOtherPackageExcludes(): string[] {
  const packagesDir = path.resolve(__dirname, 'packages')
  const currentPackage = getPackageDirName()
  if (!currentPackage || !fs.existsSync(packagesDir)) return []

  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== currentPackage)
    .map(dirent => `${path.resolve(packagesDir, dirent.name, 'src')}/**`)
}

const packageDir = getPackageDirName()
const coverageThresholds = loadCoverageThresholds()

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: packageDir
      ? ['__test__/**/*.spec.{ts,tsx}']
      : ['packages/*/__test__/**/*.spec.{ts,tsx}'],
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    globals: true,
    coverage: {
      provider: 'v8',
      include: packageDir ? ['src/**/*.{ts,tsx}'] : ['packages/*/src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/__test__/**',
        'src/editor.tsx',
        'packages/react-code-editor/src/editor.tsx',
        ...getOtherPackageExcludes(),
      ],
      ...(coverageThresholds ? { thresholds: coverageThresholds } : {}),
    },
  },
  resolve: {
    alias: {
      ...getPackageAliases(),
    },
  },
})
