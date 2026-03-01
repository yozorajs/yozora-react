import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const testFileRegex = /\.spec\.(ts|tsx)$/

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

function hasTestFiles(): boolean {
  const packagesDir = path.resolve(__dirname, 'packages')
  if (!fs.existsSync(packagesDir)) return false

  const packageDirs = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const stack: string[] = packageDirs.map(dir => path.resolve(packagesDir, dir, '__test__'))
  while (stack.length > 0) {
    const current = stack.pop() as string
    if (!fs.existsSync(current)) continue

    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const nextPath = path.resolve(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(nextPath)
      } else if (entry.isFile() && testFileRegex.test(entry.name)) {
        return true
      }
    }
  }

  return false
}

const shouldCheckCoverageThresholds = hasTestFiles()

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['packages/*/__test__/**/*.spec.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/__test__/**',
        'packages/react-code-editor/src/editor.tsx',
      ],
      ...(shouldCheckCoverageThresholds
        ? {
            thresholds: {
              branches: 50,
              functions: 60,
              lines: 90,
              statements: 90,
            },
          }
        : {}),
    },
  },
  resolve: {
    alias: {
      ...getPackageAliases(),
    },
  },
})
