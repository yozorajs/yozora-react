import FootnoteDefinition from '@yozora/react-footnote-definition'
import cn from 'clsx'
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

  const { footnoteDefinitions } = React.useContext(YozoraMarkdownContextType)

  const children = React.useMemo<React.ReactNode>(
    () =>
      footnoteDefinitions.map((item, idx) => (
        <FootnoteDefinition
          key={idx}
          label={item.label ?? item.identifier}
          identifier={item.identifier}
        >
          <YozoraNodesRenderer nodes={item.children} />
        </FootnoteDefinition>
      )),
    [footnoteDefinitions],
  )

  if (dontNeedFootnoteDefinitions || footnoteDefinitions.length <= 0) return null

  return (
    <div className={cn('yozora-footnote-definitions', className)} style={style}>
      <div className="yozora-footnote-definitions__title">{footnoteDefinitionsTitle}</div>
      <ul className="yozora-footnote-definitions__main">{children}</ul>
    </div>
  )
}
