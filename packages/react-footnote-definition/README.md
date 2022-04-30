<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/react-footnote-definition#readme">@yozora/react-footnote-definition</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definition">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-footnote-definition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definition">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-footnote-definition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-footnote-definition">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-footnote-definition.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-footnote-definition"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-footnote-definition/peer/react"
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

This component is for rendering the [footnote-definition][@yozora/ast] data produced by
[@yozora/tokenizer-footnote-definition][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-footnote-definition
  ```

* yarn

  ```bash
  yarn add @yozora/react-footnote-definition
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import FootnoteDefinition from '@yozora/react-footnote-definition'
  import '@yozora/react-footnote-definition/lib/esm/index.css'

  const wrapper = (
    <FootnoteDefinition
      label="1"
      identifier="footnote-1"
      className="custom-footnote-definition"
      style={{ marginTop: '2rem' }}
    >
      some text1
      <span>some text2</span>
    </FootnoteDefinition>
  )
  ```

### Props

Name          | Type                  | Required  | Default | Description
:------------:|:---------------------:|:---------:|:-------:|:-------------
`label`       | `string`              | `true`    | -       | Footnote reference label
`identifier`  | `string`              | `true`    | -       | Footnote reference identifier
`children`    | `React.ReactNode`     | `false`   | -       | Footnote contents
`className`   | `string`              | `false`   | -       | Root css class
`style`       | `React.CSSProperties` | `false`   | -       | Root css style


* `className`: The root element of this component will always bind with the
  CSS class `'yozora-footnote-definition'`


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-footnote][]
* [@yozora/tokenizer-footnote-definition][]
* [@yozora/tokenizer-footnote-reference][]
* [footnoteDefinition | Mdast][mdast]]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#footnote-definition
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-footnote-definition]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
[@yozora/tokenizer-footnote-definition]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
[@yozora/tokenizer-footnote]: https://www.npmjs.com/package/@yozora/tokenizer-footnote
[@yozora/tokenizer-footnote-reference]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
[mdast]: https://github.com/syntax-tree/mdast#footnotedefinition