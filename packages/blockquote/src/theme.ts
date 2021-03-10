import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `blockquote` theme
 */
export interface YozoraBlockquoteTheme {
  /**
   * Blockquote padding
   * @default '0.625em 1em'
   */
  padding?: CSSProperties['padding'] | string
  /**
   * Blockquote padding
   * @default 'transparent'
   */
  borderColor?: CSSProperties['borderColor'] | string
  /**
   * Blockquote margin
   * @default '0 0 1.25em'
   */
  margin?: CSSProperties['margin'] | string
  /**
   * Blockquote background
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
  /**
   * Blockquote font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
}

/**
 * Default yozora `blockquote` theme
 */
export const defaultBlockquoteTheme: YozoraBlockquoteTheme = {
  padding: '0.625em 1em',
  borderColor: 'transparent',
  margin: '0 0 1.25em',
  background: 'none',
  color: 'inherit',
}

/**
 * Get `blockquote` style
 * @param key
 * @param defaultTheme
 */
export function getBlockquoteStyle(
  key: keyof YozoraBlockquoteTheme,
  defaultTheme: YozoraBlockquoteTheme = defaultBlockquoteTheme,
): (props: { theme: DefaultTheme }) => YozoraBlockquoteTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.blockquote == null ||
      yozora.blockquote[key] == null
    )
      return defaultTheme[key]
    return yozora.blockquote[key]
  }
}
