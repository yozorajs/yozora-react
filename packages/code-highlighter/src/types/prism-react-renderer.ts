interface Token {
  types: string[]
  content: string
  empty?: boolean
}

type StyleObj = Record<string, string | number | null>

export interface LineInputProps {
  key?: React.Key
  style?: StyleObj
  className?: string
  line: Token[]
  [otherProp: string]: any
}

export interface LineOutputProps {
  key?: React.Key
  style?: StyleObj
  className: string
  [otherProps: string]: any
}

export interface TokenInputProps {
  key?: React.Key
  style?: StyleObj
  className?: string
  token: Token
  [otherProp: string]: any
}

export interface TokenOutputProps {
  key?: React.Key
  style?: StyleObj
  className: string
  children: string
  [otherProp: string]: any
}

export interface RenderProps {
  tokens: Token[][]
  className: string
  style: StyleObj
  getLineProps(input: LineInputProps): LineOutputProps
  getTokenProps(input: TokenInputProps): TokenOutputProps
}
