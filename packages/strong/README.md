[![npm version](https://img.shields.io/npm/v/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)
[![npm license](https://img.shields.io/npm/l/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-strong)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-strong/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-strong/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-strong`

This package is designed to render [mdast strong][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-strong
  ```

* yarn

  ```bash
  yarn add @yozora/react-strong
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Strong from '@yozora/react-strong'

      const wrapper = (
        <Strong style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Strong>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Strong from '@yozora/react-strong'

      const theme: DefaultTheme = {
        yozora: {
          strong: {
            color: 'red',
            fontSize: 18,
            // fontWeight: 'bold',
            fontStyle: 'oblique',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Strong>
            some text1
            <span>some text2</span>
          </Strong>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | strong content

    StrongProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     color        | `inherit`
     fontSize     | `inherit`
     fontWeight   | `600`
     fontStyle    | `inherit`

    See [YozoraStrongTheme][] for details.


## References

  - [mdast strong][]


[mdast strong]: https://github.com/syntax-tree/mdast#strong
[YozoraStrongTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/strong/src/theme.ts
