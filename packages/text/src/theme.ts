import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `text` theme
 */
export interface YozoraTextTheme {
  /**
   * Text line height
   * @default 'inherit'
   */
  lineHeight?: CSSProperties['lineHeight']
}


/**
 * Default yozora `text` theme
 */
export const defaultTextTheme: YozoraTextTheme = {
  lineHeight: 'inherit',
}


/**
 * Get `text` style
 * @param key
 * @param defaultTheme
 */
export function getTextStyle(
  key: keyof YozoraTextTheme,
  defaultTheme: YozoraTextTheme = defaultTextTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.text == null ||
      yozora.text[key] == null
    ) return defaultTheme[key]
    return yozora.text[key]
  }
}

