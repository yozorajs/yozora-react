<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/react-list-item#readme">@yozora/react-list-item</a>
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

This component is for rendering the [ListItem][@yozora/ast] data produced by
[@yozora/tokenizer-list-item][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


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

* Basic:

  ```tsx
  import React from 'react'
  import ListItem from '@yozora/react-list-item'
  import '@yozora/react-list-item/lib/esm/index.css'

  const wrapper = (
    <ListItem status="done" style={ { color: 'orange', fontSize: '16px' } }>
      some text1
      <span>some text2</span>
    </ListItem
  )
  ```

### Props

Name        | Type                    | Required  | Default | Description
:----------:|:-----------------------:|:---------:|:-------:|:-------------
`status`    | `'todo'|'doing'|'done'` | `false`   | -       | Status of TODO item
`children`  | `React.ReactNode`       | `false`   | -       | List item contents
`className` | `string`                | `false`   | -       | Root css class
`style`     | `React.CSSProperties`   | `false`   | -       | Root css style

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-list-item'`


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-list][]
* [@yozora/tokenizer-list-item][]
* [ListItem | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#listitem
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
[@yozora/tokenizer-list-item]: https://www.npmjs.com/package/@yozora/tokenizer-list-item
[mdast]: https://github.com/syntax-tree/mdast#listitem

