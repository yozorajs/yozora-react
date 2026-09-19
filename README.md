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
    <a href="https://github.com/vitest-dev/vitest">
      <img
        alt="Tested with Vitest"
        src="https://img.shields.io/badge/tested_with-vitest-6E9F18.svg"
      />
    </a>
    <a href="https://biomejs.dev/">
      <img
        alt="Code Style: Biome"
        src="https://img.shields.io/badge/code_style-Biome-60a5fa.svg?style=flat-square"
      />
    </a>
  </div>
</header>

A monorepo contains react components render [Yozora AST Nodes][yozora/admonition]. See
https://yozora.guanghechen.com for details.

Use [@yozora/react-yozora][] to render the [@yozora/ast][yozora/ast].

Choose [@yozora/react-gfm][] for `@yozora/parser-gfm` ASTs, or
[@yozora/react-gfm-ex][] for tables, strikethrough, extended autolinks and task
lists. [@yozora/react-yozora][] adds footnotes, math, admonitions and executable
code. The presets share [@yozora/react][], the rendering kernel. The former
`@yozora/react-markdown` API now lives in `@yozora/react-yozora`.

https://user-images.githubusercontent.com/42513619/129205123-6a1983c4-6a86-4c80-83d6-02bdbf70edbf.mp4

## Component demo

Run `pnpm demo` and open http://127.0.0.1:7302 to test themes, Markdown, the code editor,
and live JSX. See [packages/demo](./packages/demo/README.md) for development commands.

## Styles

Import the stylesheet for the highest-level Yozora component you use:

```tsx
import '@yozora/react-yozora/style.css'
import { ThemeProvider } from '@yozora/react-renderer'
```

Each styled package exports `./style.css`, including its dependency components.
For example, standalone editor users import `@yozora/react-renderer-code/style.css`.
CSS is loaded explicitly so ESM, CommonJS, and server rendering remain usable without
an automatic CSS loader. Keep these imports in your application's CSS entry point.

Styles are compiled with Tailwind CSS v4. The consumer does not need Tailwind, content
scanning, or Emotion. Utilities use the `yz` prefix, and Preflight is excluded. Custom
CSS can target existing `yozora-*` classes and override the `--yozora_*` tokens. Library
rules are unlayered so ordinary host resets do not outrank component selectors.
Utilities follow component rules; use matching specificity or explicit important
utilities when overriding more specific component selectors.
The public `lightSchema` and `darkenSchema` exports still define the theme tokens.

### Migrating from Emotion

- Add the stylesheet import; remove `@emotion/css` if your application no longer uses it.
- Keep `ThemeProvider`, `theme="light"` / `theme="darken"`, `className`, and `style`.
- `ThemeProvider.breakpoints`, `IThemeContext.breakpoints`, and `IBreakpoints` remain
  available. The default small-screen threshold is `479px` in compiled CSS; custom
  `xsMinus` queries render scoped `<style media="...">` elements and work before
  hydration and without JavaScript. Both paths use the same responsive rules.
- For nonce-based CSP, pass the response nonce to `ThemeProvider` through its `nonce`
  prop. Custom breakpoint styles in both the theme and Markdown receive it. Nested
  providers inherit the nonce unless they supply their own.
- `INodeStyleMap` remains available without an Emotion dependency. Custom renderers
  continue to use `INodeRendererMap`, `className`, and React `style` props.
- Tables now render inside `.yozora-table-scroll` for horizontal scrolling. Direct-child
  selectors such as `.yozora-markdown > section > table` need to account for this wrapper;
  descendant selectors such as `.yozora-markdown table` continue to work.
- Minimum supported browsers are Chrome/Edge 111, Safari 16.4, and Firefox 128.
- Runtime JSX previews can use application CSS classes that were included at build
  time; class names created only inside runtime code strings are not compiled on demand.


## Usage

See [@yozora/react-yozora][]

- npm

  ```bash
  npm install --save @yozora/react-yozora
  ```

- yarn

  ```bash
  yarn add @yozora/react-yozora
  ```

```tsx
import loadable from '@loadable/component'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import { ThemeProvider } from '@yozora/react-renderer'
import YozoraParser from '@yozora/parser'
import { MathJaxProvider, Markdown, MarkdownProvider } from '@yozora/react-yozora'

const ImageViewer = loadable(() => import('react-viewer'))

const parser = new YozoraParser()
const ast = parser.parse(`source markdown contents`, { shouldReservePosition: true })
const definitionMap = calcDefinitionMap(ast)
const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)

<MathJaxProvider>
  <ThemeProvider theme="light">
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

| Package Name                | Description                                                                                 |
| :-------------------------- | :------------------------------------------------------------------------------------------ |
| [@yozora/react][]            | Shared document layout and Provider; renderer defaults are supplied by a preset.             |
| [@yozora/react-renderer][]   | AST renderers, theme providers, syntax highlighting, tokens, code-runner types and utilities. |

### AST presets

| Package Name              | AST standard and additions                                          |
| :------------------------ | :------------------------------------------------------------------ |
| [@yozora/react-gfm][]      | `@yozora/parser-gfm` base nodes.                                      |
| [@yozora/react-gfm-ex][]   | GFM plus tables, strikethrough, extended autolinks and task lists.    |
| [@yozora/react-yozora][]   | GFM-Ex plus footnotes, math, admonitions and executable code.         |

### Markdown components

|              Package Name             | Token Name                      |
| :-----------------------------------: | :------------------------------ |
| [@yozora/react-renderer-admonition][] | [admonition][yozora/admonition] |
|    [@yozora/react-renderer-code][]    | [code][yozora/code]             |

`@yozora/react-renderer-code` also exports `CodeEditor`, `CodeEmbed`, `CodeLiteral`, `CodeLive`,
`CopyButton`, and `LightButtons` for standalone use.
See its [component documentation](./renderers/react-renderer-code/README.md#standalone-components).
It also provides [runner factories](./renderers/react-renderer-code/README.md#runners) for Graphviz, JSX, and math.

### Other components

|               Package Name               | Description                                                                    |
| :--------------------------------------: | :----------------------------------------------------------------------------- |
|   [@yozora/react-embed-jsx][]    | React component for rendering jsx directly in browser.                         |
| [@yozora/react-embed-graphviz][] | React component for rendering graphviz (dot) directly in browser.              |
|    [@yozora/react-embed-math][]    | Render formula with mathjax in react.                                          |

<!-- yozora component links -->

[@yozora/react]: ./packages/react
[@yozora/react-gfm]: ./packages/react-gfm
[@yozora/react-gfm-ex]: ./packages/react-gfm-ex
[@yozora/react-renderer]: ./renderers/react-rendrer
[@yozora/react-renderer-admonition]:
  https://github.com/yozorajs/yozora-react/tree/main/renderers/react-renderer-admonition#readme
[@yozora/react-renderer-code]:
  https://github.com/yozorajs/yozora-react/tree/main/renderers/react-renderer-code#readme
[@yozora/react-embed-jsx]:
  https://github.com/yozorajs/yozora-react/tree/main/renderers/react-embed-jsx#readme
[@yozora/react-embed-graphviz]:
  https://github.com/yozorajs/yozora-react/tree/main/renderers/react-embed-graphviz#readme
[@yozora/react-yozora]:
  https://github.com/yozorajs/yozora-react/tree/main/packages/react-yozora#readme
[@yozora/react-embed-math]:
  https://github.com/yozorajs/yozora-react/tree/main/renderers/react-embed-math#readme
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
