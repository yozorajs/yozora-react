<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/markdown#readme">@yozora/react-markdown</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-markdown">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-markdown.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-markdown">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-markdown.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-markdown">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-markdown.svg"
      />
    </a>
    <a href="#install">
      <img
        alt="Module formats: cjs, esm"
        src="https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/react-markdown"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-markdown/peer/react"
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
<br/>

This component is designed to render data of [@yozora/ast][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-markdown 
  ```

* yarn

  ```bash
  yarn add @yozora/react-markdown @yozora/ast @yozora/ast-util
  ```

## Usage

* This component supports to preview all images in markdown documents with 
  [react-viewer][]. In order to be able to use [react-viewer] in React SSR, 
  you will need the [@loadable/component].

  ```yarn
  yarn add react-viewer @loadable/component
  ```

  to use it with the following code snippet:

  ```tsx
  import loadable from '@loadable/component'
  import Markdown, { MathJaxProvider } from '@yozora/react-markdown'
  import '@yozora/react-markdown/lib/esm/index.css'

  const Viewer = loadable(() => import('react-viewer'))

  <MathJaxProvider>
    <Markdown 
      Viewer={Viewer}
      {...otherProps} 
    />
  </MathJaxProvider>
  ```

* In additional, if you want to render a markdown source contents from scratch, 
  you will need the [@yozora/parser][] to resolve the literal contents into mdast.

  Then, you will need [@yozora/ast-util][] to collect the
  [link definition][@yozora/tokenizer-definition] map and the
  [footnote-definition][@yozora/tokenizer-footnote-definition] map.

  ```yarn
  yarn add @yozora/parser @yozora/ast-util @yozora/ast
  ``` 

  to integrated them with the following code snippet:

  ```typescript
  import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
  import YozoraParser from '@yozora/parser'
  import Markdown, { MathJaxProvider } from '@yozora/react-markdown'
  import '@yozora/react-markdown/lib/esm/index.css'

  const parser = new YozoraParser({
    defaultParseOptions: { shouldReservePosition: false },
  })

  const ast = parser.parse(`source markdown contents`)
  const definitionMap = calcDefinitionMap(ast)
  const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)

  <MathJaxProvider>
    <Markdown 
      ast={ast} 
      definitionMap={definitionMap} 
      footnoteDefinitionMap={footnoteDefinitionMap} 
      {...otherProps} 
    />
  </MathJaxProvider>
  ```

### Demo

* Basic:

  ```tsx
  import React from 'react'
  import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
  import loadable from '@loadable/component'
  import YozoraParser from '@yozora/parser'
  import Markdown, { MathJaxProvider } from '@yozora/react-markdown'
  import '@yozora/react-markdown/lib/esm/index.css'

  const Viewer = loadable(() => import('react-viewer'))

  const parser = new YozoraParser({
    defaultParseOptions: { shouldReservePosition: false },
  })

  const sourceContents = `markdown contents`
  const ast = parser.parse(sourceContents)

  const definitionMap = calcDefinitionMap(ast)
  const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)

  const wrapper = (
    <MathJaxProvider mathjaxSrc="https://cdn.jsdelivr.net/npm/mathjax@2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
      <Markdown 
        ast={ast} 
        definitionMap={definitionMap} 
        footnoteDefinitionMap={footnoteDefinitionMap}
        Viewer={Viewer}
      />
    </MathJaxProvider>
  )
  ```

* Customize renderer map:

  ```tsx
  import React from 'react'
  import { Route } from 'react-route-dom'
  import { LinkReferenceType, LinkType } from '@yozora/ast'
  import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
  import YozoraParser from '@yozora/parser'
  import type { LinkProps } from '@yozora/react-link'
  import type { TokenRendererMap } from '@yozora/react-markdown'
  import Markdown from '@yozora/react-markdown'
  import '@yozora/react-markdown/lib/esm/index.css'

  const parser = new YozoraParser({
    defaultParseOptions: { shouldReservePosition: false },
  })

  const sourceContents = `markdown contents`
  const ast = parser.parse(sourceContents)
  const definitionMap = calcDefinitionMap(ast)
  const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)
  const customRendererMap: Partial<TokenRendererMap> = {
    [LinkType]: function renderLink(link, key, ctx) {
      const { url, title } = link
      return (
        <InternalLink key={key} url={url} title={title}>
          {ctx.renderNodes(link.children)}
        </InternalLink>
      )
    },
    [LinkReferenceType]: function renderLinkReference(linkReference, key, ctx) {
      const definition: Omit<Definition, 'type'> =
        ctx.getDefinition(linkReference.identifier) ?? ({} as any)
      const { url = '', title } = definition
      return (
        <InternalLink key={key} url={url} title={title}>
          {ctx.renderNodes(linkReference.children)}
        </InternalLink>
      )
    },
  }

  const wrapper = (
    <MathJaxProvider>
      <Markdown 
        rendererMap={customRendererMap} 
        definitionMap={definitionMap} 
        footnoteDefinitionMap={footnoteDefinitionMap}
        ast={ast} 
      />
    </MathJaxProvider>
  )

  function InternalLink(props: LinkProps): React.ReactElement {
    const { children, className, url, title, ...htmlProps } = props
    return (
      <Route
        {...htmlProps}
        className={cn('yozora-link', className)}
        to={url}
        title={title}
        replace={true}
      >
        {children}
      </Route>
    )
  }
  ```

### Props


Name                    | Type                  | Required  | Default | Description
:----------------------:|:---------------------:|:---------:|:-------:|:-------------
`ast`                   | See below             | `true`    | -       | Root node of [@yozora/ast][]
`definitionMap`         | See below             | `true`    | -       | Link / Image reference definitions
`footnoteDefinitionMap` | See below             | `true`    | -       | Footnote reference definitions
`mathjaxSrc`            | `string`              | `false`   | -       | http / https url for loading mathjax
`mathjaxConfig`         | `object`              | `false`   | -       | Mathjax config, see [@yozora/react-mathjax][]
`mathjaxOptions`        | `object`              | `false`   | -       | Mathjax options, see [@yozora/react-mathjax][]
`rendererMap`           | See below             | `false`   | -       | [@yozora/ast] renderer map
`codeRunners`           | See below             | `false`   | -       | Code runners, passed to [@yozora/react-code-embed][] and [@yozora/react-code-live][] 
`className`             | `string`              | `false`   | -       | Root css class
`style`                 | `React.CSSProperties` | `false`   | -       | Root css style
`Viewer`                | [react-viewer][]      | `false`   | -       | Image previewer

* `ast`: 

  ```typescript
  import type { Root } from '@yozora/ast'
  const ast: Root

  // Parse source contents into ast
  import YozoraParser from '@yozora/parser'
  const parser = new YozoraParser({
    defaultParseOptions: { shouldReservePosition: false },
  })
  const ast = parser.parse(`source markdown contents`)
  ```

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-markdown'`.

* `definitionMap`: 

  ```typescript
  import type { Definition } from '@yozora/ast'
  const definitionMap: Record<string, Definition>

  // Collect from ast
  import { calcDefinitionMap } from '@yozora/ast-util'
  const definitionMap = calcDefinitionMap(ast)
  ```

* `footnoteDefinitionMap`: 

  ```typescript
  import type { FootnoteDefinition } from '@yozora/ast'
  const footnoteDefinitionMap: Record<string, FootnoteDefinition>

  // Collect from ast
  import { calcFootnoteDefinitionMap } from '@yozora/ast-util'
  const definitionMap = calcFootnoteDefinitionMap(ast)
  ```

* `rendererMap`: 

  ```typescript
  import type { TokenRendererMap } from '@yozora/react-markdown'
  const rendererMap: Partial<TokenRendererMap>
  ```

* `Viewer`

  ```typescript
  import loadable from '@loadable/component'
  import Markdown from '@yozora/markdown'

  const Viewer = loadable(() => import('react-viewer')
  ```

### Overview

This component has some built-in sub-components for rendering data of [@yozora/ast]. 

* [@yozora/react-admonition][]
* [@yozora/react-blockquote][]
* [@yozora/react-break][]
* [@yozora/react-code][]
* [@yozora/react-delete][]
* [@yozora/react-emphasis][]
* [@yozora/react-footnote-definitions][]
* [@yozora/react-footnote-reference][]
* [@yozora/react-heading][]
* [@yozora/react-image][]
* [@yozora/react-inline-code][]
* [@yozora/react-inline-math][]
* [@yozora/react-link][]
* [@yozora/react-list][]
* [@yozora/react-list-item][]
* [@yozora/react-math][]
* [@yozora/react-paragraph][]
* [@yozora/react-strong][]
* [@yozora/react-table][]
* [@yozora/react-text][]
* [@yozora/react-thematic-break][]

## Related

* [mdast][]
* [@yozora/ast][]
* [@yozora/tokenizer-admonition][]
* [@yozora/tokenizer-autolink][]
* [@yozora/tokenizer-autolink-extension][]
* [@yozora/tokenizer-blockquote][]
* [@yozora/tokenizer-break][]
* [@yozora/tokenizer-definition][]
* [@yozora/tokenizer-delete][]
* [@yozora/tokenizer-emphasis][]
* [@yozora/tokenizer-fenced-block][]
* [@yozora/tokenizer-footnote][]
* [@yozora/tokenizer-footnote-definition][]
* [@yozora/tokenizer-footnote-reference][]
* [@yozora/tokenizer-heading][]
* [@yozora/tokenizer-image][]
* [@yozora/tokenizer-image-reference][]
* [@yozora/tokenizer-indented-block][]
* [@yozora/tokenizer-inline-code][]
* [@yozora/tokenizer-inline-math][]
* [@yozora/tokenizer-link][]
* [@yozora/tokenizer-link-reference][]
* [@yozora/tokenizer-list][]
* [@yozora/tokenizer-list-item][]
* [@yozora/tokenizer-math][]
* [@yozora/tokenizer-paragraph][]
* [@yozora/tokenizer-setext-heading][]
* [@yozora/tokenizer-table][]
* [@yozora/tokenizer-text][]
* [@yozora/tokenizer-thematic-break][]


[mdast]: https://github.com/syntax-tree/mdast
[MdastPropsRoot]: https://github.com/yozorajs/yozora-react/blob/main/packages/markdown/src/ast/types.ts
[MdastRenderer]: https://github.com/yozorajs/yozora-react/blob/main/packages/markdown/src/ast/render.tsx
[react-viewer]: https://github.com/infeng/react-viewer
[@loadable/component]: https://github.com/gregberge/loadable-components

[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast
[@yozora/ast-util]: https://www.npmjs.com/package/@yozora/ast-util
[@yozora/parser]: https://www.npmjs.com/package/@yozora/parser
[@yozora/react-admonition]: https://www.npmjs.com/package/@yozora/react-admonition
[@yozora/react-blockquote]: https://www.npmjs.com/package/@yozora/react-blockquote
[@yozora/react-break]: https://www.npmjs.com/package/@yozora/react-break
[@yozora/react-code]: https://www.npmjs.com/package/@yozora/react-code
[@yozora/react-code-embed]: https://www.npmjs.com/package/@yozora/react-code-embed
[@yozora/react-code-live]: https://www.npmjs.com/package/@yozora/react-code-live
[@yozora/react-delete]: https://www.npmjs.com/package/@yozora/react-delete
[@yozora/react-emphasis]: https://www.npmjs.com/package/@yozora/react-emphasis
[@yozora/react-footnote-definitions]: https://www.npmjs.com/package/@yozora/react-footnote-definitions
[@yozora/react-footnote-reference]: https://www.npmjs.com/package/@yozora/react-footnote-reference
[@yozora/react-heading]: https://www.npmjs.com/package/@yozora/react-heading
[@yozora/react-image]: https://www.npmjs.com/package/@yozora/react-image
[@yozora/react-inline-code]: https://www.npmjs.com/package/@yozora/react-inline-code
[@yozora/react-inline-math]: https://www.npmjs.com/package/@yozora/react-inline-math
[@yozora/react-link]: https://www.npmjs.com/package/@yozora/react-link
[@yozora/react-list]: https://www.npmjs.com/package/@yozora/react-list
[@yozora/react-list-item]: https://www.npmjs.com/package/@yozora/react-list-item
[@yozora/react-math]: https://www.npmjs.com/package/@yozora/react-math
[@yozora/react-mathjax]: https://www.npmjs.com/package/@yozora/react-mathjax
[@yozora/react-paragraph]: https://www.npmjs.com/package/@yozora/react-paragraph
[@yozora/react-strong]: https://www.npmjs.com/package/@yozora/react-strong
[@yozora/react-table]: https://www.npmjs.com/package/@yozora/react-table
[@yozora/react-text]: https://www.npmjs.com/package/@yozora/react-text
[@yozora/react-thematic-break]: https://www.npmjs.com/package/@yozora/react-thematic-break
[@yozora/tokenizer-admonition]: https://www.npmjs.com/package/@yozora/tokenizer-admonition
[@yozora/tokenizer-autolink]: https://www.npmjs.com/package/@yozora/tokenizer-autolink
[@yozora/tokenizer-autolink-extension]: https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
[@yozora/tokenizer-blockquote]: https://www.npmjs.com/package/@yozora/tokenizer-blockquote
[@yozora/tokenizer-break]: https://www.npmjs.com/package/@yozora/tokenizer-break
[@yozora/tokenizer-definition]: https://www.npmjs.com/package/@yozora/tokenizer-definition
[@yozora/tokenizer-delete]: https://www.npmjs.com/package/@yozora/tokenizer-delete
[@yozora/tokenizer-emphasis]: https://www.npmjs.com/package/@yozora/tokenizer-emphasis
[@yozora/tokenizer-fenced-block]: https://www.npmjs.com/package/@yozora/tokenizer-fenced-block
[@yozora/tokenizer-footnote]: https://www.npmjs.com/package/@yozora/tokenizer-footnote
[@yozora/tokenizer-footnote-definition]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
[@yozora/tokenizer-footnote-reference]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
[@yozora/tokenizer-heading]: https://www.npmjs.com/package/@yozora/tokenizer-heading
[@yozora/tokenizer-image]: https://www.npmjs.com/package/@yozora/tokenizer-image
[@yozora/tokenizer-image-reference]: https://www.npmjs.com/package/@yozora/tokenizer-image-reference
[@yozora/tokenizer-indented-block]: https://www.npmjs.com/package/@yozora/tokenizer-indented-block
[@yozora/tokenizer-inline-code]: https://www.npmjs.com/package/@yozora/tokenizer-inline-code
[@yozora/tokenizer-inline-math]: https://www.npmjs.com/package/@yozora/tokenizer-inline-math
[@yozora/tokenizer-link]: https://www.npmjs.com/package/@yozora/tokenizer-link
[@yozora/tokenizer-link-reference]: https://www.npmjs.com/package/@yozora/tokenizer-link-reference
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
[@yozora/tokenizer-list-item]: https://www.npmjs.com/package/@yozora/tokenizer-list-item
[@yozora/tokenizer-math]: https://www.npmjs.com/package/@yozora/tokenizer-math
[@yozora/tokenizer-paragraph]: https://www.npmjs.com/package/@yozora/tokenizer-paragraph
[@yozora/tokenizer-setext-heading]: https://www.npmjs.com/package/@yozora/tokenizer-setext-heading
[@yozora/tokenizer-table]: https://www.npmjs.com/package/@yozora/tokenizer-table
[@yozora/tokenizer-text]: https://www.npmjs.com/package/@yozora/tokenizer-text
[@yozora/tokenizer-thematic-break]: https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
