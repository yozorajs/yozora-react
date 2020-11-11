import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `paragraph` theme
 */
export interface YozoraParagraphTheme {
  /**
   * Paragraph padding
   * @default 0
   */
  padding?: CSSProperties['padding']
  /**
   * Paragraph margin
   * @default '0 0 1em'
   */
  margin?: CSSProperties['margin']
  /**
   * Paragraph line height
   * @default 2
   */
  lineHeight?: CSSProperties['lineHeight']
  /**
   * Paragraph font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
}


/**
 * Default yozora `paragraph` theme
 */
export const defaultParagraphTheme: YozoraParagraphTheme = {
  padding: 0,
  margin: '0 0 1em',
  lineHeight: 2,
  color: 'inherit',
}


/**
 * Get `paragraph` style
 * @param key
 * @param defaultTheme
 */
export function getParagraphStyle(
  key: keyof YozoraParagraphTheme,
  defaultTheme: YozoraParagraphTheme = defaultParagraphTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.paragraph == null ||
      yozora.paragraph[key] == null
    ) return defaultTheme[key]
    return yozora.paragraph[key]
  }
}
