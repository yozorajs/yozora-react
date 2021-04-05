<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/heading#readme">@yozora/react-heading</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-heading">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-heading.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-heading">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-heading.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-heading">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-heading.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-heading"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-heading/peer/react"
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

This package is designed to render data of [@yozora/tokenizer-heading][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-heading
  ```

* yarn

  ```bash
  yarn add @yozora/react-heading
  ```

## Usage

* Use in React project

    ```tsx
    import React from 'react'
    import Heading from '@yozora/react-heading'

    const wrapper = (
      <Heading
        level={ 2 }
        identifier="heading-waw"
        style={ { color: 'orange', fontSize: '16px' } }
      >
        Waw -- { 2 }, 中文标题“这”
      </Heading>
    )
    ```

* Props

  Name          | Type              | Required  | Default             | Description
  :------------:|:-----------------:|:---------:|:-------------------:|:-------------
  `ref`         | See below         | `false`   | -                   | Forwarded ref callback
  `className`   | `string`          | `false`   | `"yozora-heading"`  | Root css class of the component
  `children`    | `React.ReactNode` | `false`   | -                   | Heading contents
  `level`       | `1|2|3|4|5|6`     | `true`    | -                   | Heading level
  `linkIcon`    | `React.ReactNode` | `false`   | `<HeadingIcon />`   | Heading link icon
  `identifier`  | `string`          | `false`   | -                   | Heading identifier

  - `ref` type is `React.RefObject<HTMLDivElement>`

  - `HeadingProps` inherited all attributes of
    `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)


## Related

* [@yozora/tokenizer-heading][]
* [Heading | Mdast][mdast]


[mdast]: https://github.com/syntax-tree/mdast#heading
[@yozora/tokenizer-heading]: https://www.npmjs.com/package/@yozora/tokenizer-heading
