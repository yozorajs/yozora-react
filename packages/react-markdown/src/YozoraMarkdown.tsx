import type { Root as IRoot } from '@yozora/ast'
import { NodesRenderer } from '@yozora/core-react-renderer'
import { YozoraThemeContextType } from '@yozora/core-react-theme'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { FootnoteDefinitions } from './component/FootnoteDefinitions'

export interface IYozoraMarkdownProps {
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

class YozoraMarkdownRenderer extends React.Component<IYozoraMarkdownProps> {
  public override render(): React.ReactElement {
    const { ast, footnoteDefinitionsTitle, dontNeedFootnoteDefinitions, className, style } =
      this.props

    return (
      <div className={className} style={style}>
        <section>
          <NodesRenderer nodes={ast.children} />
        </section>
        <footer>
          <FootnoteDefinitions
            footnoteDefinitionsTitle={footnoteDefinitionsTitle}
            dontNeedFootnoteDefinitions={dontNeedFootnoteDefinitions}
          />
        </footer>
      </div>
    )
  }

  public override shouldComponentUpdate(nextProps: IYozoraMarkdownProps): boolean {
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
}

/**
 * Render yozora markdown ast in react components.
 *
 * @param props
 * @returns
 */
export const YozoraMarkdown: React.FC<IYozoraMarkdownProps> = props => {
  const { theme } = React.useContext(YozoraThemeContextType)
  const darken: boolean = theme === 'darken'

  const className = cn('yozora-markdown', { 'yozora-markdown--darken': darken }, props.className)
  return <YozoraMarkdownRenderer {...props} className={className} />
}

YozoraMarkdown.propTypes = {
  ast: PropTypes.any.isRequired,
  footnoteDefinitionsTitle: PropTypes.node,
  dontNeedFootnoteDefinitions: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.any,
}

YozoraMarkdown.displayName = 'YozoraMarkdown'
export default YozoraMarkdown
