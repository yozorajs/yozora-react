import type { CSSProperties, DefaultTheme } from 'styled-components'

/**
 * yozora `tableCell` theme
 */
export interface YozoraTableCellTheme {
  /**
   * TableCell padding
   * @default '0.4rem 0.8rem'
   */
  padding?: CSSProperties['padding'] | string
  /**
   * Background of even cells
   * @default 'transparent'
   */
  borderColor?: CSSProperties['borderColor'] | string
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
): (props: { theme: DefaultTheme }) => YozoraTableCellTheme[typeof key] {
  return props => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.tableCell == null ||
      yozora.tableCell[key] == null
    )
      return defaultTheme[key]
    return yozora.tableCell[key]
  }
}
