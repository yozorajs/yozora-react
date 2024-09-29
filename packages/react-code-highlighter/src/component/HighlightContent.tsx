import { cx } from '@emotion/css'
import { isEqual } from '@guanghechen/equal'
import type { TokenStream } from 'prismjs'
import Prism from 'prismjs'
import PropTypes from 'prop-types'
import React from 'react'
import { classes, vars } from '../style'
import type {
  ILineInputProps,
  ILineOutputProps,
  IPrismTheme,
  IThemeDict,
  IToken,
  ITokenInputProps,
  ITokenOutputProps,
} from '../types/prism'
import { themeToDict } from '../util/theme'
import { normalizeTokens } from '../util/token'
import { HighlightLinenos } from './HighlightLinenos'

interface IProps {
  code: string
  codesRef: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement> | undefined
  collapsed: boolean
  language: string
  maxLines: number
  showLineno: boolean
  theme: IPrismTheme
  highlightLinenos: number[]
  onLinenoWidthChange?(linenoWidth: React.CSSProperties['width']): void // Callback when linenoWidth changed.
}

interface IState {
  linenoWidth: string | undefined
  themeDict: IThemeDict
  tokens: IToken[][]
}

export class HighlightContent extends React.Component<IProps, IState> {
  public static readonly displayName = 'HighlightContent'
  public static readonly propTypes = {
    code: PropTypes.string.isRequired,
    codesRef: PropTypes.any,
    collapsed: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    maxLines: PropTypes.number.isRequired,
    showLineno: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    highlightLinenos: PropTypes.array.isRequired,
    onLinenoWidthChange: PropTypes.func,
  }

  protected readonly linenoRef: React.RefObject<HTMLDivElement>

  constructor(props: IProps) {
    super(props)

    const themeDict: IThemeDict = themeToDict(props.language, props.theme)
    const tokens: IToken[][] = this.tokenize(props.code, props.language)
    const linenoWidth: string | undefined = props.showLineno
      ? `${Math.max(2, String(tokens.length).length) * 1.1}em`
      : undefined
    this.state = { linenoWidth, themeDict, tokens }
    this.linenoRef = { current: null }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props: IProps = this.props
    const state: IState = this.state
    return (
      state.linenoWidth !== nextState.linenoWidth ||
      state.themeDict !== nextState.themeDict ||
      state.tokens !== nextState.tokens ||
      props.code !== nextProps.code ||
      props.codesRef !== nextProps.codesRef ||
      props.collapsed !== nextProps.collapsed ||
      props.language !== nextProps.language ||
      props.maxLines !== nextProps.maxLines ||
      props.showLineno !== nextProps.showLineno ||
      !isEqual(props.theme, nextProps.theme) ||
      !isEqual(props.highlightLinenos, nextProps.highlightLinenos)
    )
  }

  public override render(): React.ReactElement {
    const { linenoRef, onScroll } = this
    const {
      codesRef,
      collapsed,
      highlightLinenos,
      language,
      maxLines,
      showLineno = true,
    } = this.props
    const { linenoWidth, tokens } = this.state

    const countOfLines: number = tokens.length
    const visibleLines: number = maxLines > 0 ? Math.min(maxLines, countOfLines) : countOfLines

    // Sync lineno width.
    const style: React.CSSProperties = {
      ...this.state.themeDict.root,
      backgroundColor: 'none',
      ...(collapsed
        ? {
            maxHeight: 0,
          }
        : {
            maxHeight: `calc(calc(${vars.lineHeightCode} * ${visibleLines + 0.8}) + 6px)`,
            minHeight: '100%',
          }),
    }

    return (
      <div
        className={cx(
          classes.container,
          language ? `prism-code language-${language}` : 'prism-code',
        )}
        style={style}
      >
        {showLineno && (
          <div
            key="linenos"
            className={classes.lineno}
            style={{ width: linenoWidth }}
            ref={linenoRef}
          >
            <HighlightLinenos countOfLines={countOfLines} highlightLinenos={highlightLinenos} />
          </div>
        )}
        <div key="codes" ref={codesRef} className={classes.codes} onScroll={onScroll}>
          <div className={classes.codeWrapper}>
            {tokens.map((line, lineNo) => {
              const isHighlight = highlightLinenos.includes(lineNo + 1)
              const lineProps = this.getLineProps({ line })
              return (
                <div
                  {...lineProps}
                  key={lineNo}
                  className={cx(
                    classes.line,
                    classes.codeLine,
                    isHighlight && classes.highlightLine,
                    lineProps.className,
                  )}
                >
                  {line.map((token, key) => (
                    <span {...this.getTokenProps({ token })} key={key} />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  public override componentDidMount(): void {
    this.props.onLinenoWidthChange?.(this.state.linenoWidth)
  }

  public override componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ): void {
    const props: IProps = this.props
    const state: IState = this.state

    const latestThemeDict: IThemeDict =
      props.language !== prevProps.language || !isEqual(props.theme, prevProps.theme)
        ? themeToDict(props.language, props.theme)
        : state.themeDict
    if (
      props.code !== prevProps.code ||
      props.language !== prevProps.language ||
      latestThemeDict !== prevState.themeDict
    ) {
      const nextTokens: IToken[][] = this.tokenize(props.code, props.language)
      const linenoWidth: string | undefined = props.showLineno
        ? `${Math.max(2, String(nextTokens.length).length) * 1.1}em`
        : undefined
      this.setState({ linenoWidth, themeDict: latestThemeDict, tokens: nextTokens })
    }

    if (state.linenoWidth !== prevState.linenoWidth) {
      this.props.onLinenoWidthChange?.(state.linenoWidth)
    }
  }

  protected readonly onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const codesArea = e.target as HTMLTextAreaElement
    if (codesArea == null) return

    const { scrollTop } = codesArea
    this.linenoRef.current?.scrollTo?.(0, scrollTop)
  }

  protected tokenize(code: string, language: string): IToken[][] {
    const grammar = language ? Prism.languages[language] : undefined
    if (grammar) {
      const env = { code, grammar, language, tokens: [] as TokenStream }
      Prism.hooks.run('before-tokenize', env)
      env.tokens = Prism.tokenize(env.code, env.grammar)
      Prism.hooks.run('after-tokenize', env)
      const tokens: IToken[][] = normalizeTokens(env.tokens)
      return tokens
    } else {
      const tokens: IToken[][] = normalizeTokens([code])
      return tokens
    }
  }

  protected getLineProps(lineInputProps: ILineInputProps): ILineOutputProps {
    const { themeDict } = this.state
    const { key, className, style, line, ...rest } = lineInputProps
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
  }

  protected getStyleForToken({ types, empty }: IToken): React.CSSProperties | undefined {
    const { themeDict } = this.state
    const typesSize = types.length
    if (themeDict === undefined) {
      return undefined
    } else if (typesSize === 1 && types[0] === 'plain') {
      return empty ? { display: 'inline-block' } : undefined
    } else if (typesSize === 1 && !empty) {
      return themeDict[types[0]]
    }

    const style = empty ? { display: 'inline-block' } : {}
    for (const type of types) {
      const typeStyle = themeDict[type]
      Object.assign(style, typeStyle)
    }
    return style
  }

  protected getTokenProps(tokenInputProps: ITokenInputProps): ITokenOutputProps {
    const { key, className, style, token, ...rest } = tokenInputProps
    const output: ITokenOutputProps = {
      ...rest,
      className: `token ${token.types.join(' ')}`,
      children: token.content,
      style: this.getStyleForToken(token),
      key: undefined,
    }

    if (style !== undefined) {
      output.style = output.style !== undefined ? { ...output.style, ...style } : style
    }
    if (key !== undefined) output.key = key
    if (className) output.className += ` ${className}`
    return output
  }
}
