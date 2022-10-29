import { css } from '@emotion/css'
import { useDeepCompareMemo } from '@yozora/core-react-hook'
import { useThemeContext } from './context'
import { createCssVariables } from './util/themeStyles'

export const useThemeClassName = (): string => {
  const { colors, effects, fonts, spacing } = useThemeContext().themeStyles
  const rootCls = useDeepCompareMemo<string>(() => {
    const vars = {
      // colors
      ...createCssVariables('--color-bg', colors.background),
      ...createCssVariables('--color-border', colors.border),
      ...createCssVariables('--color', colors.text),

      // effects
      ...createCssVariables('--active-color-bg', effects.active.colors.background),
      ...createCssVariables('--active-color-border', effects.active.colors.border),
      ...createCssVariables('--active-color', effects.active.colors.text),
      ...createCssVariables('--hover-color-bg', effects.hover.colors.background),
      ...createCssVariables('--hover-color-border', effects.hover.colors.border),
      ...createCssVariables('--hover-color', effects.hover.colors.text),
      ...createCssVariables('--visited-color-bg', effects.visited.colors.background),
      ...createCssVariables('--visited-color-border', effects.visited.colors.border),
      ...createCssVariables('--visited-color', effects.visited.colors.text),

      // fonts
      ...createCssVariables('--font-family', fonts.family),
      ...createCssVariables('--font-size', fonts.size),

      // spacing
      ...createCssVariables('--spacing-margin', spacing.margin),
    }
    return css({ ...vars })
  }, [colors, effects, fonts, spacing])
  return rootCls
}
