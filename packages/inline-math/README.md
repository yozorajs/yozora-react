<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/inline-math#readme">@yozora/react-inline-math</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-inline-math">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-inline-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-math">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-inline-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-math">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-inline-math.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-inline-math"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-inline-math/peer/react"
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

This component is for rendering the [InlineMath][@yozora/ast] data produced by
[@yozora/tokenizer-inline-math][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-inline-math
  ```

* yarn

  ```bash
  yarn add @yozora/react-inline-math
  ```

## Usage

* Basic:

  ```tsx
  import React from 'react'
  import InlineMath from '@yozora/react-inline-math'

  const wrapper = (
    <InlineMath
      value="x^2 + y^2 = z^2"
      style={{ color: 'orange', fontSize: '16px' }}
    />
  )
  ```

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style
`value`     | `string`              | `true`    | -       | Mathjax codes

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-inline-math'`.


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-math][]
* [@yozora/tokenizer-inline-math][]
* [@yozora/tokenizer-math][]
* [mathjax][]

[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#inlinemath
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/react-math]: https://www.npmjs.com/package/@yozora/react-inline-mathjax
[@yozora/tokenizer-inline-math]: https://www.npmjs.com/package/@yozora/tokenizer-inline-math
[@yozora/tokenizer-math]: https://www.npmjs.com/package/@yozora/tokenizer-math
[mathjax]: https://www.mathjax.org/
