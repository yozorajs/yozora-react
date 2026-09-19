import type { IMarkdownProps as ICoreMarkdownProps } from '@yozora/react'
import { Markdown as CoreMarkdown } from '@yozora/react'
import React from 'react'
import type { IFootnoteDefinitionsProps } from './FootnoteDefinitions'
import { FootnoteDefinitions } from './FootnoteDefinitions'

export interface IMarkdownProps
  extends Omit<ICoreMarkdownProps, 'footer'>,
    IFootnoteDefinitionsProps {}

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
    const { footnoteDefinitionsTitle, dontNeedFootnoteDefinitions, ...rest } = this.props
    return (
      <CoreMarkdown
        {...rest}
        footer={
          <FootnoteDefinitions
            footnoteDefinitionsTitle={footnoteDefinitionsTitle}
            dontNeedFootnoteDefinitions={dontNeedFootnoteDefinitions}
          />
        }
      />
    )
  }
}
