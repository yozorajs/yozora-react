import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `inlineMath` theme
 */
export interface YozoraInlineMathTheme {
  /**
   * Inline math padding
   * @default 0
   */
  padding?: CSSProperties['padding']
  /**
   * Inline math border radius
   * @default 'none'
   */
  border?: CSSProperties['border']
  /**
   * Inline math margin
   * @default 0
   */
  margin?: CSSProperties['margin']
  /**
   * Inline math background
   * @default 'none'
   */
  background?: CSSProperties['background']
  /**
   * Inline math color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
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
