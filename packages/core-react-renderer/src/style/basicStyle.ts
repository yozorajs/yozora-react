import { css } from '@emotion/css'
import { tokens } from '@yozora/core-react-theme'

export const basicStyle: string = css({
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  '& ::-webkit-scrollbar': {
    width: 4,
    height: 4,
  },
  '& ::-webkit-scrollbar-corner': {
    display: 'none',
  },
  '& ::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '& ::-webkit-scrollbar-thumb': {
    border: '3px solid hsl(0, 0%, 50%)',
    background: 'hsl(0, 0%, 60%)',
    borderRadius: '4px',

    '&:hover': {
      borderColor: 'hsl(0, 0%, 70%)',
    },
  },
  a: {
    color: tokens.colorLink,
    textDecoration: 'none',
    '&:visited': {
      color: tokens.colorLinkVisit,
    },
    '&:hover': {
      color: tokens.colorLinkHover,
    },
  },
})
