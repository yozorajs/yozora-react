import type { TokenNames } from '../constant/token'

export interface IBreakpoints {
  xs: string
  xsMinus: string
  xsPlus: string
  sm: string
  smMinus: string
  smPlus: string
  md: string
  mdMinus: string
  mdPlus: string
  lg: string
  lgMinus: string
  lgPlus: string
  xl: string
  xlMinus: string
  xlPlus: string
}

export interface IThemeContext {
  readonly theme: string
  readonly variant?: string
  /** Absent outside a provider or when no built-in theme matches. */
  readonly schema?: Readonly<IThemeSchema>
  readonly breakpoints: Readonly<IBreakpoints>
  /** CSP nonce for custom breakpoint styles. */
  readonly nonce?: string
}

/** Original community color names and values; nested source names use dotted paths. */
export interface IThemePalette {
  readonly [name: string]: string
}

/** Syntax roles mapped to existing values from the community palette. */
export interface IThemeSyntax {
  readonly keyword: string
  readonly string: string
  readonly function: string
  readonly type: string
  readonly constant: string
  readonly variable: string
  readonly parameter: string
  readonly comment: string
  readonly operator: string
  readonly punctuation: string
  readonly number: string
  readonly property: string
  readonly tag: string
  readonly attribute: string
  readonly decorator: string
  readonly inserted: string
  readonly deleted: string
}

export interface IThemeSchema {
  readonly theme: string
  readonly variant: string
  readonly darken: boolean
  readonly colors: Readonly<Record<TokenNames, string>>
  readonly palette: Readonly<IThemePalette>
  readonly syntax: Readonly<IThemeSyntax>
}
