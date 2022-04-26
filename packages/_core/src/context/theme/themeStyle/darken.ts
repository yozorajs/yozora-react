import type { IThemeColors, IThemeEffects, IThemePalette, IThemeStyle } from '../types'
import { createBreakPoints, createFonts, createSpacing } from './_base'

export const createLightThemeStyle = <T = unknown>(custom: T = {} as T): IThemeStyle<T> => {
  const palette: IThemePalette = {
    primary: '#1565c0',
    secondary: '#7b1fa2',
    info: '#01579b',
    success: '#1b5e20',
    warning: '#e65100',
    error: '#c62828',
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
      table: '#dfe2e5',
    },
    text: {
      primary: '#24292e',
      secondary: '#586069',
      tertiary: '#6a737d',

      // elements
      deleted: '#acb2b9',
      link: '#4682B4',
      imageTitle: '#808080',
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
