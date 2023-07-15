import { cx } from '@emotion/css'
import CodeHighlighter from '@yozora/react-code-highlighter'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import type { ICodeLiteralProps, ICodeLiteralState } from './types'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export class CodeLiteral extends React.Component<ICodeLiteralProps, ICodeLiteralState> {
  public static displayName = 'CodeLiteral'
  public static propTypes = {
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    darken: PropTypes.bool,
    highlightLinenos: PropTypes.array,
    lang: PropTypes.string,
    maxLines: PropTypes.number,
    showLineNo: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  constructor(props: ICodeLiteralProps) {
    super(props)
    this.state = {
      collapsed: props.collapsed ?? false,
      countOfLines: props.value.split(/\r|\n|\n\r/g).length,
    }
  }

  public override render(): React.ReactElement {
    const {
      darken,
      maxLines,
      showLineNo,
      value, //
      lang,
      title,
      highlightLinenos,
      className,
      style,
    } = this.props
    const { collapsed, countOfLines } = this.state

    return (
      <div className={cx('yozora-code-literal', classes.container, className)} style={style}>
        <div className={classes.toolbar} onDoubleClick={this._onToolbarDbClicked}>
          <LightButtons onMinimize={this._onMinimize} onMaximize={this._onMaximize} />
          <span className={classes.title} title={title}>
            {title && <React.Fragment>{title}&nbsp;</React.Fragment>}
            {title && collapsed ? ' | ' + countOfLines + ' lines.' : null}
          </span>
          <span className={classes.copyBtn} onClick={this._onCopyBtnClicked}>
            <CopyButton value={value} />
          </span>
        </div>
        <code className={classes.content}>
          <pre>
            <CodeHighlighter
              lang={lang}
              value={value}
              highlightLinenos={highlightLinenos}
              maxLines={maxLines}
              collapsed={collapsed}
              showLineNo={showLineNo}
              darken={darken}
            />
          </pre>
        </code>
      </div>
    )
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<ICodeLiteralProps>,
    nextState: Readonly<ICodeLiteralState>,
  ): boolean {
    const { props, state } = this
    return (
      state.collapsed !== nextState.collapsed ||
      state.countOfLines !== nextState.countOfLines ||
      props.darken !== nextProps.darken ||
      props.maxLines !== nextProps.maxLines ||
      props.showLineNo !== nextProps.showLineNo ||
      props.value !== nextProps.value ||
      props.lang !== nextProps.lang ||
      props.title !== nextProps.title ||
      props.highlightLinenos !== nextProps.highlightLinenos ||
      props.className !== nextProps.className ||
      props.style !== nextProps.style
    )
  }

  public override componentDidUpdate(prevProps: Readonly<ICodeLiteralProps>): void {
    if (this.props.value !== prevProps.value) {
      const countOfLines: number = prevProps.value.split(/\r|\n|\n\r/g).length
      if (countOfLines !== this.state.countOfLines) {
        this.setState({ countOfLines })
      }
    }
  }

  protected _onMinimize = (): void => {
    this.setState({ collapsed: true })
  }

  protected _onMaximize = (): void => {
    this.setState({ collapsed: false })
  }

  protected _onToolbarDbClicked = (e: React.MouseEvent): void => {
    e.stopPropagation()
    e.preventDefault()
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }))
  }

  protected _onCopyBtnClicked = (e: React.MouseEvent): void => {
    e.stopPropagation()
  }
}
