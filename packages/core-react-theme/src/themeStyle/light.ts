import type { IThemeColors, IThemeEffects, IThemePalette, IThemeStyle } from '../types'
import { createBreakPoints, createFonts, createSpacing } from './_base'

export const createLightThemeStyle = <T = unknown>(custom: T = {} as T): IThemeStyle<T> => {
  const palette: IThemePalette = {
    primary: '#42a5f5',
    secondary: '#ba68c8',
    info: '#03a9f4',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#ef5350',
  }

  const colors: IThemeColors = {
    background: {
      note: '#fdfdfe',
      info: '#eef9fd',
      success: '#e6f6e6',
      warning: '#fff8e6',
      error: '#ffebec',

      // elements
      blockquote: '#fafaf9',
      code: '#f5f5f5',
      codeHighlight: 'hsla(30deg, 90%, 50%, 0.3)',
      inlineCode: 'hsla(210deg, 15%, 60%, 0.15)',
      tableHead: '#eff0f0',
      tableOddRow: '#fff',
      tableEvenRow: '#f6f8fa',
    },
    border: {
      note: '#d4d5d8',
      info: '#4cb3d4',
      success: '#009400',
      warning: '#e6a700',
      error: '#e13238',

      // elements
      blockquote: '#dfe2e5',
      code: 'hsla(0deg, 0%, 80%, 0.8)',
      codeLineno: 'hsla(0deg, 0%, 80%, 0.8)',
      heading: 'hsla(216deg, 20%, 80%, 0.92)',
      image: '#7a6390',
      table: '#dfe2e5',
      thematicBreak: '#e1e4e8',
    },
    text: {
      // elements
      codeTitle: 'hsla(0deg, 0%, 30%, 0.8)',
      deleted: '#acb2b9',
      heading: '#586069',
      imageTitle: '#808080',
      inlineCode: '#d81848',
      link: '#4682B4',
      math: '#0036a3',
    },
    selection: {
      code: 'hsla(200deg, 30%, 70%, 0.3)',
    },
    caret: {
      code: '#ed6c60',
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
    palette,
    spacing: createSpacing(),
    custom,
  }
}
