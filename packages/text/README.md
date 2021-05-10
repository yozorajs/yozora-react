<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/text#readme">@yozora/react-text</a>
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

This component is for rendering the [Text][@yozora/ast] data produced by
[@yozora/tokenizer-text][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


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

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style
`value`     | `string`              | `true`    | -       | Textural content

- `className`: The root element of this component will always bind with the
  CSS class `'yozora-text'`.


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-text][]
* [Text | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#text
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-text]: https://www.npmjs.com/package/@yozora/tokenizer-text
[mdast]: https://github.com/syntax-tree/mdast#text
