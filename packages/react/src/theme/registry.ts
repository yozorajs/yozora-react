import { catppuccinFrappeSchema } from './schema/catppuccin-frappe'
import { catppuccinLatteSchema } from './schema/catppuccin-latte'
import { catppuccinMacchiatoSchema } from './schema/catppuccin-macchiato'
import { catppuccinMochaSchema } from './schema/catppuccin-mocha'
import { gruvboxDarkSchema } from './schema/gruvbox-dark'
import { gruvboxLightSchema } from './schema/gruvbox-light'
import { kanagawaDragonSchema } from './schema/kanagawa-dragon'
import { kanagawaLotusSchema } from './schema/kanagawa-lotus'
import { kanagawaWaveSchema } from './schema/kanagawa-wave'
import { rosepineDawnSchema } from './schema/rosepine-dawn'
import { rosepineMainSchema } from './schema/rosepine-main'
import { rosepineMoonSchema } from './schema/rosepine-moon'
import { tokyonightDaySchema } from './schema/tokyonight-day'
import { tokyonightMoonSchema } from './schema/tokyonight-moon'
import { tokyonightNightSchema } from './schema/tokyonight-night'
import { tokyonightStormSchema } from './schema/tokyonight-storm'
import { vscDarkModernSchema } from './schema/vsc-dark-modern'
import { vscLightModernSchema } from './schema/vsc-light-modern'
import type { IThemeSchema } from './types'

export { catppuccinFrappeSchema } from './schema/catppuccin-frappe'
export { catppuccinLatteSchema } from './schema/catppuccin-latte'
export { catppuccinMacchiatoSchema } from './schema/catppuccin-macchiato'
export { catppuccinMochaSchema } from './schema/catppuccin-mocha'
export { gruvboxDarkSchema } from './schema/gruvbox-dark'
export { gruvboxLightSchema } from './schema/gruvbox-light'
export { kanagawaDragonSchema } from './schema/kanagawa-dragon'
export { kanagawaLotusSchema } from './schema/kanagawa-lotus'
export { kanagawaWaveSchema } from './schema/kanagawa-wave'
export { rosepineDawnSchema } from './schema/rosepine-dawn'
export { rosepineMainSchema } from './schema/rosepine-main'
export { rosepineMoonSchema } from './schema/rosepine-moon'
export { tokyonightDaySchema } from './schema/tokyonight-day'
export { tokyonightMoonSchema } from './schema/tokyonight-moon'
export { tokyonightNightSchema } from './schema/tokyonight-night'
export { tokyonightStormSchema } from './schema/tokyonight-storm'
export { vscDarkModernSchema } from './schema/vsc-dark-modern'
export { vscLightModernSchema } from './schema/vsc-light-modern'

/** Flat catalog with separate family and variant metadata. */
export const themeSchemas: readonly IThemeSchema[] = [
  catppuccinFrappeSchema,
  catppuccinLatteSchema,
  catppuccinMacchiatoSchema,
  catppuccinMochaSchema,
  gruvboxDarkSchema,
  gruvboxLightSchema,
  kanagawaDragonSchema,
  kanagawaLotusSchema,
  kanagawaWaveSchema,
  rosepineDawnSchema,
  rosepineMainSchema,
  rosepineMoonSchema,
  tokyonightDaySchema,
  tokyonightMoonSchema,
  tokyonightNightSchema,
  tokyonightStormSchema,
  vscDarkModernSchema,
  vscLightModernSchema,
]

const defaultVariants: Readonly<Record<string, string>> = {
  catppuccin: 'mocha',
  gruvbox: 'dark',
  kanagawa: 'wave',
  rosepine: 'main',
  tokyonight: 'night',
  vsc: 'dark-modern',
}

/** Resolve a family/variant pair or a full scheme name; unknown names remain custom themes. */
export function getThemeSchema(theme: string, variant?: string): IThemeSchema | undefined {
  if (variant === undefined) {
    const named = themeSchemas.find(schema => `${schema.theme}-${schema.variant}` === theme)
    if (named) return named
  }
  const selected = variant ?? defaultVariants[theme]
  return themeSchemas.find(schema => schema.theme === theme && schema.variant === selected)
}
