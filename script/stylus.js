const fs = require('fs-extra')
const path = require('path')

const stylusDefaultVariableRegex = /^(\$default(?:--([\w-]+?))?__([\w-]+))\s*=/

/**
 * ```
 * $default__color-bg-primary = #fff
 * $default--darken__color-bg-primary = #fff
 * ```
 *
 * ===>
 *
 * ```
 * $color-bg-primary = 'var(--yozora__color-bg-primary, %s)' % ($default__color-bg-primary)
 * $darken__color-bg-primary = 'var(--yozora--darken-color-bg-primary, %s)' % ($default--darken__color-bg-primary)
 * ```
 *
 * @param {string} defaultItem
 * @returns {string}
 */
function createVariableFromDefault(defaultItem) {
  const match = stylusDefaultVariableRegex.exec(defaultItem)
  if (match == null) throw new Error(`Cannot resolve item ${defaultItem}`)
  const [, p1, p2, p3] = match
  if (p2 == null) return `$${p3} = 'var(--yozora__${p3}, %s)' % (${p1})`
  return `$${p2}__${p3} = 'var(--yozora--${p2}-${p3}, %s)' % (${p1})`
}

/**
 * ```
 * $default__color-bg-primary = #fff
 * $default--darken__color-bg-primary = #fff
 * ```
 *
 * ===>
 *
 * ```
 * --yozora__color-bg-primary: $default__color-bg-primary
 * --yozora__color-bg-primary: $default--darken__color-bg-primary
 * ```
 *
 * @param {string} defaultItem
 * @returns {string}
 */
function createMarkdownVariableFromDefault(defaultItem) {
  const match = stylusDefaultVariableRegex.exec(defaultItem)
  if (match == null) throw new Error(`Cannot resolve item ${defaultItem}`)
  const [, p1, , p3] = match
  return `--yozora__${p3}: ${p1}`
}

function createStylusVariables(srcPath, dstPath, encoding = 'utf-8') {
  const contents = fs
    .readFileSync(srcPath, encoding)
    .split(/\n/g)
    .map(x => {
      if (/^\s*$/.test(x)) return ''
      if (/^\s*\$/.test(x)) return createVariableFromDefault(x)
      return x
    })
    .join('\n')
  fs.writeFileSync(dstPath, contents, encoding)
}

function createMarkdownStylusVariables(srcPath, dstPath, theme, encoding = 'utf-8') {
  const contents =
    `.yozora-markdown${theme ? `.yozora-markdown--${theme}` : ''}\n` +
    fs
      .readFileSync(srcPath, encoding)
      .split(/\n/g)
      .map(x => {
        if (/^\s*$/.test(x)) return ''
        if (/^\s*\$/.test(x)) return '  ' + createMarkdownVariableFromDefault(x)
        return '  ' + x
      })
      .join('\n')
  fs.writeFileSync(dstPath, contents, encoding)
}

function scanAndGenerate(dirPath, markdownStylusThemeDirPath) {
  const filenames = fs.readdirSync(dirPath)
  const filenameRegex = /([\w-]+)-default\.styl$/
  for (const filename of filenames) {
    const srcPath = path.join(dirPath, filename)
    const stats = fs.statSync(srcPath)
    if (stats.isFile()) {
      const match = filenameRegex.exec(filename)
      if (match == null) continue

      createStylusVariables(srcPath, path.join(dirPath, match[1] + '.styl'))
      createMarkdownStylusVariables(
        srcPath,
        path.join(markdownStylusThemeDirPath, '_' + match[1] + '.styl'),
        match[1] === 'light' ? '' : match[1],
      )
    } else if (stats.isDirectory()) {
      scanAndGenerate(srcPath, markdownStylusThemeDirPath)
    }
  }
}

scanAndGenerate(
  path.resolve('packages/_shared/src/stylus'),
  path.resolve('packages/react-markdown/src/style'),
)
