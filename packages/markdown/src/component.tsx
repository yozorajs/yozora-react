import type { Root } from '@yozora/ast'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import type { FootnoteItem } from '@yozora/react-footnote-definitions'
import cn from 'clsx'
import React, { useContext, useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'

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
export function YozoraMarkdown(props: YozoraMarkdownProps): React.ReactElement {
  const { darken, getFootnoteDefinitions, renderYozoraNodes } = useContext(
    YozoraMarkdownContext,
  )
  const { ast, footnoteDefinitionsTitle, className, style } = props

  const children = useMemo<React.ReactNode>(
    () => renderYozoraNodes(ast.children),
    [ast, renderYozoraNodes],
  )

  const footnotes = useMemo<React.ReactNode>(() => {
    const items: FootnoteItem[] = getFootnoteDefinitions().map(item => ({
      label: item.label,
      identifier: item.identifier,
      children: renderYozoraNodes(item.children),
    }))
    return items.length <= 0 ? null : (
      <YozoraFootnotesRenderer nodes={items} title={footnoteDefinitionsTitle} />
    )
  }, [footnoteDefinitionsTitle, renderYozoraNodes, getFootnoteDefinitions])

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
