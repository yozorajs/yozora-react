import type { Root } from '@yozora/ast'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'
import { useFootnoteDefinitions } from './useFootnoteDefinitions'

export interface YozoraMarkdownProps {
  /**
   * Root node of Yozora Markdown AST.
   */
  ast: Root
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
  /**
   * if true, then the footnote definitions wont be render.
   */
  dontNeedFootnoteDefinitions?: boolean
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
  const {
    ast,
    footnoteDefinitionsTitle,
    dontNeedFootnoteDefinitions,
    className,
    style,
  } = props

  const footnotes = useFootnoteDefinitions(
    footnoteDefinitionsTitle,
    dontNeedFootnoteDefinitions,
  )

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
  footnoteDefinitionsTitle: PropTypes.node,
  dontNeedFootnoteDefinitions: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.any,
}

YozoraMarkdown.displayName = 'YozoraMarkdown'
export default YozoraMarkdown
