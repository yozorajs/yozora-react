import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const packageDirs = fs
  .globSync('{packages,renderers}/*/package.json', { cwd: __dirname })
  .map(file => path.dirname(path.resolve(__dirname, file)))
const packageDir = packageDirs.includes(process.cwd()) ? process.cwd() : undefined

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

function getPackageAliases(): Record<string, string> {
  const aliases: Record<string, string> = {}
  for (const packageRoot of packageDirs) {
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
  if (!packageDir) {
    return undefined
  }

  const thresholdPath = path.resolve(packageDir, 'coverage.thresholds.json')
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
  if (!packageDir) return []

  return packageDirs.filter(dir => dir !== packageDir).map(dir => `${path.resolve(dir, 'src')}/**`)
}

const coverageThresholds = loadCoverageThresholds()

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: packageDir
      ? ['__test__/**/*.spec.{ts,tsx}']
      : ['{packages,renderers}/*/__test__/**/*.spec.{ts,tsx}'],
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    globals: true,
    coverage: {
      provider: 'v8',
      include: packageDir ? ['src/**/*.{ts,tsx}'] : ['{packages,renderers}/*/src/**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/__test__/**', ...getOtherPackageExcludes()],
      ...(coverageThresholds ? { thresholds: coverageThresholds } : {}),
    },
  },
  resolve: {
    alias: {
      ...getPackageAliases(),
    },
  },
})
