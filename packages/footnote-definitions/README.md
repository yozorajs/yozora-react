<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/footnote-definitions#readme">@yozora/react-footnote-definitions</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definitions">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-footnote-definitions.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definitions">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-footnote-definitions.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definitions">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-footnote-definitions.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-footnote-definitions"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-footnote-definitions/peer/react"
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

This component is for rendering the [Footnotes][@yozora/ast] data produced by
[@yozora/tokenizer-footnote-definitions][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-footnote-definitions
  ```

* yarn

  ```bash
  yarn add @yozora/react-footnote-definitions
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import Footnotes from '@yozora/react-footnote-definitions'
  import '@yozora/react-footnote-definitions/lib/esm/index.css'

  const wrapper = (
    <Footnotes keyword="info" style={{ color: 'orange', fontSize: '16px' }}>
      some text1
      <span>some text2</span>
    </Footnotes>
  )
  ```

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`nodes`     | `FootnoteItem[]`      | `true`    | -       | Footnote definition items.
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style

* `nodes`:  `FootnoteItem[]`

  ```typescript
  export interface FootnoteItem {
    /**
     * Footnote reference label
     */
    label: string
    /**
     * Footnote reference identifier. 
     *
     * The prefix `reference-` will be added automatically.
     */
    identifier: string
    /**
     * Toc title
     */
    children: React.ReactNode
  }
  ```

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-footnote-definitions'`


## Related

* [@yozora/ast][]
* [@yozora/react-footnote-reference][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-footnote][]
* [@yozora/tokenizer-footnote-definition][]
* [@yozora/tokenizer-footnote-reference][]
* [footnoteDefinition | Mdast][mdast]]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#footnote-definitions
[@yozora/react-footnote-reference]: https://www.npmjs.com/package/@yozora/react-footnote-reference
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-footnote-definitions]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definitions
[@yozora/tokenizer-footnote-definition]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
[@yozora/tokenizer-footnote]: https://www.npmjs.com/package/@yozora/tokenizer-footnote
[@yozora/tokenizer-footnote-reference]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
[mdast]: https://github.com/syntax-tree/mdast#footnotedefinition