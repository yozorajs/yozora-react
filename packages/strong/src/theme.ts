import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `strong` theme
 */
export interface YozoraStrongTheme {
  /**
   * Strong font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
  /**
   * Strong font size
   * @default 'inherit'
   */
  fontSize?: CSSProperties['fontSize']
  /**
   * Strong font weight
   * @default 600
   */
  fontWeight?: CSSProperties['fontWeight']
  /**
   * Strong font style
   * @default 'inherit'
   */
  fontStyle?: CSSProperties['fontStyle']
}


/**
 * Default yozora `strong` theme
 */
export const defaultStrongTheme: YozoraStrongTheme = {
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: 600,
  fontStyle: 'inherit',
}


/**
 * Get `strong` style
 * @param key
 * @param defaultTheme
 */
export function getStrongStyle(
  key: keyof YozoraStrongTheme,
  defaultTheme: YozoraStrongTheme = defaultStrongTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.strong == null ||
      yozora.strong[key] == null
    ) return defaultTheme[key]
    return yozora.strong[key]
  }
}
