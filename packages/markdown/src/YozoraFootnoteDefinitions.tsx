import type { FootnoteDefinition } from '@yozora/ast'
import { NodesRenderer, useNodeRendererContext } from '@yozora/core-react-renderer'
import FootnoteDefinitionRenderer from '@yozora/react-footnote-definition'
import cn from 'clsx'
import React from 'react'

export interface IFootnoteDefinitionsProps {
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
  /**
   * If true, then the footnote definitions wont be render.
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

export const YozoraFootnoteDefinitions: React.FC<IFootnoteDefinitionsProps> = props => {
  const { footnoteDefinitionsTitle, dontNeedFootnoteDefinitions = false, className, style } = props
  const { footnoteDefinitionMap } = useNodeRendererContext()

  const children = React.useMemo<React.ReactNode>(() => {
    // Get all of footnote reference definitions.
    const footnoteDefinitions: ReadonlyArray<FootnoteDefinition> =
      Object.values(footnoteDefinitionMap)
    if (footnoteDefinitions.length <= 0) return null

    return footnoteDefinitions.map((item, idx) => (
      <FootnoteDefinitionRenderer
        key={idx}
        label={item.label ?? item.identifier}
        identifier={item.identifier}
      >
        <NodesRenderer nodes={item.children} />
      </FootnoteDefinitionRenderer>
    ))
  }, [footnoteDefinitionMap])

  if (dontNeedFootnoteDefinitions || children === null) return null

  return (
    <div className={cn('yozora-footnote-definitions', className)} style={style}>
      <div className="yozora-footnote-definitions__title">{footnoteDefinitionsTitle}</div>
      <ul className="yozora-footnote-definitions__main">{children}</ul>
    </div>
  )
}
