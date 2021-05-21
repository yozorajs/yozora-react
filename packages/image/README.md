<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/main/packages/image#readme">@yozora/react-image</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-image">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-image.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-image">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-image.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-image">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-image.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-image"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-image/peer/react"
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

This component is for rendering the [Image][@yozora/ast] data produced by
[@yozora/tokenizer-image][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-image
  ```

* yarn

  ```bash
  yarn add @yozora/react-image
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import Image from '@yozora/react-image'

  const wrapper = (<Image src="https://avatars.githubusercontent.com/u/42513619" />)
  ```

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`alt`       | `string`              | `false`   | `#src`  | Image alt
`className` | `string`              | `false`   | -       | Root css class
`src`       | `string`              | `true`    | -       | Image src
`style`     | `React.CSSProperties` | `false`   | -       | Root css style
`title`     | `string`              | `false`   | -       | Image title

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-image'`.


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-image][]
* [Image | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#image
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-image]: https://www.npmjs.com/package/@yozora/tokenizer-image
[mdast]: https://github.com/syntax-tree/mdast#image
