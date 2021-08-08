<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/emphasis#readme">@yozora/react-emphasis</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-emphasis.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-emphasis"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-emphasis/peer/react"
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

This component is for rendering the [Emphasis][@yozora/ast] data produced by
[@yozora/tokenizer-emphasis][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-emphasis
  ```

* yarn

  ```bash
  yarn add @yozora/react-emphasis
  ```

## Usage

* Basic:

  ```tsx
  import React from 'react'
  import Emphasis from '@yozora/react-emphasis'
  import '@yozora/react-emphasis/lib/esm/index.css'

  const wrapper = (
    <Emphasis style={{ color: 'orange', fontSize: '16px' }}>
      some text1
      <span>some text2</span>
    </Emphasis>
  )
  ```

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`children`  | `React.ReactNode`     | `false`   | -       | Emphasis contents
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-emphasis'`


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-emphasis][]
* [Emphasis | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#emphasis
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-emphasis]: https://www.npmjs.com/package/@yozora/tokenizer-emphasis
[mdast]: https://github.com/syntax-tree/mdast#emphasis
