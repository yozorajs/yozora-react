import { CommonTokenNames } from '@yozora/core-react-constant'

export const commonSchema: Record<CommonTokenNames, string> = {
  [CommonTokenNames.fontFamilyCode]:
    "Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif",
  [CommonTokenNames.fontFamilyHeading]:
    "'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif",
  [CommonTokenNames.fontFamilyBody]:
    "'PingFang SC', system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif",
  [CommonTokenNames.fontSizeCode]: '14px',
  [CommonTokenNames.fontSizeBody]: '16px',
  [CommonTokenNames.lineHeightCode]: 'calc(16px * 1.6)',
  [CommonTokenNames.marginBlockNode]: '0 0 1.25em 0',
  [CommonTokenNames.marginEmphasis]: '0 6px 0 2px',
  [CommonTokenNames.marginThematicBreak]: '1.5em 0',
}
