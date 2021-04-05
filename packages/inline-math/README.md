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

This package is designed to render [inlineMath][mathjax] type data


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
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import InlineMath from '@yozora/react-inline-math'

      const wrapper = (
        <InlineMath
          value="x^2 + y^2 = z^2"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import InlineMath from '@yozora/react-inline-math'

      const theme: DefaultTheme = {
        yozora: {
          inlineMath: {
            padding: '2px',
            border: '1px solid blue',
            // margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            color: '#d81848',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <InlineMath
            value="x^2 + y^2 = z^2"
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `value`  | `string`                            | `true`    | -       | InlineMath content

    InlineMathProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0`
     border       | `none`
     margin       | `0`
     background   | `none`
     color        | `inherit`

    See [YozoraInlineMathTheme][] for details.


## References

  - [mathjax][]


[mathjax]: https://www.mathjax.org/
[YozoraInlineMathTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/inline-math/src/theme.ts
