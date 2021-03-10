[![npm version](https://img.shields.io/npm/v/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm license](https://img.shields.io/npm/l/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-blockquote)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-blockquote/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-blockquote/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-blockquote`

This package is designed to render [mdast blockquote][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-blockquote
  ```

* yarn

  ```bash
  yarn add @yozora/react-blockquote
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Blockquote from '@yozora/react-blockquote'

      const wrapper = (
        <Blockquote style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Blockquote>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Blockquote from '@yozora/react-blockquote'

      const theme: DefaultTheme = {
        yozora: {
          blockquote: {
            padding: '0 1rem',
            borderColor: 'orange',
            margin: 18,
            background: 'rgba(0, 0, 0, 0.15)',
            color: 'red',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Blockquote>
            some text1
            <span>some text2</span>
          </Blockquote>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                 | `true`    | -       | Blockquote content

    BlockquoteProps inherited all attributes of `HTMLDivElement` (`React.BlockquoteHTMLAttributes<HTMLDivElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0.625em 1em`
     borderColor  | `transparent`
     margin       | `0 0 1.25em`
     background   | `none`
     color        | `inherit`

    See [YozoraBlockquoteTheme][] for details.


## References

  - [mdast blockquote][]


[mdast blockquote]: https://github.com/syntax-tree/mdast#blockquote
[YozoraBlockquoteTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/blockquote/src/theme.ts
