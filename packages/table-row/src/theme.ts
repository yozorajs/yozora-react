import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `tableRow` theme
 */
export interface YozoraTableRowTheme {
  /**
   * Background of table row
   * @default 'none'
   */
  background?: CSSProperties['background'] | string
  /**
   * Background of even rows
   * @default 'none'
   */
  evenBackground?: CSSProperties['background'] | string
}


/**
 * Default yozora `tableRow` theme
 */
export const defaultTableRowTheme: YozoraTableRowTheme = {
  background: 'none',
  evenBackground: 'none',
}


/**
 * Get `tableRow` style
 * @param key
 * @param defaultTheme
 */
export function getTableRowStyle(
  key: keyof YozoraTableRowTheme,
  defaultTheme: YozoraTableRowTheme = defaultTableRowTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.tableRow == null ||
      yozora.tableRow[key] == null
    ) return defaultTheme[key]
    return yozora.tableRow[key]
  }
}
