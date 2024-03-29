import { css, cx } from '@emotion/css'
import { tokens } from '@yozora/core-react-constant'
import { parseCodeMeta } from '@yozora/core-react-util'
import CodeHighlighter from '@yozora/react-code-highlighter'
import React from 'react'

interface IProps {
  lang: string | null
  meta: string | null
  value: string
  theme: string
  showCodeLineno: boolean
}

export class CodeRendererInner extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props: IProps = this.props
    return (
      props.lang !== nextProps.lang ||
      props.meta !== nextProps.meta ||
      props.value !== nextProps.value ||
      props.theme !== nextProps.theme ||
      props.showCodeLineno !== nextProps.showCodeLineno
    )
  }

  public override render(): React.ReactElement {
    const { lang, meta, theme, showCodeLineno } = this.props

    // Remove trailing line endings.
    const value: string = this.props.value.replace(/[\r\n]+$/, '')
    const metaData = parseCodeMeta(meta ?? '', { showCodeLineno })
    const darken: boolean = theme === 'darken'

    return (
      <code className={cls}>
        <pre>
          <CodeHighlighter
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

const cls = cx(
  'yozora-code',
  css({
    margin: tokens.marginBlockNode,
  }),
)
