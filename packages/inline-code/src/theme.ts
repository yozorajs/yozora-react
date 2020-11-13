import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `inlineCode` theme
 */
export interface YozoraInlineCodeTheme {
  /**
   * Inline code padding
   * @default '4px'
   */
  padding?: CSSProperties['padding'] | string
  /**
   * Inline code border radius
   * @default '2px'
   */
  borderRadius?: CSSProperties['borderRadius'] | string
  /**
   * Inline code margin
   * @default 0
   */
  margin?: CSSProperties['margin'] | string
  /**
   * Inline code background
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
  /**
   * Inline code line height
   * @default 1.375
   */
  lineHeight?: CSSProperties['lineHeight'] | string
  /**
   * Inline code font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
  /**
   * Inline code font family
   * @default 'Consolas, monospace, sans-serif'
   */
  fontFamily?: CSSProperties['fontFamily'] | string
  /**
   * Inline code font size
   * @default '1em'
   */
  fontSize?: CSSProperties['fontSize'] | string
  /**
   * Inline code font weight
   * @default 'inherit'
   */
  fontWeight?: CSSProperties['fontWeight'] | string
  /**
   * Inline code font style
   * @default 'inherit'
   */
  fontStyle?: CSSProperties['fontStyle'] | string
  /**
   * Inline code white-space
   * @default 'normal'
   */
  whiteSpace?: CSSProperties['whiteSpace'] | string
}


/**
 * Default yozora `inlineCode` theme
 */
export const defaultInlineCodeTheme: YozoraInlineCodeTheme = {
  padding: '4px',
  borderRadius: '2px',
  margin: 0,
  background: 'none',
  lineHeight: 1.375,
  color: 'inherit',
  fontFamily: 'Consolas, monospace, sans-serif',
  fontSize: '1em',
  fontWeight: 'inherit',
  fontStyle: 'inherit',
  whiteSpace: 'normal',
}


/**
 * Get `inlineCode` style
 * @param key
 * @param defaultTheme
 */
export function getInlineCodeStyle(
  key: keyof YozoraInlineCodeTheme,
  defaultTheme: YozoraInlineCodeTheme = defaultInlineCodeTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.inlineCode == null ||
      yozora.inlineCode[key] == null
    ) return defaultTheme[key]
    return yozora.inlineCode[key]
  }
}
