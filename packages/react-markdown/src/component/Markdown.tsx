import type { Root as IRoot } from '@yozora/ast'
import { NodesRenderer, clsx, getBreakpointId, useThemeContext } from '@yozora/react'
import React from 'react'
import { getSmallScreenStyles } from '../small-screen'
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
  const { breakpoints, nonce } = useThemeContext()
  const query = breakpoints.xsMinus
  const breakpoint = getBreakpointId(query)
  /** Custom elements only need to forward the original className prop for responsive styles. */
  const cls: string = clsx(
    'yozora-markdown',
    breakpoint && 'yozora-markdown--custom-breakpoint',
    breakpoint,
    className,
  )
  return (
    <Element className={cls} style={style} itemProp={itemProp}>
      {children}
      {breakpoint !== undefined && (
        <style
          // Reinsertion lets the browser check CSP again when the nonce changes.
          key={nonce}
          media={`screen and ${query}`}
          nonce={nonce}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Fixed CSS and a hex-encoded id need raw output for React 17/18 SSR.
          dangerouslySetInnerHTML={{
            __html: getSmallScreenStyles(`.${breakpoint}`),
          }}
        />
      )}
    </Element>
  )
}
