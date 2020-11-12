import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `tableCell` theme
 */
export interface YozoraTableCellTheme {
  /**
   * TableCell padding
   * @default '0.4rem 0.8rem'
   */
  padding?: CSSProperties['padding']
  /**
   * Background of even cells
   * @default 'transparent'
   */
  borderColor?: CSSProperties['borderColor']
}


/**
 * Default yozora `tableCell` theme
 */
export const defaultTableCellTheme: YozoraTableCellTheme = {
  padding: '0.4rem 0.8rem',
  borderColor: 'transparent',
}


/**
 * Get `tableCell` style
 * @param key
 * @param defaultTheme
 */
export function getTableCellStyle(
  key: keyof YozoraTableCellTheme,
  defaultTheme: YozoraTableCellTheme = defaultTableCellTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.tableCell == null ||
      yozora.tableCell[key] == null
    ) return defaultTheme[key]
    return yozora.tableCell[key]
  }
}
