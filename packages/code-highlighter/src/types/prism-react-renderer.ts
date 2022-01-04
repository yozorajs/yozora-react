interface IToken {
  types: string[]
  content: string
  empty?: boolean
}

type IStyleObj = Record<string, string | number | null>

export interface ILineInputProps {
  key?: React.Key
  style?: IStyleObj
  className?: string
  line: IToken[]
  [otherProp: string]: any
}

export interface ILineOutputProps {
  key?: React.Key
  style?: IStyleObj
  className: string
  [otherProps: string]: any
}

export interface ITokenInputProps {
  key?: React.Key
  style?: IStyleObj
  className?: string
  token: IToken
  [otherProp: string]: any
}

export interface ITokenOutputProps {
  key?: React.Key
  style?: IStyleObj
  className: string
  children: string
  [otherProp: string]: any
}

export interface IRenderProps {
  tokens: IToken[][]
  className?: string
  style: IStyleObj
  getLineProps(input: ILineInputProps): ILineOutputProps
  getTokenProps(input: ITokenInputProps): ITokenOutputProps
}
