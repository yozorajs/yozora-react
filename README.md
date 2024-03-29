<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react#readme">Yozora React</a>
  </h1>
  <div align="center">
    <a href="#license">
      <img
        alt="License"
        src="https://img.shields.io/github/license/guanghechen/yozora-react"
      />
    </a>
    <a href="https://github.com/yozorajs/yozora-react/search?l=typescript">
      <img
        alt="Github Top Language"
        src="https://img.shields.io/github/languages/top/guanghechen/yozora-react"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/react-blockquote"
      />
    </a>
    <a href="https://github.com/yozorajs/yozora-react/actions/workflows/ci.yml">
      <img
        alt="CI Workflow"
        src="https://github.com/yozorajs/yozora-react/actions/workflows/ci.yml/badge.svg"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-blockquote/peer/react"
      />
    </a>
    <a href="https://github.com/facebook/jest">
      <img
        alt="Tested with Jest"
        src="https://img.shields.io/badge/tested_with-jest-9c465e.svg"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>

A monorepo contains react components render [Yozora AST Nodes][yozora/admonition]. See
https://yozora.guanghechen.com for details.

Use [@yozora/react-markdown][] to render the [@yozora/ast][yozora/ast].

https://user-images.githubusercontent.com/42513619/129205123-6a1983c4-6a86-4c80-83d6-02bdbf70edbf.mp4

## Usage

See [@yozora/react-markdown][]

- npm

  ```bash
  npm install --save @yozora/react-markdown
  ```

- yarn

  ```bash
  yarn add @yozora/react-markdown
  ```

```tsx
import loadable from '@loadable/component'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import { Theme, ThemeProvider } from '@yozora/core-react-theme'
import YozoraParser from '@yozora/parser'
import { MathJaxProvider, Markdown, MarkdownProvider } from '@yozora/react-markdown'

const ImageViewer = loadable(() => import('react-viewer'))

const parser = new YozoraParser()
const ast = parser.parse(`source markdown contents`, { shouldReservePosition: true })
const definitionMap = calcDefinitionMap(ast)
const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)

<MathJaxProvider>
  <ThemeProvider theme={Theme.LIGHT}>
    <MarkdownProvider
      definitionMap={definitionMap}
      footnoteDefinitionMap={footnoteDefinitionMap}
      ImageViewer={ImageViewer}
    >
      <Markdown ast={ast} />
    </MarkdownProvider>
  </ThemeProvider>
</MathJaxProvider>
```

## Overview

## Core

|          Package Name           | Description                                             |
| :-----------------------------: | :------------------------------------------------------ |
| [@yozora/core-react-renderer][] | Provider `NodesRenderer` and simple markdown renderers. |
|  [@yozora/core-react-theme][]   | Provider markdown theme context.                        |

### Markdown components

|         Package Name         | Token Name                      |
| :--------------------------: | :------------------------------ |
| [@yozora/react-admonition][] | [admonition][yozora/admonition] |
|    [@yozora/react-code][]    | [code][yozora/code]             |

### Other components

|               Package Name               | Description                                                                    |
| :--------------------------------------: | :----------------------------------------------------------------------------- |
|      [@yozora/react-code-editor][]       | A simple code editor.                                                          |
|       [@yozora/react-code-embed][]       | A simple code editor online.                                                   |
|    [@yozora/react-code-highlighter][]    | Highlight codes.                                                               |
|      [@yozora/react-code-literal][]      | Render literal code block.                                                     |
|       [@yozora/react-code-live][]        | A live code editor, be similar to [react-live][].                              |
|   [@yozora/react-code-renderer-jsx][]    | React component for rendering jsx directly in browser.                         |
| [@yozora/react-code-renderer-graphviz][] | React component for rendering graphviz (dot) directly in browser.              |
|        [@yozora/react-markdown][]        | React component for rendering markdown content with above Markdown Components. |
|        [@yozora/react-mathjax][]         | Render formula with mathjax in react.                                          |

[react-live]: https://github.com/FormidableLabs/react-live

<!-- yozora component links -->

[@yozora/core-react-renderer]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/core-react-renderer#readme
[@yozora/core-react-theme]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/core-react-theme#readme
[@yozora/react-admonition]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-admonition#readme
[@yozora/react-code]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code#readme
[@yozora/react-code-editor]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-editor#readme
[@yozora/react-code-embed]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-embed#readme
[@yozora/react-code-highlighter]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-highlighter#readme
[@yozora/react-code-literal]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-literal#readme
[@yozora/react-code-live]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-live#readme
[@yozora/react-code-renderer-jsx]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-renderer-jsx#readme
[@yozora/react-code-renderer-graphviz]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-renderer-graphviz#readme
[@yozora/react-markdown]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-markdown#readme
[@yozora/react-mathjax]:
  https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-mathjax#readme
[yozora/ast]: https://www.npmjs.com/package/@yozora/ast
[yozora/admonition]: https://www.npmjs.com/package/@yozora/ast#admonition
[yozora/blockquote]: https://www.npmjs.com/package/@yozora/ast#blockquote
[yozora/break]: https://www.npmjs.com/package/@yozora/ast#break
[yozora/code]: https://www.npmjs.com/package/@yozora/ast#code
[yozora/delete]: https://www.npmjs.com/package/@yozora/ast#delete
[yozora/emphasis]: https://www.npmjs.com/package/@yozora/ast#emphasis
[yozora/footnote-definition]: https://www.npmjs.com/package/@yozora/ast#footnotedefinition
[yozora/footnote-reference]: https://www.npmjs.com/package/@yozora/ast#footnotereference
[yozora/heading]: https://www.npmjs.com/package/@yozora/ast#heading
[yozora/html]: https://www.npmjs.com/package/@yozora/ast#html
[yozora/image]: https://www.npmjs.com/package/@yozora/ast#image
[yozora/image-reference]: https://www.npmjs.com/package/@yozora/ast#imagereference
[yozora/inline-code]: https://www.npmjs.com/package/@yozora/ast#inlinecode
[yozora/inline-math]: https://www.npmjs.com/package/@yozora/ast#inlinemath
[yozora/link]: https://www.npmjs.com/package/@yozora/ast#link
[yozora/link-reference]: https://www.npmjs.com/package/@yozora/ast#linkreference
[yozora/definition]: https://www.npmjs.com/package/@yozora/ast#definition
[yozora/list]: https://www.npmjs.com/package/@yozora/ast#list
[yozora/list-item]: https://www.npmjs.com/package/@yozora/ast#listitem
[yozora/math]: https://www.npmjs.com/package/@yozora/ast#math
[yozora/paragraph]: https://www.npmjs.com/package/@yozora/ast#paragraph
[yozora/setext-heading]: https://www.npmjs.com/package/@yozora/ast#setextheading
[yozora/table]: https://www.npmjs.com/package/@yozora/ast#table
[yozora/table-cell]: https://www.npmjs.com/package/@yozora/ast#tablecell
[yozora/table-row]: https://www.npmjs.com/package/@yozora/ast#tablerow
[yozora/text]: https://www.npmjs.com/package/@yozora/ast#text
[yozora/thematic-break]: https://www.npmjs.com/package/@yozora/ast#thematicbreak
