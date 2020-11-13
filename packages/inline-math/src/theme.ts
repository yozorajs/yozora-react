import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `inlineMath` theme
 */
export interface YozoraInlineMathTheme {
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
 * Default yozora `inlineMath` theme
 */
export const defaultInlineMathTheme: YozoraInlineMathTheme = {
  padding: 0,
  border: 'none',
  margin: 0,
  background: 'none',
  color: 'inherit',
}


/**
 * Get `inlineMath` style
 * @param key
 * @param defaultTheme
 */
export function getInlineMathStyle(
  key: keyof YozoraInlineMathTheme,
  defaultTheme: YozoraInlineMathTheme = defaultInlineMathTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.inlineMath == null ||
      yozora.inlineMath[key] == null
    ) return defaultTheme[key]
    return yozora.inlineMath[key]
  }
}
