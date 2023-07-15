import { cx } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import type { ICodeEmbedProps, ICodeEmbedState } from './types'

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
export class CodeEmbed extends React.Component<ICodeEmbedProps, ICodeEmbedState> {
  public static displayName = 'CodeEmbed'
  public static propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    meta: PropTypes.object,
    runner: PropTypes.oneOfType<any>([PropTypes.elementType, PropTypes.func]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props: ICodeEmbedProps) {
    super(props)
    this.state = { error: null }
  }

  public override componentDidCatch(error: unknown, info: unknown): void {
    this._onError(error)
    console.error(info)
  }

  public override componentDidUpdate(prevProps: ICodeEmbedProps): void {
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
