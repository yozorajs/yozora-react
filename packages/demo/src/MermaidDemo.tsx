import MermaidRenderer from '@yozora/react-embed-mermaid'
import type { ICodeRunnerItem, ICodeRunnerProps } from '@yozora/react-renderer'
import { TokenNames, useThemeContext } from '@yozora/react-renderer'
import { CodeLive } from '@yozora/react-renderer-code'
import React from 'react'

function MermaidRunner({ value, onError }: ICodeRunnerProps): React.ReactElement {
  const { schema } = useThemeContext()
  const palette = React.useMemo(() => {
    if (!schema) return undefined
    const { colors } = schema
    return {
      node: colors[TokenNames.colorBgBody],
      border: colors[TokenNames.colorBorderCode],
      text: colors[TokenNames.colorBody],
      line: colors[TokenNames.colorCodeTitle],
      surface: colors[TokenNames.colorBgCode],
      group: colors[TokenNames.colorBgBlockquote],
    }
  }, [schema])
  return (
    <MermaidRenderer
      code={value}
      theme={schema?.darken ? 'dark' : 'default'}
      palette={palette}
      style={{ padding: 16, boxSizing: 'border-box' }}
      onError={onError}
    />
  )
}

const runners: ICodeRunnerItem[] = [
  { title: 'mermaid', pattern: /^mermaid$/, runner: MermaidRunner },
]
const code = `flowchart LR
  A[Markdown] --> B{Renderer}
  B --> C[SVG diagram]
  B --> D[Code preview]
  C --> E[Browser]`

export function MermaidDemo({ showLineNo }: { showLineNo: boolean }): React.ReactElement {
  return (
    <CodeLive
      lang="mermaid"
      value={code}
      runners={runners}
      showLineNo={showLineNo}
      title="diagram.mmd"
    />
  )
}
