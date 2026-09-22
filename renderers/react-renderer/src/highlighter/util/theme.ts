import type React from 'react'
import type { IPrismTheme, IThemeDict } from '../types/prism'

const languageMap = {
  js: 'javascript',
  ts: 'typescript',
}

export const themeToDict = (language: string, theme: IPrismTheme): IThemeDict => {
  // biome-ignore lint/style/noParameterAssign: Normalize the language alias before selecting matching theme entries.
  language = languageMap[language as keyof typeof languageMap] ?? language

  const { plain } = theme
  const base: IThemeDict = Object.create(null)
  const themeDict = theme.styles.reduce((acc, themeEntry) => {
    const { types, style, languages } = themeEntry
    if (languages && !languages.includes(language)) return acc

    for (const type of types) {
      const accStyle: React.CSSProperties = { ...acc[type], ...style }
      // biome-ignore lint/style/noParameterAssign: The reducer accumulates styles into its theme dictionary.
      acc[type] = accStyle
    }

    return acc
  }, base)

  themeDict.root = plain
  themeDict.plain = { ...plain, backgroundColor: undefined }
  return themeDict
}
