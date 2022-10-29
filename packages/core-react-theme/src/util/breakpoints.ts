import type { IThemeBreakpoint, IThemeBreakpoints } from '../types/breakpoints'

export const createBreakpoints = (
  points: [xs: number, sm: number, md: number, lg: number, xl: number] = [0, 768, 992, 1200, 1536],
): IThemeBreakpoints => {
  const [xs = 0, sm = 768, md = 992, lg = 1200, xl = 1536] = points
  return {
    xs: breakpoint(xs, sm),
    sm: breakpoint(sm, md),
    md: breakpoint(md, lg),
    lg: breakpoint(lg, xl),
    xl: breakpoint(xl, undefined),
  }

  function breakpoint(_size: number, largerSize: number | undefined): IThemeBreakpoint {
    const size = Math.max(0, _size)
    const exact: string = [
      size > 0 ? `(min-width: ${size}px)` : '',
      largerSize ? `(max-width: ${largerSize - 1}px)` : '',
    ].join(' and ')
    const exactOrMinus = largerSize ? `(max-width: ${largerSize - 1}px)` : `(min-width: 0px)`
    const exactOrPlus = `(min-width: ${size}px)`
    return { exact, exactOrMinus, exactOrPlus }
  }
}
