import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `table` theme
 */
export interface YozoraTableTheme {
  /**
   * Table width
   * @default 'max-content'
   */
  width?: CSSProperties['width'] | string
  /**
   * Table overflow
   * @default 'auto'
   */
  overflow?: CSSProperties['overflow'] | string
  /**
   * Table margin
   * @default '0 0 1em'
   */
  margin?: CSSProperties['margin'] | string
  /**
   * Table border spacing
   * @default 0
   */
  borderSpacing?: CSSProperties['borderSpacing'] | string
  /**
   * Table border collapse
   * @default 'collapse'
   */
  borderCollapse?: CSSProperties['borderCollapse'] | string
}


/**
 * Default yozora `table` theme
 */
export const defaultTableTheme: YozoraTableTheme = {
  width: 'max-content',
  overflow: 'auto',
  margin: '0 0 1em',
  borderSpacing: 0,
  borderCollapse: 'collapse',
}


/**
 * Get `table` style
 * @param key
 * @param defaultTheme
 */
export function getTableStyle(
  key: keyof YozoraTableTheme,
  defaultTheme: YozoraTableTheme = defaultTableTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.table == null ||
      yozora.table[key] == null
    ) return defaultTheme[key]
    return yozora.table[key]
  }
}
