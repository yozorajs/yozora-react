import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `codeEmbed` theme
 */
export interface YozoraCodeEmbedTheme {
  /**
   * CodeEmbed padding
   * @default '0'
   */
  padding?: CSSProperties['padding'] | string
  /**
   * CodeEmbed border
   * @default 'none'
   */
  border?: CSSProperties['border'] | string
  /**
   * CodeEmbed background
   * @default 'transparent'
   */
  background?: CSSProperties['background'] | string
  /**
   * CodeEmbed color
   * @default 'inherit'
   */
  color?: CSSProperties['background'] | string
  /**
   * CodeEmbed error background
   * @default '#ff5555'
   */
  errorBackground?: CSSProperties['background'] | string
  /**
   * CodeEmbed error color
   * @default '#f8f8f2'
   */
  errorColor?: CSSProperties['color'] | string
  /**
   * CodeEmbed error font-size
   * @default '0.9em'
   */
  errorFontSize?: CSSProperties['fontSize'] | string
  /**
   * CodeEmbed error font-family
   * @default 'Consolas, "Source Code Pro", monospace, sans-serif'
   */
  errorFontFamily?: CSSProperties['fontFamily'] | string
}

/**
 * Default yozora `codeEmbed` theme
 */
export const defaultCodeEmbedTheme: YozoraCodeEmbedTheme = {
  padding: '0',
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  errorBackground: '#ff5555',
  errorColor: '#f8f8f2',
  errorFontSize: '0.9em',
  errorFontFamily: 'Consolas, "Source Code Pro", monospace, sans-serif',
}

/**
 * Get `codeEmbed` style
 * @param key
 * @param defaultTheme
 */
export function getCodeEmbedStyle(
  key: keyof YozoraCodeEmbedTheme,
  defaultTheme: YozoraCodeEmbedTheme = defaultCodeEmbedTheme,
): (props: { theme: DefaultTheme }) => YozoraCodeEmbedTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.codeEmbed == null ||
      yozora.codeEmbed[key] == null
    )
      return defaultTheme[key]
    return yozora.codeEmbed[key]
  }
}
