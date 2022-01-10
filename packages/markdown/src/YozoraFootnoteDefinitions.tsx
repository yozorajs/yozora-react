import type { IFootnoteItem } from '@yozora/react-footnote-definitions'
import YozoraFootnotesRenderer from '@yozora/react-footnote-definitions'
import React from 'react'
import { YozoraMarkdownContextType } from './context/context'
import { YozoraNodesRenderer } from './YozoraNodesRenderer'

export interface IFootnoteDefinitionsProps {
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
  /**
   * If true, then the footnote definitions wont be render.
   */
  dontNeedFootnoteDefinitions?: boolean
}

export const YozoraFootnoteDefinitions: React.FC<IFootnoteDefinitionsProps> = props => {
  const { footnoteDefinitionsTitle, dontNeedFootnoteDefinitions = false } = props

  const { footnoteDefinitions } = React.useContext(YozoraMarkdownContextType)

  const items: IFootnoteItem[] = React.useMemo(
    () =>
      footnoteDefinitions.map((item, idx) => ({
        label: item.label,
        identifier: item.identifier,
        children: <YozoraNodesRenderer key={idx} nodes={item.children} />,
      })),
    [footnoteDefinitions],
  )

  if (dontNeedFootnoteDefinitions || footnoteDefinitions.length <= 0) return null

  return <YozoraFootnotesRenderer nodes={items} title={footnoteDefinitionsTitle} />
}
