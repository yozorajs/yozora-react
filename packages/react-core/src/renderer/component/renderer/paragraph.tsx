import type { Node, Paragraph } from '@yozora/ast'
import { ImageReferenceType, ImageType } from '@yozora/ast'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `paragraph`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#paragraph
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export class ParagraphRenderer extends React.Component<Paragraph> {
  public override shouldComponentUpdate(nextProps: Readonly<Paragraph>): boolean {
    const props = this.props
    return props.children !== nextProps.children
  }

  public override render(): React.ReactElement {
    const childNodes: Node[] = this.props.children

    // If there are some image / imageReferences element in the paragraph,
    // then wrapper the content with div to avoid the warnings such as:
    //
    //  validateDOMNesting(...): <figure> cannot appear as a descendant of <p>.
    const notValidParagraph: boolean = childNodes.some(
      child => child.type === ImageType || child.type === ImageReferenceType,
    )

    if (notValidParagraph) {
      return (
        <div className={classes.paragraphDisplay}>
          <NodesRenderer nodes={childNodes} />
        </div>
      )
    }

    return (
      <p className={classes.paragraph}>
        <NodesRenderer nodes={childNodes} />
      </p>
    )
  }
}

const classes = {
  paragraph: 'yozora-paragraph yozora-paragraph__root',
  paragraphDisplay: 'yozora-paragraph yozora-paragraph__root yozora-paragraph__display',
}
