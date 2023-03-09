import type React from 'react'
import type { IPrismTheme, IThemeDict } from '../types/prism'

const languageMap = {
  js: 'javascript',
  ts: 'typescript',
}

export const themeToDict = (language: string, theme: IPrismTheme): IThemeDict => {
  // eslint-disable-next-line no-param-reassign
  language = languageMap[language] ?? language

  const { plain } = theme
  const base: IThemeDict = Object.create(null)
  const themeDict = theme.styles.reduce((acc, themeEntry) => {
    const { types, style, languages } = themeEntry
    if (languages && !languages.includes(language)) return acc

    for (const type of types) {
      const accStyle: React.CSSProperties = { ...acc[type], ...style }
      // eslint-disable-next-line no-param-reassign
      acc[type] = accStyle
    }

    return acc
  }, base)

  themeDict.root = plain
  themeDict.plain = { ...plain, backgroundColor: undefined }
  return themeDict
}
