import React from 'react'
import Blockquote from '@yozora/react-blockquote'
import Delete from '@yozora/react-delete'
import Emphasis from '@yozora/react-emphasis'
import Heading from '@yozora/react-heading'
import InlineCode from '@yozora/react-inline-code'
import InlineMath from '@yozora/react-inline-math'
import Link from '@yozora/react-link'
import List from '@yozora/react-list'
import ListItem from '@yozora/react-list-item'
import Math from '@yozora/react-math'
import Paragraph from '@yozora/react-paragraph'
import Strong from '@yozora/react-strong'
import Table from '@yozora/react-table'
import TableCell from '@yozora/react-table-cell'
import TableRow from '@yozora/react-table-row'
import Text from '@yozora/react-text'
import ThematicBreak from '@yozora/react-thematic-break'
import CustomCodeEmbed from '../block/code/embed'
import Code from '../block/code/literal'
import CustomCodeLive from '../block/code/live'
import type { MdastPropsNode, MdastPropsRoot } from './types'


export interface MdastRendererProps {
  ast: MdastPropsRoot
}


export function createMdastRenderer(
  rendererMap: Record<string, React.ElementType<any>>,
  displayName = 'MdastRenderer',
): {
  MdastRenderer: (props: MdastRendererProps) => React.ReactElement,
  renderMdastNode: (props: MdastPropsNode, key?: string | number) => React.ReactElement,
} {

  function renderMdastNode(props: MdastPropsNode, key?: string | number): React.ReactElement {
    const Component = rendererMap[props.type]
    if (Component == null) {
      return (
        <Code key={ key } lang="json" value={ JSON.stringify(props, null, 2) } />
      )
    }

    if (props.children != null) {
      const children = props.children
      if (Array.isArray(children)) {
        // eslint-disable-next-line no-param-reassign
        props.children = children.map((o, index) => renderMdastNode(o, index))
      } else {
        // eslint-disable-next-line no-param-reassign
        props.children = renderMdastNode(children)
      }
    }

    return <Component key={ key } { ...props } />
  }

  function MdastRenderer({ ast: node }: MdastRendererProps): React.ReactElement {
    return renderMdastNode(node)
  }

  MdastRenderer.displayName = displayName
  return { MdastRenderer, renderMdastNode }
}


export const defaultMdastRendererMap: Record<string, React.ElementType<any>> = {
  root: 'div',
  blockquote: Blockquote,
  code: Code,
  codeEmbed: CustomCodeEmbed,
  codeLive: CustomCodeLive,
  definition: () => null,
  heading: Heading,
  listItem: ListItem,
  list: List,
  math: Math,
  paragraph: Paragraph,
  table: Table,
  tableRow: TableRow,
  tableCell: TableCell,
  thematicBreak: ThematicBreak,
  inlineCode: InlineCode,
  inlineMath: InlineMath,
  break: 'br',
  delete: Delete,
  emphasis: Emphasis,
  link: Link,
  image: 'img',
  linkReference: Link,
  imageReference: 'img',
  strong: Strong,
  text: Text,
}


export const { MdastRenderer, renderMdastNode } = createMdastRenderer(defaultMdastRendererMap)
export default MdastRenderer
