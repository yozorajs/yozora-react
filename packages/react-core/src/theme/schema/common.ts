import { CommonTokenNames } from '../../constant/token'

export const commonSchema: Record<CommonTokenNames, string> = {
  [CommonTokenNames.fontFamilyCode]:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  [CommonTokenNames.fontFamilyHeading]:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  [CommonTokenNames.fontFamilyBody]:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  [CommonTokenNames.fontSizeCode]: '14px',
  [CommonTokenNames.fontSizeBody]: '16px',
  [CommonTokenNames.lineHeightCode]: 'calc(14px * 1.65)',
  [CommonTokenNames.marginBlockNode]: '0 0 1.25em 0',
  [CommonTokenNames.marginEmphasis]: '0',
  [CommonTokenNames.marginThematicBreak]: '1.5em 0',
}
