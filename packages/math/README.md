<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/math#readme">@yozora/react-math</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-math">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-math">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-math">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-math.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-math"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-math/peer/react"
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

This component is for rendering the [Math][@yozora/ast] data produced by
[@yozora/tokenizer-math][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-math
  ```

* yarn

  ```bash
  yarn add @yozora/react-math
  ```

## Usage

To use this component alone, You need to place it under the component `MathJaxProvider`
(exported from [@yozora/react-mathjax][]).

* Use it alone:

  ```tsx
  import React from 'react'
  import Math from '@yozora/react-math'
  import { MathJaxProvider } from '@yozora/react-mathjax'

  const code = `
    \\begin{align}
      f(x) = \\left\\lbrace
        \\begin{aligned}
          &x^2, &x < 0 \\\\
          &\\frac{1}{x^3}, &x > 0
        \\end{aligned}
      \\right.
    \\end{align}
  `

  const wrapper = (
    <MathJaxProvider>
      <Math
        value={ code }
        style={{ color: 'orange', fontSize: '16px' }}
      />
    </MathJaxProvider>
  )
  ```

* [@yozora/react-markdown][] has has built-in `MathJaxProvider`, so you don’t 
  need to wrap it manually.

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`className` | `string`              | `false`   | -       | Root css class
`style`     | `React.CSSProperties` | `false`   | -       | Root css style
`value`     | `string`              | `true`    | -       | Mathjax codes

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-math'`.


## Related

* [@yozora/ast][]
* [@yozora/react-inline-math][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-inline-math][]
* [@yozora/react-mathjax][]
* [@yozora/tokenizer-math][]
* [mathjax][]

[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#inlinemath
[@yozora/react-inline-math]: https://www.npmjs.com/package/@yozora/react-inline-math
[@yozora/react-mathjax]: https://www.npmjs.com/package/@yozora/react-inline-mathjax
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-inline-math]: https://www.npmjs.com/package/@yozora/tokenizer-inline-math
[@yozora/tokenizer-math]: https://www.npmjs.com/package/@yozora/tokenizer-math
[mathjax]: https://www.mathjax.org/
