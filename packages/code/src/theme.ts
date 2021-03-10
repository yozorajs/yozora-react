import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `code` theme
 */
export interface YozoraCodeTheme {
  /**
   * Block code padding
   * @default 0
   */
  padding?: CSSProperties['padding'] | string
  /**
   * Block code border radius
   * @default 'none'
   */
  border?: CSSProperties['border'] | string
  /**
   * Block code margin
   * @default 0
   */
  margin?: CSSProperties['margin'] | string
  /**
   * @default 1.33
   */
  lineHeight?: CSSProperties['lineHeight'] | string
  /**
   * Block code background
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
  /**
   * Code font-family
   * @default 'Consolas, "Source Code Pro", monospace, sans-serif'
   */
  fontFamily?: CSSProperties['fontFamily'] | string
  /**
   * Block code selection background
   * @default 'none'
   */
  selectionBackground?: CSSProperties['background'] | string
}

/**
 * Default yozora `code` theme
 */
export const defaultCodeTheme: YozoraCodeTheme = {
  padding: 0,
  border: 'none',
  margin: 0,
  lineHeight: 1.33,
  background: 'none',
  fontFamily: 'Consolas, "Source Code Pro", monospace, sans-serif',
  selectionBackground: 'none',
}

/**
 * Get `code` style
 * @param key
 * @param defaultTheme
 */
export function getCodeStyle(
  key: keyof YozoraCodeTheme,
  defaultTheme: YozoraCodeTheme = defaultCodeTheme,
): (props: { theme: DefaultTheme }) => YozoraCodeTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (yozora == null || yozora.code == null || yozora.code[key] == null)
      return defaultTheme[key]
    return yozora.code[key]
  }
}
