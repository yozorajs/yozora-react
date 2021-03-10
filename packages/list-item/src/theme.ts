import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `listItem` theme
 */
export interface YozoraListItemTheme {
  /**
   * ListItem padding
   * @default '0'
   */
  padding?: CSSProperties['padding'] | string
  /**
   * ListItem margin
   * @default '0 0 0.25em 0.25em'
   */
  margin?: CSSProperties['margin'] | string
  /**
   * ListItem line height
   * @default inherit
   */
  lineHeight?: CSSProperties['lineHeight'] | string
  /**
   * ListItem font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
}

/**
 * Default yozora `listItem` theme
 */
export const defaultListItemTheme: YozoraListItemTheme = {
  padding: 0,
  margin: '0 0 0.25em 0.25em',
  lineHeight: 'inherit',
  color: 'inherit',
}

/**
 * Get `listItem` style
 * @param key
 * @param defaultTheme
 */
export function getListItemStyle(
  key: keyof YozoraListItemTheme,
  defaultTheme: YozoraListItemTheme = defaultListItemTheme,
): (props: { theme: DefaultTheme }) => YozoraListItemTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.listItem == null ||
      yozora.listItem[key] == null
    )
      return defaultTheme[key]
    return yozora.listItem[key]
  }
}
