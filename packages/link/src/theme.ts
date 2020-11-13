import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `link` theme
 */
export interface YozoraLinkTheme {
  /**
   * Link font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
  /**
   * Link font size
   * @default 'inherit'
   */
  fontSize?: CSSProperties['fontSize'] | string
  /**
   * Link font style
   * @default 'inherit'
   */
  fontStyle?: CSSProperties['fontStyle'] | string
  /**
   * Link text decoration
   * @default 'none'
   */
  textDecoration?: CSSProperties['textDecoration'] | string
}


/**
 * Default yozora `link` theme
 */
export const defaultLinkTheme: YozoraLinkTheme = {
  color: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  textDecoration: 'none',
}


/**
 * Get `link` style
 * @param key
 * @param defaultTheme
 */
export function getLinkStyle(
  key: keyof YozoraLinkTheme,
  defaultTheme: YozoraLinkTheme = defaultLinkTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.link == null ||
      yozora.link[key] == null
    ) return defaultTheme[key]
    return yozora.link[key]
  }
}
