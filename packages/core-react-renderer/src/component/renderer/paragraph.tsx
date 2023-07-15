import { css, cx } from '@emotion/css'
import type { Paragraph } from '@yozora/ast'
import { ImageReferenceType, ImageType } from '@yozora/ast'
import { tokens } from '@yozora/core-react-theme'
import React from 'react'
import { NodesRenderer } from '../NodesRenderer'

/**
 * Render yozora `paragraph`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#paragraph
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export class ParagraphRenderer extends React.PureComponent<Paragraph> {
  public override render(): React.ReactElement {
    const { children } = this.props

    // If there are some image / imageReferences element in the paragraph,
    // then wrapper the content with div to avoid the warnings such as:
    //
    //  validateDOMNesting(...): <figure> cannot appear as a descendant of <p>.
    const notValidParagraph: boolean = children.some(
      child => child.type === ImageType || child.type === ImageReferenceType,
    )

    if (notValidParagraph) {
      return (
        <div className={classes.paragraphDisplay}>
          <NodesRenderer nodes={children} />
        </div>
      )
    }

    return (
      <p className={classes.paragraph}>
        <NodesRenderer nodes={children} />
      </p>
    )
  }
}

const classes0 = {
  paragraph: css({
    overflow: 'auto hidden',
    padding: 0,
    margin: tokens.marginBlockNode,
    marginBottom: '1em',
    lineHeight: 1.8,
    hyphens: 'auto',
    wordBreak: 'normal',
    letterSpacing: '1px',
    overflowWrap: 'break-word',
    '> :last-child': {
      marginBottom: 0,
    },
  }),
  paragraphDisplay: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
    margin: 0,
  }),
}
const classes = {
  paragraph: cx('yozora-paragraph', classes0.paragraph),
  paragraphDisplay: cx('yozora-paragraph', classes0.paragraph, classes0.paragraphDisplay),
}
