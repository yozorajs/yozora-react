<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/main/packages/heading#readme">@yozora/react-heading</a>
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

This component is for rendering the [Heading][@yozora/ast] data produced by
[@yozora/tokenizer-heading][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


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

* Basic:

  ```tsx
  import React from 'react'
  import Heading from '@yozora/react-heading'

  const wrapper = (
    <Heading
      level={2}
      identifier="heading-waw"
      style={{ color: 'orange', fontSize: '16px' }}
    >
      Heading *waw*, 中文标题“这”
    </Heading>
  )
  ```

### Props

Name          | Type                  | Required  | Default | Description
:------------:|:---------------------:|:---------:|:-------:|:-------------
`children`    | `React.ReactNode`     | `false`   | -       | Heading contents
`className`   | `string`              | `false`   | -       | Root css class
`identifier`  | `string`              | `false`   | -       | Heading identifier
`level`       | `1|2|3|4|5|6`         | `true`    | -       | Heading level
`linkIcon`    | `React.ReactNode`     | `false`   | `'¶'`   | Heading link icon
`style`       | `React.CSSProperties` | `false`   | -       | Root css style

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-heading'`


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-heading][]
* [Heading | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#heading
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-heading]: https://www.npmjs.com/package/@yozora/tokenizer-heading
[mdast]: https://github.com/syntax-tree/mdast#heading
