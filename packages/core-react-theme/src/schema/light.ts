import type { IThemeColors } from '../types/colors'
import type { IThemeEffects } from '../types/effects'
import type { IThemeStyles } from '../types/themeStyles'
import { createBreakpoints } from '../util/breakpoints'
import { createFonts } from '../util/fonts'
import { createSpacing } from '../util/spacing'

export const createLightThemeStyle = (): IThemeStyles => {
  const colors: IThemeColors = {
    background: {
      note: '#fdfdfe',
      info: '#eef9fd',
      success: '#e6f6e6',
      warning: '#fff8e6',
      error: '#ffebec',
      body: 'none',

      blockquote: 'none',
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

      blockquote: '#dadde1',
      code: 'hsla(0deg, 0%, 80%, 0.8)',
      codeLineno: 'hsla(0deg, 0%, 80%, 0.8)',
      heading: 'hsla(0deg, 0%, 80%, 1)',
      image: '#7a6390',
      table: '#dfe2e5',
      thematicBreak: '#e1e4e8',
    },
    text: {
      note: '#474748',
      info: '#474748',
      success: '#474748',
      warning: '#474748',
      error: '#474748',
      body: 'hsl(0deg, 0%, 60%)',

      codeCaret: '#ed6c60',
      codeSelection: 'hsla(200deg, 30%, 70%, 0.3)',
      codeTitle: 'hsla(0deg, 0%, 30%, 0.8)',
      delete: '#acb2b9',
      heading: 'hsl(0deg, 0%, 25%)',
      imageTitle: '#808080',
      inlineCode: '#d81848',
      link: '#4682B4',
      math: 'hsl(220deg, 100%, 30%)',
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
    breakpoints: createBreakpoints(),
    colors,
    effects,
    fonts: createFonts(),
    spacing: createSpacing(),
  }
}
