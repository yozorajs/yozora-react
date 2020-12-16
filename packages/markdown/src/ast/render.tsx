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
import type { MdastPropsNode } from './types'


/**
 *
 */
export interface MdastNodeRendererProps {
  /**
   *
   */
  ast: MdastPropsNode
}


export function createMdastNodeRenderer(
  rendererMap: Record<string, React.ElementType<any>>,
  displayName = 'MdastNodeRenderer',
): React.FC<MdastNodeRendererProps> {
  function MdastNodeRenderer({ ast: node }: MdastNodeRendererProps): React.ReactElement {
    const Component = rendererMap[node.type]
    if (Component == null) {
      return (
        <Code lang="json" value={ JSON.stringify(node, null, 2) } />
      )
    }

    if (node.children != null) {
      const children = node.children
      if (Array.isArray(children)) {
        // eslint-disable-next-line no-param-reassign
        node.children = children.map((o, index) => <MdastNodeRenderer key={ index } ast={ o } />)
      } else {
        // eslint-disable-next-line no-param-reassign
        node.children = <MdastNodeRenderer ast={ children } />
      }
    }

    return <Component { ...node } />
  }

  MdastNodeRenderer.displayName = displayName
  return MdastNodeRenderer
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


export const MdastNodeRenderer = createMdastNodeRenderer(defaultMdastRendererMap)
export default MdastNodeRenderer
