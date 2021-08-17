import type { FootnoteItem } from '@yozora/react-footnote-definitions'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import React, { useContext, useMemo } from 'react'
import { YozoraMarkdownContext } from './Context'

/**
 * Create footnote definitions.
 * @param footnoteDefinitionsTitle      title of the footnote definitions.
 * @param dontNeedFootnoteDefinitions   if true, then the footnote definitions wont be render.
 * @returns
 */
export function useFootnoteDefinitions(
  footnoteDefinitionsTitle?: React.ReactNode,
  dontNeedFootnoteDefinitions = false,
): React.ReactElement | null {
  const { getFootnoteDefinitions, renderYozoraNodes } = useContext(
    YozoraMarkdownContext,
  )

  const footnotes = useMemo<React.ReactElement | null>(() => {
    if (dontNeedFootnoteDefinitions) return null

    const items: FootnoteItem[] = getFootnoteDefinitions().map(item => ({
      label: item.label,
      identifier: item.identifier,
      children: renderYozoraNodes(item.children),
    }))

    return items.length <= 0 ? null : (
      <YozoraFootnotesRenderer nodes={items} title={footnoteDefinitionsTitle} />
    )
  }, [
    footnoteDefinitionsTitle,
    dontNeedFootnoteDefinitions,
    renderYozoraNodes,
    getFootnoteDefinitions,
  ])
  return footnotes
}
