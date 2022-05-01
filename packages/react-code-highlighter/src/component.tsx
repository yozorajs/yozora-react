import Highlight, { Prism } from 'prism-react-renderer'
import type { PrismTheme } from 'prism-react-renderer'
import PropTypes from 'prop-types'
import React from 'react'
import { CodeHighlighterContent } from './content'
import vscDarkTheme from './theme/vsc-dark'
import vscLightTheme from './theme/vsc-light'
import type { ICodeHighlighterProps } from './types'

export const CodeHighlighter: React.FC<ICodeHighlighterProps> = props => {
  const {
    lang,
    value: code,
    darken = true,
    highlightLinenos,
    maxLines,
    lineHeight,
    collapsed,
    showLineNo,
    codesRef,
    onLinenoWidthChange,
  } = props

  const theme: PrismTheme =
    props.theme == null ? (darken ? vscDarkTheme : vscLightTheme) : props.theme

  return (
    <Highlight Prism={Prism} code={code} theme={theme} language={lang as any}>
      {({ tokens, getLineProps, getTokenProps, className, style }) => (
        <CodeHighlighterContent
          codesRef={codesRef}
          highlightLinenos={highlightLinenos}
          lineHeight={lineHeight}
          maxLines={maxLines}
          collapsed={collapsed}
          showLineNo={showLineNo}
          tokens={tokens}
          getLineProps={getLineProps}
          getTokenProps={getTokenProps}
          onLinenoWidthChange={onLinenoWidthChange}
          className={className}
          style={style}
        />
      )}
    </Highlight>
  )
}

CodeHighlighter.propTypes = {
  codesRef: PropTypes.any,
  collapsed: PropTypes.bool,
  darken: PropTypes.bool,
  highlightLinenos: PropTypes.arrayOf(PropTypes.number) as React.Validator<
    number[] | null | undefined
  >,
  lang: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLines: PropTypes.number,
  onLinenoWidthChange: PropTypes.func,
  showLineNo: PropTypes.bool,
  theme: PropTypes.any,
  value: PropTypes.string.isRequired,
}
CodeHighlighter.displayName = 'YozoraCodeHighlighter'
