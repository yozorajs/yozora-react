import React from 'react'
import styled from 'styled-components'
import type { RenderProps } from './types'

export interface HighlightContentProps extends RenderProps {
  /**
   * CSS class name of the highlight code content.
   */
  contentClassName?: string
  /**
   * CSS class name of lineNos.
   */
  lineNosClassName?: string
  /**
   * CSS class name of codes
   */
  codesClassName?: string
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

const LineNoContainer = styled.div`
  flex: 0 0 auto;
  padding-right: 0.6em;
  cursor: default;
  user-select: none;
  text-align: right;
  border-right: 1px solid #666;
  & > span {
    display: inline-block;
    width: 100%;
  }
`

const CodesContainer = styled.div`
  flex: 1 1 0;
  overflow: auto;
  padding-left: 0.6em;
`

/**
 * Content of CodeHighlighter.
 */
function HighlighterContent(props: HighlightContentProps): React.ReactElement {
  const { tokens, getLineProps, getTokenProps } = props
  const lines = tokens.map((line, key) => getLineProps({ line, key }))
  const linenoWidth = `${Math.max(2, ('' + tokens.length).length) + 0.5}em`

  const {
    contentClassName = 'yozora-code-highlighter-content',
    lineNosClassName = 'yozora-code-highlighter-linenos',
    codesClassName = 'yozora-code-highlighter-codes',
  } = props

  return (
    <Container className={contentClassName}>
      <LineNoContainer
        key="lineNos"
        className={lineNosClassName}
        style={{ width: linenoWidth }}
      >
        {tokens.map((line, lineNo) => (
          <div key={lineNo} {...lines[lineNo]}>
            <span key={lineNo}>{lineNo + 1}</span>
          </div>
        ))}
      </LineNoContainer>
      <CodesContainer key="codes" className={codesClassName}>
        {tokens.map((line, lineNo) => (
          <div key={lineNo} {...lines[lineNo]}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key: key })} />
            ))}
          </div>
        ))}
      </CodesContainer>
    </Container>
  )
}

HighlighterContent.displayName = 'YozoraCodeHighlighterContent'
export default HighlighterContent
