<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-text</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-text">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-text.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-text">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-text.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-text">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-text.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-text"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-text/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-text][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-text
  ```

* yarn

  ```bash
  yarn add @yozora/react-text
  ```

## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import Text from '@yozora/react-text'

  const wrapper = (<Text value="Hello, world!" />)
  ```

* Props

  Name        | Type      | Required  | Default         | Description
  :----------:|:---------:|:---------:|:---------------:|:-------------
  `ref`       | See below | `false`   | -               | Forwarded ref callback
  `value`     | `string`  | `true`    | -               | Text content
  `className` | `string`  | `true`    | `"yozora-text"` | Root css class of the component

  - `ref` type is `React.RefObject<HTMLSpanElement>`

  - `TextProps` inherited all (except `children`) attributes of
    `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)


## Related

* [@yozora/tokenizer-text][]
* [Text | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#text
[@yozora/tokenizer-text]: https://www.npmjs.com/package/@yozora/tokenizer-text
