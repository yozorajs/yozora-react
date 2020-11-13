import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `math` theme
 */
export interface YozoraMathTheme {
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
  /**
   * Inline math color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
}


/**
 * Default yozora `math` theme
 */
export const defaultMathTheme: YozoraMathTheme = {
  padding: 0,
  border: 'none',
  margin: 0,
  background: 'none',
  color: 'inherit',
}


/**
 * Get `math` style
 * @param key
 * @param defaultTheme
 */
export function getMathStyle(
  key: keyof YozoraMathTheme,
  defaultTheme: YozoraMathTheme = defaultMathTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.math == null ||
      yozora.math[key] == null
    ) return defaultTheme[key]
    return yozora.math[key]
  }
}
