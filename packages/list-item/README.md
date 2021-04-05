<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/list-item#readme">@yozora/react-list-item</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-list-item.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-list-item.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-list-item.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-list-item"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list-item/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-list-item][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-list-item
  ```

* yarn

  ```bash
  yarn add @yozora/react-list-item
  ```

## Usage

  * Use in React project

    ```tsx
    import React from 'react'
    import ListItem from '@yozora/react-list-item'

    const wrapper = (
      <ListItem status="done" style={ { color: 'orange', fontSize: '16px' } }>
        some text1
        <span>some text2</span>
      </ListItem
    )
    ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLLIElement>`    | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | ListItem content
     `status`   | `'todo'|'doing'|'done'`             | `false`   | -       | Whether if it is a TODO item, and given its status

    - `ref` type is `React.RefObject<HTMLParagraphElement>`

    - `ListItemProps` inherited all attributes of
      `HTMLLIElement` (`React.LiHTMLAttributes<HTMLLIElement>`)


## Related

* [@yozora/tokenizer-list-item][]
* [ListItem | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#listitem
[@yozora/tokenizer-list-item]: https://www.npmjs.com/package/@yozora/tokenizer-list-item

