<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/delete#readme">@yozora/react-delete</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-delete">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-delete.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-delete">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-delete.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-delete">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-delete.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-delete"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-delete/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-delete][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-delete
  ```

* yarn

  ```bash
  yarn add @yozora/react-delete
  ```


## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import Delete from '@yozora/react-delete'

  const wrapper = (
    <Delete style={{ color: 'orange', fontSize: '16px' }}>
      some text1
      <span>some text2</span>
    </Delete>
  )
  ```

* Props

  Name        | Type              | Required  | Default           | Description
  :----------:|:-----------------:|:---------:|:-----------------:|:-------------
  `ref`       | See below         | `false`   | -                 | Forwarded ref callback
  `className` | `string`          | `false`   | `"yozora-delete"` | Root css class of the component
  `children`  | `React.ReactNode` | `false`   | -                 | Deleted contents


  - `ref` type is `React.RefObject<HTMLElement>`

  - `DeleteProps` inherited all attributes of
    `HTMLElement` (`React.DelHTMLAttributes<HTMLElement>`)


## Related

* [@yozora/tokenizer-delete][]
* [Delete | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#delete
[@yozora/tokenizer-delete]: https://www.npmjs.com/package/@yozora/tokenizer-delete
