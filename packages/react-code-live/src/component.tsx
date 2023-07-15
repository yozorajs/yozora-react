import { cx } from '@emotion/css'
import { debounce } from '@guanghechen/common-util'
import CodeEditor from '@yozora/react-code-editor'
import CodeEmbed from '@yozora/react-code-embed'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import type { ICodeLiveProps, ICodeLiveState } from './types'

/**
 * Render yozora `code` in live mode.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export class CodeLive extends React.Component<ICodeLiveProps, ICodeLiveState> {
  public static displayName = 'CodeLive'
  public static propTypes = {
    autoFocus: PropTypes.bool,
    centerPreviewer: PropTypes.bool,
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    darken: PropTypes.bool,
    lang: PropTypes.string.isRequired,
    maxLines: PropTypes.number,
    meta: PropTypes.any,
    runners: PropTypes.array.isRequired,
    scope: PropTypes.any,
    showLineNo: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.any,
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  constructor(props: ICodeLiveProps) {
    super(props)
    this.state = {
      value: props.value,
      orientation: 'vertical',
      collapsed: props.collapsed ?? false,
      countOfLines: props.value.split(/\r|\n|\n\r/g).length,
    }
  }

  public override render(): React.ReactElement {
    const {
      darken,
      maxLines,
      showLineNo,
      runners,
      lang,
      meta,
      scope,
      title,
      theme,
      autoFocus,
      centerPreviewer = true,
      className,
      style,
    } = this.props
    const { value, orientation, collapsed, countOfLines } = this.state
    const runner = runners.find(item => item.pattern.test(lang))

    return (
      <div className={cx('yozora-code-live', classes.container, className)} style={style}>
        <div key="toolbar" className={classes.toolbar} onDoubleClick={this._onToolbarDbClicked}>
          <LightButtons onMinimize={this._onMinimize} onMaximize={this._onMaximize} />
          <span className={classes.title} title={title}>
            {title && <React.Fragment>{title}&nbsp;</React.Fragment>}
            {title && collapsed ? ' | ' + countOfLines + ' lines.' : null}
          </span>
          <span className={classes.copyBtn} onClick={this._onCopyBtnClicked}>
            <CopyButton value={value} />
          </span>
        </div>
        <div
          key="main"
          className={cx(classes.main, orientation === 'vertical' && classes.mainVertical)}
        >
          <div key="editor" className={classes.editor}>
            <CodeEditor
              lang={lang}
              code={value}
              onChange={this._onChanged}
              darken={darken}
              theme={theme}
              collapsed={collapsed}
              showLineNo={showLineNo}
              maxLines={maxLines}
              autoFocus={autoFocus}
            />
          </div>
          {runner != null && (
            <div
              key="previewer"
              className={cx(classes.previewer, centerPreviewer && classes.previewerCenter)}
            >
              <CodeEmbed
                lang={lang}
                value={value}
                meta={meta}
                scope={scope}
                runner={runner.runner}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<ICodeLiveProps>,
    nextState: Readonly<ICodeLiveState>,
  ): boolean {
    const { props, state } = this
    return (
      state.value !== nextState.value ||
      state.orientation !== nextState.orientation ||
      state.collapsed !== nextState.collapsed ||
      state.countOfLines !== nextState.countOfLines ||
      props.darken !== nextProps.darken ||
      props.maxLines !== nextProps.maxLines ||
      props.showLineNo !== nextProps.showLineNo ||
      props.runners !== nextProps.runners ||
      props.lang !== nextProps.lang ||
      props.meta !== nextProps.meta ||
      props.scope !== nextProps.scope ||
      props.title !== nextProps.title ||
      props.theme !== nextProps.theme ||
      props.autoFocus !== nextProps.autoFocus ||
      props.centerPreviewer !== nextProps.centerPreviewer ||
      props.className !== nextProps.className ||
      props.style !== nextProps.style
    )
  }

  public override componentDidUpdate(prevProps: Readonly<ICodeLiveProps>): void {
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

  protected _onChanged = debounce((nextValue: string): void => {
    this.setState({ value: nextValue })
  })
}
