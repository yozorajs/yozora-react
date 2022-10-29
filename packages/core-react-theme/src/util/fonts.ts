import type { IThemeFonts } from '../types/fonts'

export const createFonts = (): IThemeFonts => {
  return {
    family: {
      code: `Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif`,
      heading: `'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif`,
      body: `'PingFang SC', miui, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif`,
    },
    size: {
      code: '14px',
      body: '16px',
    },
  }
}
