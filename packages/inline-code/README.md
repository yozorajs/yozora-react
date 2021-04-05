<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/inline-code#readme">@yozora/react-inline-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-inline-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-inline-code"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-inline-code/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-inline-code/peer/styled-components"
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

This package is designed to render data of [@yozora/tokenizer-inline-code][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-inline-code
  ```

* yarn

  ```bash
  yarn add @yozora/react-inline-code
  ```

## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import InlineCode from '@yozora/react-inline-code'

  const wrapper = (
    <InlineCode
      value="Hello, world!"
      style={ { color: 'orange', fontSize: '16px' } }
    />
  )
  ```

* Props

  Name        | Type      | Required  | Default                 | Description
  :----------:|:---------:|:---------:|:-----------------------:|:-------------
  `ref`       | See below | `false`   | -                       | Forwarded ref callback
  `value`     | `string`  | `true`    | -                       | InlineCode content
  `className` | `string`  | `false`   | `"yozora-inline-code"`  | Root css class of the component

  - `ref` type is `React.RefObject<HTMLElement>`

  - `InlineCodeProps` inherited all attributes of
    `HTMLElement` (`React.HTMLAttributes<HTMLElement>`)
## Related

* [@yozora/tokenizer-inline-code][]
* [inlineCode | Mdast][mdast]



[mdast]: https://github.com/syntax-tree/mdast#inlinecode
[@yozora/tokenizer-inline-code]: https://www.npmjs.com/package/@yozora/tokenizer-inline-code

