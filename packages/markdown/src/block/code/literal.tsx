import Code from '@yozora/react-code'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'

/**
 * Props for CodeLiteral
 */
export interface CodeLiteralProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
}

/**
 *
 * @param props
 */
export function CodeLiteral(
  props: CodeLiteralProps,
): React.ReactElement | null {
  const { lang, value } = props
  return (
    <Container>
      <OverlayContainer>
        <CopyButton>
          <CopyToClipboard text={value}>
            <span>copy</span>
          </CopyToClipboard>
        </CopyButton>
      </OverlayContainer>
      <CodePreview lang={lang} value={value} />
    </Container>
  )
}

CodeLiteral.displayName = 'CodeLiteral'
export default CodeLiteral

const Container = styled.div`
  --md-code-literal-border-color: lightgray;
  --md-code-literal-border-radius: 4px;
  --md-code-literal-background-primary: #1e1e1e;
  --md-code-literal-font-size: 1rem;
  --md-code-literal-font-family: Consolas, Source Code Pro, monospace, sans-serif;
  --md-code-literal-color-caret: #aeafad;
  --md-code-literal-background-selection: hsla(200deg, 30%, 70%, 0.3);

  position: relative;
  margin: 1rem 0;
  padding: 0.8rem 0;
  border-radius: var(--md-code-literal-border-radius);
  background: var(--md-code-literal-background-primary);
`

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
  background: hsla(0deg, 0%, 35%, 0.64);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`

const CopyButton = styled.span`
  display: inline-block;
  margin: 0 1rem 0 auto;
  user-select: none;
  cursor: pointer;
`

const CodePreview = styled(Code)`
  overflow: auto;;;;
  caret-color: var(--md-code-literal-color-caret);
  font-size: var(--md-code-literal-font-size);
  font-family: var(--md-code-literal-font-family);
  font-weight: 400;
  text-shadow: 0 1px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-spacing: normal;
  word-break: break-all;
  word-wrap: break-word;
  letter-spacing: 1px;
  line-height: inherit;
  tab-size: 2;
  ::selection {
    background: var(--md-code-literal-background-selection);
  }
`
