[![npm version](https://img.shields.io/npm/v/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)
[![npm license](https://img.shields.io/npm/l/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-math)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-math/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-math/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-math`

This package is designed to render [mdast math][mathjax] type data


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
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Math from '@yozora/react-math'

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
        <Math
          value={ code }
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Math from '@yozora/react-math'

      const theme: DefaultTheme = {
        yozora: {
          math: {
            padding: '2px',
            border: '1px solid blue',
            // margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            color: '#d81848',
          }
        }
      }

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
        <ThemeProvider theme={ theme }>
          <Math
            value={ code }
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLDivElement>`   | `false`   | -       | Forwarded ref callback
     `value`  | `string`                            | `true`    | -       | Math content

    MathProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0`
     border       | `none`
     margin       | `0`
     background   | `none`
     color        | `inherit`

    See [YozoraMathTheme][] for details.


## References

  - [mathjax][]


[mathjax]: https://www.mathjax.org/
[YozoraMathTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/math/src/theme.ts
