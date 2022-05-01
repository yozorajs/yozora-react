import { cx } from '@emotion/css'
import CodeHighlighter from '@yozora/react-code-highlighter'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import PropTypes from 'prop-types'
import React from 'react'
import { classes } from './style'
import type { ICodeLiteralProps } from './types'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export const YozoraCodeLiteral: React.FC<ICodeLiteralProps> = props => {
  const { value, lang, title, highlightLinenos, maxLines, showLineNo, darken, className, style } =
    props

  const [collapsed, setCollapsed] = React.useState<boolean>(props.collapsed ?? false)
  const countOfLines: number = React.useMemo<number>(
    () => value.split(/\r|\n|\n\r/g).length,
    [value],
  )

  return (
    <div className={cx('yozora-code-literal', classes.container, className)} style={style}>
      <div
        key="toolbar"
        className={classes.toolbar}
        onDoubleClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setCollapsed(v => !v)
        }}
      >
        <LightButtons
          key="light-buttons"
          onMinimize={() => setCollapsed(true)}
          onMaximize={() => setCollapsed(false)}
        />
        <span key="title" className={classes.title} title={title}>
          {title && <React.Fragment>{title}&nbsp;&nbsp;|&nbsp;</React.Fragment>}
          {countOfLines}&nbsp;lines.
        </span>
        <span key="copyBtn" className={classes.copyBtn} onClick={e => e.stopPropagation()}>
          <CopyButton value={value} />
        </span>
      </div>
      <code key="content" className={classes.content}>
        <pre>
          <CodeHighlighter
            lang={lang}
            value={value}
            highlightLinenos={highlightLinenos}
            maxLines={maxLines}
            collapsed={collapsed}
            showLineNo={showLineNo}
            darken={darken}
          />
        </pre>
      </code>
    </div>
  )
}

YozoraCodeLiteral.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  darken: PropTypes.bool,
  highlightLinenos: PropTypes.array,
  lang: PropTypes.string,
  maxLines: PropTypes.number,
  showLineNo: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
}
YozoraCodeLiteral.displayName = 'YozoraCodeLiteral'
