interface Token {
  types: string[]
  content: string
  empty?: boolean
}

type StyleObj = Record<string, string | number | null>

interface LineInputProps {
  key?: React.Key
  style?: StyleObj
  className?: string
  line: Token[]
  [otherProp: string]: any
}

interface LineOutputProps {
  key?: React.Key
  style?: StyleObj
  className: string
  [otherProps: string]: any
}

interface TokenInputProps {
  key?: React.Key
  style?: StyleObj
  className?: string
  token: Token
  [otherProp: string]: any
}

interface TokenOutputProps {
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
