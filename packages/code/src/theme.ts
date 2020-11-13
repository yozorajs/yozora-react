import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `code` theme
 */
export interface YozoraCodeTheme {
  /**
   * Inline math padding
   * @default 0
   */
  padding?: CSSProperties['padding'] | string
  /**
   * Inline math border radius
   * @default 'none'
   */
  border?: CSSProperties['border'] | string
  /**
   * Inline math margin
   * @default 0
   */
  margin?: CSSProperties['margin'] | string
  /**
   * Inline math background
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
}


/**
 * Default yozora `code` theme
 */
export const defaultCodeTheme: YozoraCodeTheme = {
  padding: 0,
  border: 'none',
  margin: 0,
  background: 'none',
}


/**
 * Get `code` style
 * @param key
 * @param defaultTheme
 */
export function getCodeStyle(
  key: keyof YozoraCodeTheme,
  defaultTheme: YozoraCodeTheme = defaultCodeTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.code == null ||
      yozora.code[key] == null
    ) return defaultTheme[key]
    return yozora.code[key]
  }
}

