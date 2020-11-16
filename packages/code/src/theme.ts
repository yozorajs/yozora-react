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
   * Block code background
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
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
  background: 'none',
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

