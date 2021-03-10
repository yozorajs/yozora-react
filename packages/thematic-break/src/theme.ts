import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `thematicBreak` theme
 */
export interface YozoraThematicBreakTheme {
  /**
   * Thematic break border color
   * @default 'lightgray'
   */
  borderColor?: CSSProperties['borderColor'] | string
  /**
   * Thematic break outline
   * @default 0
   */
  outline?: CSSProperties['outline'] | string
  /**
   * Thematic break margin
   * @default '1.5em 0'
   */
  margin?: CSSProperties['margin'] | string
}

/**
 * Default yozora `thematicBreak` theme
 */
export const defaultThematicBreakTheme: YozoraThematicBreakTheme = {
  borderColor: 'lightgray',
  outline: 0,
  margin: '1.5em 0',
}

/**
 * Get `thematicBreak` style
 * @param key
 * @param defaultTheme
 */
export function getThematicBreakStyle(
  key: keyof YozoraThematicBreakTheme,
  defaultTheme: YozoraThematicBreakTheme = defaultThematicBreakTheme,
): (props: { theme: DefaultTheme }) => YozoraThematicBreakTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.thematicBreak == null ||
      yozora.thematicBreak[key] == null
    )
      return defaultTheme[key]
    return yozora.thematicBreak[key]
  }
}
