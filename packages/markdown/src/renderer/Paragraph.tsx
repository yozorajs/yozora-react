import type { IParagraph } from '@yozora/ast'
import { ImageReferenceType, ImageType } from '@yozora/ast'
import Paragraph from '@yozora/react-paragraph'
import React from 'react'
import { YozoraNodesRenderer } from '../YozoraNodesRenderer'

export const YozoraParagraphRenderer: React.FC<IParagraph> = props => {
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
    <Paragraph>
      <YozoraNodesRenderer nodes={children} />
    </Paragraph>
  )
}

YozoraParagraphRenderer.displayName = 'YozoraParagraphRenderer'
