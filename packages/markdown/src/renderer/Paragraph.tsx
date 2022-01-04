import type { IParagraph } from '@yozora/ast'
import { ImageReferenceType, ImageType } from '@yozora/ast'
import ParagraphRenderer from '@yozora/react-paragraph'
import React, { useContext } from 'react'
import { YozoraMarkdownContext } from '../context/context'

export function YozoraParagraph(paragraph: IParagraph): React.ReactElement {
  const { renderYozoraNodes } = useContext(YozoraMarkdownContext)
  const { children } = paragraph

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
        {renderYozoraNodes(children)}
      </div>
    )
  }

  return <ParagraphRenderer>{renderYozoraNodes(children)}</ParagraphRenderer>
}

YozoraParagraph.displayName = 'YozoraParagraph'
export default YozoraParagraph
