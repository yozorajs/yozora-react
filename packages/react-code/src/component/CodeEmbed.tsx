import { isEqual } from '@guanghechen/equal'
import type { ICodeRunner } from '@yozora/react-core'
import { clsx } from '@yozora/react-core'
import React from 'react'
import { classes } from '../style'

interface IProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: Record<Lowercase<string>, unknown>
  /**
   * Accessible context variables.
   */
  scope?: Record<string, unknown>
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
  /**
   * For executing or rendering the given code.
   */
  runner: ICodeRunner
}

interface IState {
  error: string | null
}

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 */
export class CodeEmbed extends React.Component<IProps, IState> {
  public static displayName = 'CodeEmbed'

  public static getDerivedStateFromError(error: unknown): IState {
    return { error: error instanceof Error ? error.message : String(error) }
  }

  public constructor(props: IProps) {
    super(props)
    this.state = { error: null }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.error !== nextState.error ||
      props.lang !== nextProps.lang ||
      props.value !== nextProps.value ||
      props.className !== nextProps.className ||
      props.runner !== nextProps.runner ||
      !isEqual(props.scope, nextProps.scope) ||
      !isEqual(props.meta, nextProps.meta) ||
      !isEqual(props.style, nextProps.style)
    )
  }

  public override componentDidCatch(_error: unknown, info: unknown): void {
    console.error(info)
  }

  public override componentDidUpdate(prevProps: IProps): void {
    const props = this.props
    if (
      this.state.error !== null &&
      (prevProps.value !== props.value ||
        prevProps.runner !== props.runner ||
        prevProps.lang !== props.lang ||
        !isEqual(prevProps.meta, props.meta) ||
        !isEqual(prevProps.scope, props.scope))
    ) {
      this.setState({ error: null })
    }
  }

  public override render(): React.ReactElement {
    const { lang, value, meta, className, style, scope, runner: Runner } = this.props
    const { error } = this.state

    return (
      <div className={clsx('yozora-code-embed', classes.embed.container, className)} style={style}>
        {error == null ? (
          <Runner lang={lang} value={value} meta={meta} scope={scope} onError={this._onError} />
        ) : (
          <div className={classes.embed.error}>
            <div className={classes.embed.errorDetails}>{error}</div>
          </div>
        )}
      </div>
    )
  }

  protected _onError = (error: unknown): void => {
    this.setState({
      error: error == null ? null : error instanceof Error ? error.message : String(error),
    })
  }
}
