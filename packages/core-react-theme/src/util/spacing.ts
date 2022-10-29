import type { IThemeSpacing } from '../types/spacing'

export const createSpacing = (): IThemeSpacing => ({
  margin: {
    blockNode: '0 0 1.25em 0',
    emphasis: '0 6px 0 2px',
    thematicBreak: '1.5em 0',
  },
})
