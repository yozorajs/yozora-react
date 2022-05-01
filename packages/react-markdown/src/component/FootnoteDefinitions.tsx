import type { FootnoteDefinition } from '@yozora/ast'
import { useNodeRendererContext } from '@yozora/core-react-renderer'
import React from 'react'
import { FootnoteDefinitionRenderer } from './renderer/footnoteDefinition'

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

export const FootnoteDefinitions: React.FC<IFootnoteDefinitionsProps> = props => {
  const { footnoteDefinitionsTitle, dontNeedFootnoteDefinitions = false } = props
  const { footnoteDefinitionMap } = useNodeRendererContext()

  const children = React.useMemo<React.ReactNode>(() => {
    // Get all of footnote reference definitions.
    const footnoteDefinitions: ReadonlyArray<FootnoteDefinition> =
      Object.values(footnoteDefinitionMap)
    if (footnoteDefinitions.length <= 0) return null

    return footnoteDefinitions.map(item => (
      <li key={item.identifier} id={item.identifier}>
        <FootnoteDefinitionRenderer {...item} />
      </li>
    ))
  }, [footnoteDefinitionMap])

  if (dontNeedFootnoteDefinitions || children === null) return null

  return (
    <div className="yozora-footnote-definitions">
      <div className="yozora-footnote-definitions__title">{footnoteDefinitionsTitle}</div>
      <ul className="yozora-footnote-definitions__main">{children}</ul>
    </div>
  )
}
