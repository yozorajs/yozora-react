import type { IThemeBreakpoint, IThemeBreakpoints, IThemeFonts, IThemeSpacing } from '../types'

export const createBreakPoints = (
  points: [xs: number, sm: number, md: number, lg: number, xl: number] = [0, 600, 900, 1200, 1536],
): IThemeBreakpoints => {
  const breakPoint = (size: number, largerSize: number | undefined): IThemeBreakpoint => {
    const exact: string = largerSize
      ? `(min-width: ${size}px) and (max-width: ${largerSize - 1}px)`
      : `(min-width: ${size}px)`
    const exactOrMinus = largerSize ? `(max-width: ${largerSize - 1}px)` : `(min-width: 0px)`
    const exactOrPlus = `(min-width: ${size}px)`
    return { exact, exactOrMinus, exactOrPlus }
  }

  const [xs = 0, sm = 600, md = 900, lg = 1200, xl = 1536] = points
  return {
    xs: breakPoint(xs, sm),
    sm: breakPoint(sm, md),
    md: breakPoint(md, lg),
    lg: breakPoint(lg, xl),
    xl: breakPoint(xl, undefined),
  }
}

export const createFonts = (): IThemeFonts => ({
  family: {
    code: `Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif`,
    heading: `'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif`,
    body: `'PingFang SC', miui, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif`,
  },
  size: {
    code: 'min(1rem 18px)',
  },
})

export const createSpacing = (): IThemeSpacing => ({
  margin: {
    blockNode: '0 0 1.25em 0',
    emphasis: '0 6px 0 2px',
    thematicBreak: '1.5em 0',
  },
})
