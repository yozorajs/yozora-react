import type React from 'react'

export interface IToken {
  types: string[]
  content: string
  empty?: boolean
}

export interface ILineInputProps {
  key?: React.Key
  style?: React.CSSProperties
  className?: string
  line: IToken[]
  [otherProp: string]: any
}

export interface ILineOutputProps {
  key?: React.Key
  style?: React.CSSProperties
  className: string
  [otherProps: string]: any
}

export interface ITokenInputProps {
  key?: React.Key
  style?: React.CSSProperties
  className?: string
  token: IToken
  [otherProp: string]: any
}

export interface ITokenOutputProps {
  key?: React.Key
  style?: React.CSSProperties
  className: string
  children: string
  [otherProp: string]: any
}

export interface IHighlightTokens {
  tokens: IToken[][]
  className?: string
  style: React.CSSProperties
  getLineProps(input: ILineInputProps): ILineOutputProps
  getTokenProps(input: ITokenInputProps): ITokenOutputProps
}

interface PrismThemeEntry {
  color?: string
  backgroundColor?: string
  fontStyle?: 'normal' | 'italic'
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through'
  opacity?: number
  [styleKey: string]: string | number | void
}

export interface IPrismTheme {
  plain: PrismThemeEntry
  styles: Array<{
    types: string[]
    style: PrismThemeEntry
    languages?: string[]
  }>
}

export interface IThemeDict {
  root: React.CSSProperties
  plain: React.CSSProperties
  [type: string]: React.CSSProperties
}
