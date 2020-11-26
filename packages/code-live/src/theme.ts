import type { CSSProperties, DefaultTheme } from 'styled-components'


/**
 * yozora `codeLive` theme
 */
export interface YozoraCodeLiveTheme {
  /**
   * CodeLive margin
   * @default '0 0 1rem'
   */
  margin?: CSSProperties['margin'] | string
  /**
   * CodeLive editor padding
   * @default '0.8rem 0'
   */
  editorPadding?: CSSProperties['padding'] | string
  /**
   * CodeLive editor background
   * @default '#1e1e1e'
   */
  editorBackground?: CSSProperties['background'] | string
  /**
   * CodeLive editor caret-color
   * @default '#aeafad''
   */
  editorCaretColor?: CSSProperties['caretColor'] | string
  /**
   * CodeLive editor font-size
   * @default '1rem'
   */
  editorFontSize?: CSSProperties['fontSize'] | string
  /**
   * CodeLive editor font-family
   * @default 'Consolas, "Source Code Pro", monospace, sans-serif'
   */
  editorFontFamily?: CSSProperties['fontFamily'] | string
  /**
   * CodeLive editor selection background
   * @default 'none'
   */
  editorSelectionBackground?: CSSProperties['background'] | string
  /**
   * CodeLive preview padding
   * @default '0'
   */
  previewPadding?: CSSProperties['padding'] | string
  /**
   * CodeLive preview border
   * @default 'none'
   */
  previewBorder?: CSSProperties['border'] | string
  /**
   * CodeLive preview background
   * @default '#fff'
   */
  previewBackground?: CSSProperties['background'] | string
  /**
   * CodeLive preview color
   * @default '#000'
   */
  previewColor?: CSSProperties['background'] | string
}


/**
 * Default yozora `codeLive` theme
 */
export const defaultCodeLiveTheme: YozoraCodeLiveTheme = {
  margin: '0 0 1rem',
  editorPadding: '0.8rem 0',
  editorBackground: '#1e1e1e',
  editorCaretColor: '#aeafad',
  editorFontSize: '1rem',
  editorFontFamily: 'Consolas, "Source Code Pro", monospace, sans-serif',
  editorSelectionBackground: 'none',
  previewPadding: '0',
  previewBorder: 'none',
  previewBackground: '#fff',
  previewColor: '#000',
}


/**
 * Get `codeLive` style
 * @param key
 * @param defaultTheme
 */
export function getCodeLiveStyle(
  key: keyof YozoraCodeLiveTheme,
  defaultTheme: YozoraCodeLiveTheme = defaultCodeLiveTheme,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: { theme: DefaultTheme }) => {
    const { yozora } = props.theme
    if (
      yozora == null ||
      yozora.codeLive == null ||
      yozora.codeLive[key] == null
    ) return defaultTheme[key]
    return yozora.codeLive[key]
  }
}
