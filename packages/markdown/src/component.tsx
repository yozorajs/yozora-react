import type { Root } from '@yozora/ast'
import { collectFootnoteDefinitions } from '@yozora/ast-util'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import type { FootnoteItem } from '@yozora/react-footnote-definitions'
import cn from 'clsx'
import React, { useContext, useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'

export interface MarkdownProps {
  /**
   * Root node of Yozora Markdown AST.
   */
  ast: Root
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
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
export function YozoraMarkdown(props: MarkdownProps): React.ReactElement {
  const { ast, footnoteDefinitionsTitle, className, style } = props

  const { darken, renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const children = useMemo(
    () => renderYozoraNodes(ast.children),
    [renderYozoraNodes, ast.children],
  )

  const footnotes = useMemo<React.ReactNode>(() => {
    const items: FootnoteItem[] = collectFootnoteDefinitions(ast).map(item => ({
      label: item.label,
      identifier: item.identifier,
      children: renderYozoraNodes(item.children),
    }))

    return items.length <= 0 ? null : (
      <YozoraFootnotesRenderer nodes={items} title={footnoteDefinitionsTitle} />
    )
  }, [renderYozoraNodes, footnoteDefinitionsTitle, ast])

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

YozoraMarkdown.displayName = 'YozoraMarkdown'
export default YozoraMarkdown
