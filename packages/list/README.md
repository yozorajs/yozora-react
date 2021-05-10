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

This component is for rendering the [List][@yozora/ast] data produced by
[@yozora/tokenizer-list][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


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

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`children`  | `React.ReactNode`     | `false`   | -       | List items
`className` | `string`              | `false`   | -       | Root css class
`ordered`   | `boolean`             | `true`    | -       | Indicate an ordered list
`start`     | `number`              | `false`   | -       | Start number of ordered list
`style`     | `React.CSSProperties` | `false`   | -       | Root css style

- `className`: The root element of this component will always bind with the
  CSS class `'yozora-list'`

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-list][]
* [@yozora/tokenizer-list-item][]
* [Paragraph | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#list
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
[@yozora/tokenizer-list-item]: https://www.npmjs.com/package/@yozora/tokenizer-list-item
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
