[![npm version](https://img.shields.io/npm/v/@yozora/react-markdown.svg)](https://www.npmjs.com/package/@yozora/react-markdown)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-markdown.svg)](https://www.npmjs.com/package/@yozora/react-markdown)
[![npm license](https://img.shields.io/npm/l/@yozora/react-markdown.svg)](https://www.npmjs.com/package/@yozora/react-markdown)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-markdown)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-markdown/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-markdown/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-markdown`

This component is designed to render markdown data


## Install

* npm

  ```bash
  npm install --save @yozora/react-markdown
  ```

* yarn

  ```bash
  yarn add @yozora/react-markdown
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Markdown from '@yozora/react-markdown'

      const wrapper = (
        <article className={ classes.compMarkdown }>
          <Markdown ast={ props.ast } />
        </article>
      )
      ```

    - Custom render

      ```tsx
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
      import {
        MdastRendererProps,
        createMdastRenderer,
        defaultMdastRendererMap,
      } from '@yozora/react-markdown'
      import Math from '@yozora/react-math'
      import Paragraph from '@yozora/react-paragraph'
      import Strong from '@yozora/react-strong'
      import Table from '@yozora/react-table'
      import TableCell from '@yozora/react-table-cell'
      import TableRow from '@yozora/react-table-row'
      import Text from '@yozora/react-text'
      import ThematicBreak from '@yozora/react-thematic-break'
      import CustomCodeEmbed from './block/code/embed'
      import Code from './block/code/literal'
      import CustomCodeLive from './block/code/live'

      export const MarkdownRenderer: (props: MdastRendererProps) => React.ReactElement
        = createMdastRenderer({
          root: 'div',
          blockquote: Blockquote,
          code: defaultMdastRendererMap.Code,
          codeEmbed: defaultMdastRendererMap.CodeEmbed,
          codeLive: defaultMdastRendererMap.CodeLive,
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
          linkReference: 'a',
          imageReference: 'img',
          strong: Strong,
          text: Text,
        })

      const wrapper = (
        <article className={ classes.compMarkdown }>
          <Markdown ast={ props.ast } render={ MarkdownRenderer } />
        </article>
      )
      ```

  * Props

     Name       | Type                                                | Required  | Default           | Description
    :----------:|:---------------------------------------------------:|:---------:|:-----------------:|:-------------
     `ref`      | `React.RefObject<HTMLDivElement>`                   | `false`   | -                 | Forwarded ref callback
     `ast`      | [MdastPropsRoot][]                                  | `true`    | -                 | Component props one-to-one corresponding to mdast
     `render`   | `(props: MdastRendererProps) => React.ReactElement` | `false`   | [MdastRenderer][] |

    MarkdownProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)


## References

  - [mdast][]


[mdast]: https://github.com/syntax-tree/mdast
[MdastPropsRoot]: https://github.com/guanghechen/yozora-react/blob/master/packages/markdown/src/ast/types.ts
[MdastRenderer]: https://github.com/guanghechen/yozora-react/blob/master/packages/markdown/src/ast/render.tsx
