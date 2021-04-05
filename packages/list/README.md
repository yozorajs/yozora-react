<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/list#readme">@yozora/react-list</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-list.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-list"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-list][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-list
  ```

* yarn

  ```bash
  yarn add @yozora/react-list
  ```

## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import List from '@yozora/react-list'
  import ListItem from '@yozora/react-list-item'

  const wrapper = (
    <List ordered={ true } start={ 3 } type="a">
      <ListItem key={ 0 }>apple</ListItem>
      <ListItem key={ 1 }>banana</ListItem>
      <ListItem key={ 2 }>cat</ListItem>
    </List>
  )
  ```

* Props

  Name        | Type              | Required  | Default               | Description
  :----------:|:-----------------:|:---------:|:---------------------:|:-------------
  `ref`       | See below         | `false`   | -                     | Forwarded ref callback
  `className` | `string`          | `false`   | `"yozora-list"`       | Root css class of the component
  `ordered`   | `boolean`         | `true`    | -                     | Flag used  to distinguish ordered and unordered list
  `start`     | `number`          | `false`   | -                     | Start number of ordered list
  `children`  | `React.ReactNode` | `false`   | -                     | List items

  - `ref` type is `React.RefObject<HTMLOListElement | HTMLUListElement>`

  - `ListProps` inherited all attributes of
    `HTMLOListElement | HTMLUListElement`
    (`React.OlHTMLAttributes<HTMLOListElement | HTMLUListElement>`)

## Related

* [@yozora/tokenizer-list][]
* [Paragraph | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#list
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
