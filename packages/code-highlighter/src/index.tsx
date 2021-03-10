import type { PrismTheme } from 'prism-react-renderer'
import Highlight, { Prism } from 'prism-react-renderer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import vscDarkTheme from './theme/vsc-dark'
import vscLightTheme from './theme/vsc-light'
import type { RenderProps } from './types'

export { vscDarkTheme } from './theme/vsc-dark'
export { vscLightTheme } from './theme/vsc-light'

/**
 * Props of CodeHighlighter
 */
export interface CodeHighlighterProps {
  /**
   * Source code contents
   */
  value: string
  /**
   * Code language
   */
  lang?: string
  /**
   * If true, use vscDarkTheme as default theme,
   * otherwise use vscLightTheme as default theme.
   * @default true
   */
  darken?: boolean
  /**
   * Highlight prism theme.
   */
  theme?: PrismTheme
  /**
   * Width of line numbers
   */
  linenoWidth?: React.CSSProperties['width']
  /**
   * Line number color
   */
  linenoColor?: React.CSSProperties['color']
  /**
   * Line count change callback
   */
  onLineCountChange?(lineCount: number): void
}

/**
 *
 * @param props
 */
export function CodeHighlighter(
  props: CodeHighlighterProps,
): React.ReactElement | null {
  const {
    lang,
    value: code,
    linenoWidth = 0,
    linenoColor = '#858585',
    onLineCountChange,
    darken = true,
  } = props

  const theme: PrismTheme =
    props.theme == null ? (darken ? vscDarkTheme : vscLightTheme) : props.theme
  const result = useMemo<React.ReactElement | null>(() => {
    return (
      <Highlight Prism={Prism} code={code} theme={theme} language={lang as any}>
        {props => (
          <HighlightContent
            {...props}
            linenoWidth={linenoWidth}
            linenoColor={linenoColor}
            onLineCountChange={onLineCountChange}
          />
        )}
      </Highlight>
    )
  }, [code, theme, lang, linenoWidth, linenoColor, onLineCountChange])

  return result
}

CodeHighlighter.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string,
  theme: PropTypes.object,
  linenoWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onLineCountChange: PropTypes.func,
}

CodeHighlighter.displayName = 'YozoraCodeHighlighter'
export default CodeHighlighter

type HighlightContentProps = RenderProps & {
  linenoWidth: React.CSSProperties['width']
  linenoColor: React.CSSProperties['color']
  onLineCountChange?(lineCount: number): void
}

/**
 * Content of CodeHighlighter
 *
 * @param props
 */
function HighlightContent(props: HighlightContentProps): React.ReactElement {
  const {
    tokens,
    linenoWidth,
    linenoColor,
    getLineProps,
    getTokenProps,
    onLineCountChange,
  } = props

  useEffect(() => {
    if (onLineCountChange != null) {
      onLineCountChange(tokens.length)
    }
  }, [tokens.length, onLineCountChange])

  return (
    <React.Fragment>
      {tokens.map((line, i) => (
        <Line
          key={i}
          {...getLineProps({ line, key: i })}
          linenoWidth={linenoWidth}
        >
          <LineNo
            key="line-number"
            linenoWidth={linenoWidth}
            linenoColor={linenoColor}
          >
            {i + 1}
          </LineNo>
          {line.map((token, key) => (
            <span key={key} {...getTokenProps({ token, key })} />
          ))}
        </Line>
      ))}
    </React.Fragment>
  )
}

/**
 * Code line
 */
const Line = styled.div<{
  linenoWidth: React.CSSProperties['width']
}>`
  text-indent: -${props => props.linenoWidth};
  padding-left: ${props => props.linenoWidth};
`

/**
 * Code line number
 */
const LineNo = styled.span<{
  linenoWidth: React.CSSProperties['width']
  linenoColor: React.CSSProperties['color']
}>`
  display: inline-block;
  width: ${props => props.linenoWidth};
  padding-right: 0.6em;
  color: ${props => props.linenoColor};
  cursor: default;
  user-select: none;
  text-align: right;
`

export const CodeHighlighterClasses = {
  line: `${Line}`,
  lineNo: `${LineNo}`,
}
