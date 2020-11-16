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
   * CodeLive preview padding
   * @default '0.5rem'
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
  /**
   * CodeLive error background
   * @default '#ff5555'
   */
  errorBackground?: CSSProperties['background'] | string
  /**
   * CodeLive error color
   * @default '#f8f8f2'
   */
  errorColor?: CSSProperties['color'] | string
  /**
   * CodeLive error font-size
   * @default '0.9em'
   */
  errorFontSize?: CSSProperties['fontSize'] | string
  /**
   * CodeLive error font-family
   * @default 'Consolas, "Source Code Pro", monospace, sans-serif'
   */
  errorFontFamily?: CSSProperties['fontFamily'] | string
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
  previewPadding: '0.5rem',
  previewBorder: 'none',
  previewBackground: '#fff',
  previewColor: '#000',
  errorBackground: '#ff5555',
  errorColor: '#f8f8f2',
  errorFontSize: '0.9em',
  errorFontFamily: 'Consolas, "Source Code Pro", monospace, sans-serif',
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

