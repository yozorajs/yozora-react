import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `listItem` theme
 */
export interface YozoraListItemTheme {
  /**
   * ListItem padding
   * @default '0'
   */
  padding?: CSSProperties['padding']
  /**
   * ListItem margin
   * @default '0 0 0.25em 0.25em'
   */
  margin?: CSSProperties['margin']
  /**
   * ListItem line height
   * @default inherit
   */
  lineHeight?: CSSProperties['lineHeight']
  /**
   * ListItem font color
   * @default 'inherit'
   */
  color?: CSSProperties['color']
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
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.listItem == null ||
      yozora.listItem[key] == null
    ) return defaultTheme[key]
    return yozora.listItem[key]
  }
}
