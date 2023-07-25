/* eslint-disable react/prop-types */
import { css, cx } from '@emotion/css'
import { tokens } from '@yozora/core-react-theme'
import CodeHighlighter from '@yozora/react-code-highlighter'
import React from 'react'
import { parseCodeMeta } from '../../../util/code'

interface IProps {
  lang: string | null
  meta: string | null
  value: string
  theme: string
  preferLineNo: boolean
}

export class CodeRendererInner extends React.Component<IProps> {
  public override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    const props: IProps = this.props
    return (
      props.lang !== nextProps.lang ||
      props.meta !== nextProps.meta ||
      props.value !== nextProps.value ||
      props.theme !== nextProps.theme ||
      props.preferLineNo !== nextProps.preferLineNo
    )
  }

  public override render(): React.ReactElement {
    const { lang, meta, theme, preferLineNo } = this.props

    // Remove trailing line endings.
    const value: string = this.props.value.replace(/[\r\n]+$/, '')
    const metaData = parseCodeMeta(meta ?? '', { preferLineNo })
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
