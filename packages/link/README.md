<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/link#readme">@yozora/react-link</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-link">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-link.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-link">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-link.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-link">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-link.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-link"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-link/peer/react"
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

This component is for rendering the [Link][@yozora/ast] data produced by
[@yozora/tokenizer-link][], [@yozora/tokenizer-autolink] and 
[@yozora/tokenizer-autolink-extension].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-link
  ```

* yarn

  ```bash
  yarn add @yozora/react-link
  ```

## Usage

* Basic:

  ```tsx
  import React from 'react'
  import Link from '@yozora/react-link'

  const wrapper = (
    <Link
      url="/home"
      title="home"
      style={ { color: 'orange', fontSize: '16px' } }
    >
      some text1
      <span>some text2</span>
    </Link>
  )
  ```


### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`children`  | `React.ReactNode`     | `false`   | -       | Link contents
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style
`title`     | `string`              | `false`   | -       | Link title
`url`       | `string`              | `true`    | -       | Link url

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-link'`.


## Related

* [@yozora/ast][]
* [@yozora/react-link][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-link][]
* [@yozora/tokenizer-autolink][]
* [@yozora/tokenizer-autolink-extension][]

[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#link
[@yozora/react-link]: https://www.npmjs.com/package/@yozora/react-link
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-link]: https://www.npmjs.com/package/@yozora/tokenizer-link
[@yozora/tokenizer-autolink]: https://www.npmjs.com/package/@yozora/tokenizer-autolink
[@yozora/tokenizer-autolink-extension]: https://www.npmjs.com/package/@yozora/tokenizer-autolink-extension
