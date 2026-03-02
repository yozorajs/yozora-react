#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT_DIR = path.resolve(import.meta.dirname, '..')
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages')

const SEMVER = String.raw`\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?`
const GITHUB_URL_PATTERN = new RegExp(
  String.raw`(github\.com/yozorajs/yozora-react/tree/)(@[\w-]+/[\w-]+@)(${SEMVER})`,
  'g',
)

async function getPackages() {
  const entries = await fs.readdir(PACKAGES_DIR, { withFileTypes: true })
  const packages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const pkgJsonPath = path.join(PACKAGES_DIR, entry.name, 'package.json')
    try {
      const content = await fs.readFile(pkgJsonPath, 'utf8')
      const pkg = JSON.parse(content)
      packages.push({
        dir: entry.name,
        name: pkg.name,
        version: pkg.version,
      })
    } catch (err) {
      console.warn(`Warning: failed to read ${pkgJsonPath}: ${err.message}`)
    }
  }

  return packages
}

function createVersionMap(packages) {
  const map = new Map()
  for (const pkg of packages) {
    map.set(pkg.name, pkg.version)
  }
  return map
}

function updateContent(content, versionMap) {
  return content.replace(GITHUB_URL_PATTERN, (match, prefix, packageWithAt) => {
    const packageName = packageWithAt.slice(0, -1)
    const version = versionMap.get(packageName)
    if (version) {
      return `${prefix}${packageWithAt}${version}`
    }
    return match
  })
}

async function updateFile(filepath, versionMap) {
  try {
    const content = await fs.readFile(filepath, 'utf8')
    const updated = updateContent(content, versionMap)
    if (content !== updated) {
      await fs.writeFile(filepath, updated, 'utf8')
      console.log(`Updated: ${path.relative(ROOT_DIR, filepath)}`)
      return true
    }
    return false
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`Warning: failed to update ${filepath}: ${err.message}`)
    }
    return false
  }
}

const packages = await getPackages()
const versionMap = createVersionMap(packages)

let updatedCount = 0
for (const pkg of packages) {
  const pkgDir = path.join(PACKAGES_DIR, pkg.dir)
  const readmePath = path.join(pkgDir, 'README.md')
  if (await updateFile(readmePath, versionMap)) updatedCount += 1

  const pkgJsonPath = path.join(pkgDir, 'package.json')
  if (await updateFile(pkgJsonPath, versionMap)) updatedCount += 1
}

console.log(`Done. Updated ${updatedCount} file(s).`)
