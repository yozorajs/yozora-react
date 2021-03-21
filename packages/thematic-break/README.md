<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-thematic-break</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-thematic-break.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-thematic-break"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-thematic-break/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-thematic-break][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-thematic-break
  ```

* yarn

  ```bash
  yarn add @yozora/react-thematic-break
  ```

## Usage

* Use in React project

    ```tsx
    import React from 'react'
    import ThematicBreak from '@yozora/react-thematic-break'

    const wrapper = (
      <ThematicBreak style={ { color: 'orange', fontSize: '16px' } } />
    )
    ```

* Props

  Name        | Type      | Required  | Default                   | Description
  :----------:|:---------:|:---------:|:-------------------------:|:-------------
  `ref`       | See below | `false`   | -                         | Forwarded ref callback
  `className` | `string`  | `true`    | `"yozora-thematic-break"` | Root css class of the component

  - `ref` type is `React.RefObject<HTMLHRElement>`

  - `ThematicBreakProps` inherited all (except `children`) attributes of
    `HTMLHRElement` (`React.HTMLAttributes<HTMLHRElement>`)

## Related

* [@yozora/tokenizer-thematic-break][]
* [ThematicBreak | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#thematicbreak
[@yozora/tokenizer-thematic-break]: https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
