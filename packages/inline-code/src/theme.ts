import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `inline-code` theme
 */
export interface YozoraInlineCodeTheme {
  /**
   * Inline code padding
   * @default '4px'
   */
  padding?: CSSProperties['padding']
  /**
   * Inline code border radius
   * @default '2px'
   */
  borderRadius?: CSSProperties['borderRadius']
  /**
   * Inline code margin
   * @default 0
   */
  margin?: CSSProperties['margin']
  /**
   * Inline code background
   * @default 'none'
   */
  background?: CSSProperties['background']
  /**
   * Inline code line height
   * @default 1.375
   */
  lineHeight?: CSSProperties['lineHeight']
  /**
   * Inline code font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
  /**
   * Inline code font family
   * @default 'Consolas, monospace, sans-serif'
   */
  fontFamily?: CSSProperties['fontFamily']
  /**
   * Inline code font size
   * @default '1em'
   */
  fontSize?: CSSProperties['fontSize']
  /**
   * Inline code font weight
   * @default 'inherit'
   */
  fontWeight?: CSSProperties['fontWeight']
  /**
   * Inline code font style
   * @default 'inherit'
   */
  fontStyle?: CSSProperties['fontStyle']
  /**
   * Inline code white-space
   * @default 'normal'
   */
  whiteSpace?: CSSProperties['whiteSpace']
}


/**
 * Default yozora `inline-code` theme
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
 * Get `inline-code` style
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
