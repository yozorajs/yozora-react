import type { Grammar, Token, TokenStream } from 'prismjs'
import Prism from 'prismjs'
import React from 'react'
import type {
  IHighlightTokens,
  ILineInputProps,
  ILineOutputProps,
  IPrismTheme,
  IToken,
  ITokenInputProps,
  ITokenOutputProps,
} from '../types/prism'
import { themeToDict } from '../util/theme'
import { normalizeTokens } from '../util/token'

export const useHighlightTokens = (
  code: string,
  language: string,
  theme: IPrismTheme,
): IHighlightTokens => {
  const themeDict = React.useMemo(() => themeToDict(language, theme), [language, theme])

  const getLineProps = React.useCallback(
    ({ key, className, style, line, ...rest }: ILineInputProps): ILineOutputProps => {
      const output: ILineOutputProps = {
        ...rest,
        className: 'token-line',
        style: undefined,
        key: undefined,
      }

      if (themeDict !== undefined) {
        output.style = themeDict.plain
      }

      if (style !== undefined) {
        output.style = output.style !== undefined ? { ...output.style, ...style } : style
      }

      if (key !== undefined) output.key = key
      if (className) output.className += ` ${className}`

      return output
    },
    [themeDict],
  )

  const getStyleForToken = React.useCallback(
    ({ types, empty }: IToken): React.CSSProperties | undefined => {
      const typesSize = types.length
      if (themeDict === undefined) {
        return undefined
      } else if (typesSize === 1 && types[0] === 'plain') {
        return empty ? { display: 'inline-block' } : undefined
      } else if (typesSize === 1 && !empty) {
        return themeDict[types[0]]
      }

      const baseStyle = empty ? { display: 'inline-block' } : {}
      const typeStyles = types.map(type => themeDict[type])
      return Object.assign(baseStyle, ...typeStyles)
    },
    [themeDict],
  )

  const getTokenProps = React.useCallback(
    ({ key, className, style, token, ...rest }: ITokenInputProps): ITokenOutputProps => {
      const output: ITokenOutputProps = {
        ...rest,
        className: `token ${token.types.join(' ')}`,
        children: token.content,
        style: getStyleForToken(token),
        key: undefined,
      }

      if (style !== undefined) {
        output.style = output.style !== undefined ? { ...output.style, ...style } : style
      }

      if (key !== undefined) output.key = key
      if (className) output.className += ` ${className}`

      return output
    },
    [getStyleForToken],
  )

  const tokenize = React.useCallback(
    (code: string, grammar: Grammar, language: string): Array<Token | string> => {
      const env = {
        code,
        grammar,
        language,
        tokens: [] as TokenStream,
      }

      Prism.hooks.run('before-tokenize', env)
      env.tokens = Prism.tokenize(env.code, env.grammar)
      Prism.hooks.run('after-tokenize', env)
      return env.tokens
    },
    [],
  )

  const tokens = React.useMemo((): IToken[][] => {
    const grammar = language ? Prism.languages[language] : undefined
    const mixedTokens: TokenStream = grammar ? tokenize(code, grammar, language) : [code]
    const tokens: IToken[][] = normalizeTokens(mixedTokens)
    return tokens
  }, [tokenize, code, language])

  return {
    tokens,
    style: themeDict?.root,
    className: language ? `prism-code language-${language}` : `prism-code`,
    getLineProps,
    getTokenProps,
  }
}
