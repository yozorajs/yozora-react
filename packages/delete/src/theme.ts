import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `delete` theme
 */
export interface YozoraDeleteTheme {
  /**
   * Delete font color
   * @default 'inherit'
   */
  color?: CSSProperties['color'] | string
  /**
   * Delete font size
   * @default 'inherit'
   */
  fontSize?: CSSProperties['fontSize'] | string
  /**
   * Delete font weight
   * @default 'inherit'
   */
  fontWeight?: CSSProperties['fontWeight'] | string
  /**
   * Delete font style
   * @default 'inherit'
   */
  fontStyle?: CSSProperties['fontStyle'] | string
  /**
   * Delete text decoration
   * @default 'line-through'
   */
  textDecoration?: CSSProperties['textDecoration'] | string
}


/**
 * Default yozora `delete` theme
 */
export const defaultDeleteTheme: YozoraDeleteTheme = {
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontStyle: 'inherit',
  textDecoration: 'line-through',
}


/**
 * Get `delete` style
 * @param key
 * @param defaultTheme
 */
export function getDeleteStyle(
  key: keyof YozoraDeleteTheme,
  defaultTheme: YozoraDeleteTheme = defaultDeleteTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.delete == null ||
      yozora.delete[key] == null
    ) return defaultTheme[key]
    return yozora.delete[key]
  }
}