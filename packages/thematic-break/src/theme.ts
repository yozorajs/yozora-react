import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `thematic-break` theme
 */
export interface YozoraThematicBreakTheme {
  /**
   * Thematic break border color
   * @default 'lightgray'
   */
  borderColor?: CSSProperties['borderColor']
  /**
   * Thematic break outline
   * @default 0
   */
  outline?: CSSProperties['outline']
  /**
   * Thematic break margin
   * @default '1.5em 0'
   */
  margin?: CSSProperties['margin']
}


/**
 * Default yozora `thematic-break` theme
 */
export const defaultThematicBreakTheme: YozoraThematicBreakTheme = {
  borderColor: 'lightgray',
  outline: 0,
  margin: '1.5em 0'
}


/**
 * Get `thematic-break` style
 * @param key
 * @param defaultTheme
 */
export function getThematicBreakStyle(
  key: keyof YozoraThematicBreakTheme,
  defaultTheme: YozoraThematicBreakTheme = defaultThematicBreakTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.thematicBreak == null ||
      yozora.thematicBreak[key] == null
    ) return defaultTheme[key]
    return yozora.thematicBreak[key]
  }
}

