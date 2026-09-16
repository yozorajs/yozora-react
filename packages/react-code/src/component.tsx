import { isEqual } from '@guanghechen/equal'
import { CodeEmbed as CodeEmbedComponent } from '@yozora/react-code-embed'
import { CodeLiteral as CodeLiteralComponent } from '@yozora/react-code-literal'
import { CodeLive as CodeLiveComponent } from '@yozora/react-code-live'
import type { ICodeRunnerItem, ICodeRunnerProps } from '@yozora/react-core'
import { clsx } from '@yozora/react-core'
import { CodeRendererJsx as JsxRendererComponent } from '@yozora/react-embed-jsx'
import React from 'react'
import type { ICodeMetaData, ICodeProps } from './types'
import { parseCodeMeta } from './util'

export const defaultRunners: ICodeRunnerItem[] = [
  {
    title: 'jsx',
    pattern: /^jsx$/,
    runner: function JsxRunner(props: ICodeRunnerProps): React.ReactElement {
      const { value, scope, onError, meta = {} } = props
      const inline = meta.jsxmode == null || meta.jsxmode === 'inline'
      return <JsxRendererComponent code={value} inline={inline} scope={scope} onError={onError} />
    },
  },
]

interface IState {
  meta: ICodeMetaData
}

/**
 * Render yozora `code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export class Code extends React.Component<ICodeProps, IState> {
  public static readonly displayName = 'YozoraCode'

  public constructor(props: ICodeProps) {
    super(props)
    this.state = {
      meta: parseCodeMeta(props.meta ?? '', { showCodeLineno: props.showCodeLineno ?? true }),
    }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<ICodeProps>,
    nextState: Readonly<IState>,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      !isEqual(state.meta, nextState.meta) ||
      props.lang !== nextProps.lang ||
      props.meta !== nextProps.meta ||
      props.runners !== nextProps.runners ||
      props.value !== nextProps.value ||
      props.darken !== nextProps.darken ||
      props.showCodeLineno !== nextProps.showCodeLineno ||
      props.className !== nextProps.className ||
      props.style !== nextProps.style
    )
  }

  public override render(): React.ReactElement {
    const { lang, value, runners = defaultRunners, darken, style } = this.props
    const { meta } = this.state

    const { highlights, maxlines, title, collapsed, showlineno } = meta
    const className = clsx(cls, this.props.className)
    const mode = lang ? (meta._yozoracodemode ?? 'literal') : 'literal'

    if (lang) {
      switch (mode) {
        case 'live': {
          return (
            <CodeLiveComponent
              lang={lang as string}
              value={value}
              meta={meta}
              runners={runners}
              title={title}
              maxLines={maxlines}
              collapsed={collapsed}
              showLineNo={showlineno}
              darken={darken}
              className={className}
              style={style}
            />
          )
        }
        case 'embed': {
          const runner = runners.find(item => item.pattern.test(lang as string))
          if (runner != null) {
            return (
              <CodeEmbedComponent
                lang={lang as string}
                value={value}
                meta={meta}
                runner={runner.runner}
                className={className}
                style={style}
              />
            )
          }
        }
      }
    }

    return (
      <CodeLiteralComponent
        lang={lang}
        value={value}
        title={title}
        highlightLinenos={highlights}
        maxLines={maxlines}
        collapsed={collapsed}
        showLineNo={showlineno}
        darken={darken}
        className={className}
        style={style}
      />
    )
  }

  public override componentDidUpdate(prevProps: ICodeProps): void {
    const props: ICodeProps = this.props
    if (props.meta !== prevProps.meta || props.showCodeLineno !== prevProps.showCodeLineno) {
      this.setState({
        meta: parseCodeMeta(props.meta ?? '', { showCodeLineno: props.showCodeLineno ?? true }),
      })
    }
  }
}

const cls = 'yozora-code yozora-code__root'
