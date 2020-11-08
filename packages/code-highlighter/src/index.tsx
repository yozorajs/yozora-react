import React, { useEffect, useMemo } from 'react'
import Highlight, { Prism, PrismTheme } from 'prism-react-renderer'
import defaultTheme from 'prism-react-renderer/themes/vsDark'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import type { RenderProps } from './types'
export * from './theme'


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
   *
   */
  theme?: PrismTheme
  /**
   * Width of line numbers
   */
  linenoWidth?: number | string
  /**
   * Line count change callback
   */
  onLineCountChange?: (lineCount: number) => void
}


/**
 * Code line
 */
const Line = styled<{ linenoWidth: number } & any>('div')`
  text-indent: -${ (props) => props.width };
  padding-left: ${ (props) => props.width };
`


/**
 * Code line number
 */
const LineNo = styled<{ width: number } & any>('span')`
  display: inline-block;
  width: ${ (props) => props.width };
  padding-right: 0.6em;
  color: var(--md-code-lineno-color, #858585);
  cursor: default;
  user-select: none;
  text-align: right;
`


type HighlightContentProps = RenderProps & {
  linenoWidth: string | number,
  onLineCountChange?: (lineCount: number) => void
}


/**
 * Content of CodeHighlighter
 *
 * @param props
 */
function HighlightContent(props: HighlightContentProps): React.ReactElement {
  const { tokens, getLineProps, getTokenProps, linenoWidth: lineNoWidth, onLineCountChange } = props

  useEffect(() => {
    if (onLineCountChange != null) {
      onLineCountChange(tokens.length)
    }
  }, [tokens.length, onLineCountChange])

  return (
    <React.Fragment>
      { tokens.map((line, i) => (
        <Line { ...getLineProps({ line, key: i }) } linenoWidth={ lineNoWidth }>
          <LineNo key="line-number" lineNoWidth={ lineNoWidth }>{ i + 1 }</LineNo>
          {
            line.map((token, key) => (
              <span { ...getTokenProps({ token, key }) } />
            ))
          }
        </Line>
      )) }
    </React.Fragment>
  )
}


/**
 *
 * @param props
 */
export function CodeHighlighter(props: CodeHighlighterProps): React.ReactElement | null {
  const {
    lang,
    value: code,
    theme = defaultTheme,
    linenoWidth = 0,
    onLineCountChange,
  } = props

  const result = useMemo<React.ReactElement | null>(() => {
    return (
      <Highlight
        Prism={ Prism }
        code={ code }
        theme={ theme }
        language={ lang as any }
      >
        {
          props => (
            <HighlightContent
              { ...props }
              linenoWidth={ linenoWidth }
              onLineCountChange={ onLineCountChange }
            />
          )
        }
      </Highlight>
    )
  }, [code, theme, lang, linenoWidth, onLineCountChange])

  return result
}


CodeHighlighter.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string,
  theme: PropTypes.object,
  linenoWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onLineCountChange: PropTypes.func,
}


export default CodeHighlighter
