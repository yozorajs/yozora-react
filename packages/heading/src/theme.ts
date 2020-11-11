import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `heading` theme
 */
export interface YozoraHeadingTheme {
  /**
   * Heading padding
   * @default '0 2em'
   */
  padding?: CSSProperties['padding']
  /**
   * Heading border color
   * @default 'lightgray'
   */
  borderColor?: CSSProperties['borderColor']
  /**
   * Heading margin
   * @default '1.2em -2em 1em'
   */
  margin?: CSSProperties['margin']
  /**
   * Heading line height
   * @default 1.25
   */
  lineHeight?: CSSProperties['lineHeight']
  /**
   * Heading font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
  /**
   * Heading font family
   * @default 'inherit'
   */
  fontFamily?: CSSProperties['fontFamily']
  /**
   * Heading font style
   * @default 'normal'
   */
  fontStyle?: CSSProperties['fontStyle']
  /**
   * Heading level 1 font size
   * @default '2em'
   */
  h1FontSize?: CSSProperties['fontSize']
  /**
   * Heading level 2 font size
   * @default '1.5rem'
   */
  h2FontSize?: CSSProperties['fontSize']
  /**
   * Heading level 3 font size
   * @default '1.25em'
   */
  h3FontSize?: CSSProperties['fontSize']
  /**
   * Heading level 4 font size
   * @default '1em'
   */
  h4FontSize?: CSSProperties['fontSize']
  /**
   * Heading level 5 font size
   * @default '0.875em'
   */
  h5FontSize?: CSSProperties['fontSize']
  /**
   * Heading level 6 font size
   * @default '0.85em'
   */
  h6FontSize?: CSSProperties['fontSize']
  /**
   * Heading link color
   * @default undefined
   */
  linkColor?: CSSProperties['color']
  /**
   * Heading link color when hover
   * @default undefined
   */
  hoverLinkColor?: CSSProperties['color']
}


/**
 * Default yozora `heading` theme
 */
export const defaultHeadingTheme: YozoraHeadingTheme = {
  color: 'inherit',
  padding: '0 2em',
  borderColor: 'lightgray',
  margin: '1.2em -2em 1em',
  lineHeight: 1.25,
  fontFamily: 'inherit',
  fontStyle: 'normal',
  h1FontSize: '2em',
  h2FontSize: '1.5em',
  h3FontSize: '1.25em',
  h4FontSize: '1em',
  h5FontSize: '0.875em',
  h6FontSize: '0.85em',
  linkColor: undefined,
  hoverLinkColor: undefined,
}


/**
 * Get `heading` style
 * @param key
 * @param defaultTheme
 */
export function getHeadingStyle(
  key: keyof YozoraHeadingTheme,
  defaultTheme: YozoraHeadingTheme = defaultHeadingTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.heading == null ||
      yozora.heading[key] == null
    ) return defaultTheme[key]
    return yozora.heading[key]
  }
}
