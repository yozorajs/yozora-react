import { css } from '@emotion/css'

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
    color: 'var(--color-link)',
    textDecoration: 'none',
    '&:visited': {
      color: 'var(--visited-color-link)',
    },
    '&:hover': {
      color: 'var(--hover-color-link)',
    },
  },
})
