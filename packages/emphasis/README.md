[![npm version](https://img.shields.io/npm/v/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)
[![npm license](https://img.shields.io/npm/l/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-emphasis)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-emphasis/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-emphasis/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-emphasis`

This package is designed to render [mdast emphasis][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-emphasis
  ```

* yarn

  ```bash
  yarn add @yozora/react-emphasis
  ```

## Usage
  * Use in React project
    - Pure

      ```tsx
      import React from 'react'
      import Emphasis from '@yozora/react-emphasis'

      const wrapper = (
        <Emphasis style={ { color: 'orange', fontSize: '16px' } }>
          some text1
          <span>some text2</span>
        </Emphasis>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Emphasis from '@yozora/react-emphasis'

      const theme: DefaultTheme = {
        yozora: {
          emphasis: {
            color: 'red',
            fontSize: 18,
            fontWeight: undefined,
            fontStyle: 'oblique',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Emphasis>
            some text1
            <span>some text2</span>
          </Emphasis>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | Emphasis content

    EmphasisProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name  | Default
    :----------:|:--------------
     color      | `inherit`
     fontSize   | `inherit`
     fontWeight | `inherit`
     fontStyle  | `italic`

    See [YozoraEmphasisTheme][] for details.


## References

  - [mdast emphasis][]


[mdast emphasis]: https://github.com/syntax-tree/mdast#emphasis
[YozoraEmphasisTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/emphasis/src/theme.ts
