import type { Paragraph } from '@yozora/ast'
import { ImageReferenceType, ImageType } from '@yozora/ast'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

/**
 * Render yozora `paragraph`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#paragraph
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export const ParagraphRenderer: React.FC<Paragraph> = props => {
  const { children } = props

  // If there are some image / imageReferences element in the paragraph,
  // then wrapper the content with div to avoid the warnings such as:
  //
  //  validateDOMNesting(...): <figure> cannot appear as a descendant of <p>.
  const notValidParagraph: boolean = children.some(
    child => child.type === ImageType || child.type === ImageReferenceType,
  )

  if (notValidParagraph) {
    return (
      <div className="yozora-paragraph yozora-paragraph--display">
        <YozoraNodesRenderer nodes={children} />
      </div>
    )
  }

  return (
    <p className="yozora-paragraph">
      <YozoraNodesRenderer nodes={children} />
    </p>
  )
}
