import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `emphasis` theme
 */
export interface YozoraEmphasisTheme {
  /**
   * Emphasis font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
  /**
   * Emphasis font size
   * @default 'inherit'
   */
  fontSize?: CSSProperties['fontSize'] | string
  /**
   * Emphasis font weight
   * @default 'inherit'
   */
  fontWeight?: CSSProperties['fontWeight'] | string
  /**
   * Emphasis font style
   * @default 'italic'
   */
  fontStyle?: CSSProperties['fontStyle'] | string
}

/**
 * Default yozora `emphasis` theme
 */
export const defaultEmphasisTheme: YozoraEmphasisTheme = {
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontStyle: 'italic',
}

/**
 * Get `emphasis` style
 * @param key
 * @param defaultTheme
 */
export function getEmphasisStyle(
  key: keyof YozoraEmphasisTheme,
  defaultTheme: YozoraEmphasisTheme = defaultEmphasisTheme,
): (props: { theme: DefaultTheme }) => YozoraEmphasisTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.emphasis == null ||
      yozora.emphasis[key] == null
    )
      return defaultTheme[key]
    return yozora.emphasis[key]
  }
}
