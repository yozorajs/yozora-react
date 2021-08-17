import type { Root } from '@yozora/ast'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'

export interface YozoraMarkdownProps {
  /**
   * Root node of Yozora Markdown AST.
   */
  ast: Root
  /**
   * Footnote definitions.
   */
  footnotes?: React.ReactNode
  /**
   * Root css class of the component.
   */
  className?: string
  /**
   * Root css style.
   */
  style?: React.CSSProperties
}

/**
 * Render yozora markdown ast in react components.
 *
 * @param props
 * @returns
 */
export const YozoraMarkdown: React.FC<YozoraMarkdownProps> = props => {
  const { darken, renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { ast, footnotes, className, style } = props

  const children = useMemo<React.ReactNode>(
    () => renderYozoraNodes(ast.children),
    [ast, renderYozoraNodes],
  )

  return (
    <div
      className={cn(
        'yozora-markdown',
        { 'yozora-markdown--darken': darken },
        className,
      )}
      style={style}
    >
      <section>{children}</section>
      <footer>{footnotes}</footer>
    </div>
  )
}

YozoraMarkdown.propTypes = {
  ast: PropTypes.any.isRequired,
  footnotes: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.any,
}

YozoraMarkdown.displayName = 'YozoraMarkdown'
export default YozoraMarkdown
