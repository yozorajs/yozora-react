import { cx } from '@emotion/css'
import isEqual from '@guanghechen/fast-deep-equal'
import type { ICodeRunner } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'

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
  /**
   *
   */
  error?: unknown
}

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-literal
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export class CodeEmbed extends React.Component<IProps, IState> {
  public static displayName = 'CodeEmbed'
  public static propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    meta: PropTypes.object,
    runner: PropTypes.oneOfType<any>([PropTypes.elementType, PropTypes.func]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props: IProps) {
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
      !isEqual(props.meta, nextProps.meta) ||
      !isEqual(props.style, nextProps.style)
    )
  }

  public override componentDidCatch(error: unknown, info: unknown): void {
    this._onError(error)
    console.error(info)
  }

  public override componentDidUpdate(prevProps: IProps): void {
    // Clear error when the input value changed.
    if (prevProps.value !== this.props.value) {
      this.setState({ error: null })
    }
  }

  public override render(): React.ReactElement {
    const { lang, value, meta, className, style, scope, runner: Runner } = this.props
    const { error } = this.state

    return (
      <div className={cx('yozora-code-embed', classes.container, className)} style={style}>
        {error == null ? (
          <Runner lang={lang} value={value} meta={meta} scope={scope} onError={this._onError} />
        ) : (
          <div className={classes.error}>
            <div className={classes.errorDetails}>{error as any}</div>
          </div>
        )}
      </div>
    )
  }

  protected _onError = (error: unknown): void => {
    this.setState({ error })
  }
}
