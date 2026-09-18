import React from 'react'
import { CodeHighlighter as CodeHighlighterComponent } from '../../../../highlighter/component/CodeHighlighter'
import { parseCodeMeta } from '../../../../util/code'

interface IProps {
  lang: string | null
  meta: string | null
  value: string
  darken?: boolean
  showCodeLineno: boolean
}

export class CodeRendererInner extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props: IProps = this.props
    return (
      props.lang !== nextProps.lang ||
      props.meta !== nextProps.meta ||
      props.value !== nextProps.value ||
      props.darken !== nextProps.darken ||
      props.showCodeLineno !== nextProps.showCodeLineno
    )
  }

  public override render(): React.ReactElement {
    const { lang, meta, darken, showCodeLineno } = this.props

    // Remove trailing line endings.
    const value: string = this.props.value.replace(/[\r\n]+$/, '')
    const metaData = parseCodeMeta(meta ?? '', { showCodeLineno })

    return (
      <code className={cls}>
        <pre>
          <CodeHighlighterComponent
            lang={lang}
            value={value}
            highlightLinenos={metaData.highlights}
            maxLines={metaData.maxlines}
            collapsed={metaData.collapsed}
            showLineNo={metaData.showlineno}
            darken={darken}
          />
        </pre>
      </code>
    )
  }
}

const cls = 'yozora-code yozora-code-renderer__root'
