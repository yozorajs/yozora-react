import { debounce } from '@guanghechen/common-util'
import { clsx } from '@yozora/react-core'
import React from 'react'
import { CopyButton as CopyButtonComponent } from '../copy-button'
import { CodeEditor as CodeEditorComponent } from '../editor'
import { CodeEmbed as CodeEmbedComponent } from '../embed'
import { LightButtons as LightButtonsComponent } from '../light-buttons'
import { classes } from './style'
import type { ICodeLiveProps, ICodeLiveState } from './types'

/**
 * Render yozora `code` in live mode.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 */
export class CodeLive extends React.Component<ICodeLiveProps, ICodeLiveState> {
  public static displayName = 'CodeLive'

  public constructor(props: ICodeLiveProps) {
    super(props)
    this.state = {
      value: props.value,
      orientation: 'vertical',
      collapsed: props.collapsed ?? false,
      countOfLines: props.value.split(/\r\n|\r|\n/g).length,
    }
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
      props.value !== nextProps.value ||
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
      <div className={clsx('yozora-code-live', classes.container, className)} style={style}>
        <div key="toolbar" className={classes.toolbar} onDoubleClick={this._onToolbarDbClicked}>
          <LightButtonsComponent onMinimize={this._onMinimize} onMaximize={this._onMaximize} />
          <span className={classes.title} title={title}>
            {title && <React.Fragment>{title}&nbsp;</React.Fragment>}
            {title && collapsed ? ' | ' + countOfLines + ' lines.' : null}
          </span>
          <span className={classes.copyBtn} onClick={this._onCopyBtnClicked}>
            <CopyButtonComponent value={value} />
          </span>
        </div>
        <div
          key="main"
          data-collapsed={collapsed || undefined}
          className={clsx(classes.main, orientation === 'vertical' && classes.mainVertical)}
        >
          <div key="editor" className={classes.editor}>
            <CodeEditorComponent
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
              className={clsx(classes.previewer, centerPreviewer && classes.previewerCenter)}
            >
              <CodeEmbedComponent
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

  public override componentDidUpdate(prevProps: Readonly<ICodeLiveProps>): void {
    if (this.props.value !== prevProps.value) {
      // External value changes replace the draft and supersede pending edits.
      this._onChanged.cancel()
      const value = this.props.value
      this.setState({ value, countOfLines: value.split(/\r\n|\r|\n/g).length })
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
    this.setState({ value: nextValue, countOfLines: nextValue.split(/\r\n|\r|\n/g).length })
  })
}
