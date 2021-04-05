<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/blockquote#readme">@yozora/react-blockquote</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-blockquote">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-blockquote.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-blockquote">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-blockquote.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-blockquote">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-blockquote.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-blockquote"
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
<br/>

This package is designed to render data of [@yozora/tokenizer-blockquote][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-blockquote
  ```

* yarn

  ```bash
  yarn add @yozora/react-blockquote
  ```


## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import Blockquote from '@yozora/react-blockquote'

  const wrapper = (
    <Blockquote style={{ color: 'orange', fontSize: '16px' }}>
      some text1
      <span>some text2</span>
    </Blockquote>
  )
  ```

* Props

  Name        | Type              | Required  | Default               | Description
  :----------:|:-----------------:|:---------:|:---------------------:|:-------------
  `ref`       | See below         | `false`   | -                     | Forwarded ref callback
  `className` | `string`          | `false`   | `"yozora-blockquote"` | Root css class of the component
  `children`  | `React.ReactNode` | `false`   | -                     | Blockquote contents

  - `ref` type is `React.RefObject<HTMLElement>`

  - `BlockquoteProps` inherited all attributes of
    `HTMLElement` (`React.BlockquoteHTMLAttributes<HTMLElement>`)


## Related

* [@yozora/tokenizer-blockquote][]
* [Blockquote | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#blockquote
[@yozora/tokenizer-blockquote]: https://www.npmjs.com/package/@yozora/tokenizer-blockquote
