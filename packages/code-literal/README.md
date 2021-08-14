<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/code-literal#readme">@yozora/react-code-literal</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code-literal">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code-literal.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-literal">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code-literal.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-literal">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code-literal.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-code-literal"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-literal/peer/react"
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

This component is for rendering the [Code][@yozora/ast] data produced by
[@yozora/tokenizer-indented-code][] and [@yozora/tokenizer-fenced-code].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-literal
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-literal
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import CodeLiteral from '@yozora/react-code-literal'
  import '@yozora/react-code-literal/lib/esm/index.css'

  const wrapper = (
    <CodeLiteral 
      code="let x = 1"
      lang="javascript"
      style={{ color: 'orange' }} 
    />
  )
  ```

### Props

Name                | Type                  | Required  | Default | Description
:------------------:|:---------------------:|:---------:|:-------:|:-------------
`className`         | `string`              | `false`   | -       | Root css class
`collapsed`         | `boolean`             | `false`   | `false` | Collapse the code block
`darken`            | `boolean`             | `false`   | -       | Enable the darken mode
`highlightLinenos`  | `number[]`            | `false`   | -       | Line number of Lines that should be highlighted
`lang`              | `string`              | `false`   | -       | Language of the source codes
`maxLines`          | `number`              | `number`  | -       | Maximum number of rows displayed
`style`             | `React.CSSProperties` | `false`   | -       | Root css style
`title`             | `string`              | `false`   | -       | Code title
`value`             | `string`              | `true`    | -       | Literal source codes

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-code-literal'`.


## Related

* [@yozora/ast][]
* [@yozora/react-code][]
* [@yozora/react-code-embed][]
* [@yozora/react-code-highlighter][]
* [@yozora/react-code-live][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-indented-code][]
* [@yozora/tokenizer-fenced-code][]
* [Code | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#code
[@yozora/react-code]: https://www.npmjs.com/package/@yozora/react-code
[@yozora/react-code-embed]: https://www.npmjs.com/package/@yozora/react-code-embed
[@yozora/react-code-highlighter]: https://www.npmjs.com/package/@yozora/react-code-highlighter
[@yozora/react-code-literal]: https://www.npmjs.com/package/@yozora/react-code-literal
[@yozora/react-code-live]: https://www.npmjs.com/package/@yozora/react-code-live
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-indented-code]: https://www.npmjs.com/package/@yozora/tokenizer-indented-code
[@yozora/tokenizer-fenced-code]: https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
[mdast]: https://github.com/syntax-tree/mdast#code
