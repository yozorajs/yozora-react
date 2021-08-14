const fs = require('fs-extra')
const path = require('path')

function createFromDefault(defaultItem) {
  const stylusDefaultVariableRegex =
    /^(\$default(?:--([\w\-]+?))?__([\w\-]+))\s*=/
  const match = stylusDefaultVariableRegex.exec(defaultItem)
  if (match == null) throw new Error(`Cannot resolve item ${defaultItem}`)
  const [, p1, p2, p3] = match
  if (p2 == null) return `$${p3} = 'var(--yozora__${p3}, %s)' % (${p1})`
  return `$${p2}__${p3} = 'var(--yozora--${p2}-${p3}, %s)' % (${p1})`
}

function createStylusVariables(srcPath, dstPath, encoding = 'utf-8') {
  const contents = fs
    .readFileSync(srcPath, encoding)
    .split(/\n/g)
    .map(x => {
      if (/^\s*\$/.test(x)) return createFromDefault(x)
      return x
    })
    .join('\n')
  fs.writeFileSync(dstPath, contents, encoding)
}

function scanAndGenerate(dirPath) {
  const filenames = fs.readdirSync(dirPath)
  const filenameRegex = /([\w-]+)-default\.styl$/
  for (const filename of filenames) {
    const srcPath = path.join(dirPath, filename)
    const stats = fs.statSync(srcPath)
    if (stats.isFile()) {
      const match = filenameRegex.exec(filename)
      if (match == null) continue
      const dstPath = path.join(dirPath, match[1] + '.styl')
      createStylusVariables(srcPath, dstPath)
    } else if (stats.isDirectory()) {
      scanAndGenerate(srcPath)
    }
  }
}

scanAndGenerate(path.resolve('packages/_shared/src/stylus'))
