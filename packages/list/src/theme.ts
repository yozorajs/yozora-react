import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `list` theme
 */
export interface YozoraListTheme {
  /**
   * List padding
   * @default '0 0 0 1.2em'
   */
  padding?: CSSProperties['padding']
  /**
   * List margin
   * @default '0 0 1em'
   */
  margin?: CSSProperties['margin']
  /**
   * List line height
   * @default 2
   */
  lineHeight?: CSSProperties['lineHeight']
  /**
   * List font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
}


/**
 * Default yozora `list` theme
 */
export const defaultListTheme: YozoraListTheme = {
  padding: '0 0 0 1.2em',
  margin: '0 0 1em',
  lineHeight: 2,
  color: 'inherit',
}


/**
 * Get `list` style
 * @param key
 * @param defaultTheme
 */
export function getListStyle(
  key: keyof YozoraListTheme,
  defaultTheme: YozoraListTheme = defaultListTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.list == null ||
      yozora.list[key] == null
    ) return defaultTheme[key]
    return yozora.list[key]
  }
}
