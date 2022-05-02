import type { IThemeColors, IThemeEffects, IThemeStyle } from '../types'
import { createBreakPoints, createFonts, createSpacing } from './_base'

export const createDarkenThemeStyle = <T = unknown>(custom: T = {} as T): IThemeStyle<T> => {
  const colors: IThemeColors = {
    background: {
      note: '#474748',
      info: '#193c47',
      success: '#003100',
      warning: '#4d3800',
      error: '#4b1113',

      // Markdown style
      body: '#18191a',

      // elements
      blockquote: 'inherit',
      code: '#1e1e1e',
      codeHighlight: 'hsla(210deg, 100%, 84%, 0.2)',
      inlineCode: 'hsla(210deg, 15%, 60%, 0.15)',
      tableHead: '#28292a',
      tableOddRow: '#18191a',
      tableEvenRow: '#28292a',
    },
    border: {
      note: '#d4d5d8',
      info: '#4cb3d4',
      success: '#009400',
      warning: '#e6a700',
      error: '#e13238',

      // elements
      blockquote: '#606770',
      code: 'hsla(0deg, 0%, 30%, 0.8)',
      codeLineno: 'hsla(0deg, 0%, 30%, 0.8)',
      heading: 'hsla(216deg, 20%, 80%, 0.92)',
      image: '#7a6390',
      table: '#808080',
      thematicBreak: '#e1e4e8',
    },
    text: {
      note: '#fdfdfe',
      info: '#fdfdfe',
      success: '#fdfdfe',
      warning: '#fdfdfe',
      error: '#fdfdfe',

      // Markdown style
      body: '#f5f6f7',

      // elements
      codeTitle: 'hsla(0deg, 0%, 90%, 0.8)',
      deleted: '#acb2b9',
      heading: '#586069',
      imageTitle: '#808080',
      inlineCode: '#d81848',
      link: '#4682B4',
      math: '#ddd',
    },
    selection: {
      code: 'hsla(200deg, 30%, 70%, 0.3)',
    },
    caret: {
      code: '#aeafad',
    },
  }

  const effects: IThemeEffects = {
    hover: {
      colors: {
        ...colors,
        text: {
          ...colors.text,
          link: '#5c9fd6',
        },
      },
    },
    active: {
      colors: {
        ...colors,
        text: {
          ...colors.text,
          link: '#5c9fd6',
        },
      },
    },
    visited: {
      colors: {
        ...colors,
      },
    },
  }

  return {
    breakpoints: createBreakPoints(),
    colors,
    effects,
    fonts: createFonts(),
    spacing: createSpacing(),
    custom,
  }
}
