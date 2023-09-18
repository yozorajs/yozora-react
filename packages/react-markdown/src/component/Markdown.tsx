import { cx } from '@emotion/css'
import type { Root as IRoot } from '@yozora/ast'
import { NodesRenderer } from '@yozora/core-react-renderer'
import PropTypes from 'prop-types'
import React from 'react'
import { useStyles } from '../style'
import { FootnoteDefinitions } from './FootnoteDefinitions'

export interface IMarkdownProps {
  /**
   * Root node of Yozora Markdown AST.
   */
  ast: IRoot
  /**
   * Title of the footnote definitions.
   */
  footnoteDefinitionsTitle?: React.ReactNode
  /**
   * if true, then the footnote definitions wont be render.
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

export class Markdown extends React.Component<IMarkdownProps> {
  public static displayName = 'YozoraMarkdown'
  public static propTypes = {
    ast: PropTypes.any.isRequired,
    footnoteDefinitionsTitle: PropTypes.node,
    dontNeedFootnoteDefinitions: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.any,
  }

  public override shouldComponentUpdate(nextProps: IMarkdownProps): boolean {
    const prevProps = this.props
    return (
      prevProps.ast !== nextProps.ast ||
      prevProps.dontNeedFootnoteDefinitions !== nextProps.dontNeedFootnoteDefinitions ||
      (!nextProps.dontNeedFootnoteDefinitions &&
        prevProps.footnoteDefinitionsTitle !== nextProps.footnoteDefinitionsTitle) ||
      prevProps.className !== nextProps.className ||
      prevProps.style !== nextProps.style
    )
  }

  public override render(): React.ReactElement {
    const { ast, footnoteDefinitionsTitle, dontNeedFootnoteDefinitions, className, style } =
      this.props

    return (
      <MarkdownRoot className={className} style={style}>
        <section>
          <NodesRenderer nodes={ast.children} />
        </section>
        <footer>
          <FootnoteDefinitions
            footnoteDefinitionsTitle={footnoteDefinitionsTitle}
            dontNeedFootnoteDefinitions={dontNeedFootnoteDefinitions}
          />
        </footer>
      </MarkdownRoot>
    )
  }
}

interface IMarkdownRootProps {
  Element?: React.ElementType
  className?: string
  itemProp?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const MarkdownRoot: React.FC<IMarkdownRootProps> = props => {
  const { Element = 'div', className, itemProp, style, children } = props
  const cls: string = cx('yozora-markdown', useStyles(), className)
  return (
    <Element className={cls} style={style} itemProp={itemProp}>
      {children}
    </Element>
  )
}
