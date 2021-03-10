[![npm version](https://img.shields.io/npm/v/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm license](https://img.shields.io/npm/l/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-delete)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-delete/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-delete/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-delete`

This package is designed to render [mdast delete][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-delete
  ```

* yarn

  ```bash
  yarn add @yozora/react-delete
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Delete from '@yozora/react-delete'

      const wrapper = (
        <Delete style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Delete>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Delete from '@yozora/react-delete'

      const theme: DefaultTheme = {
        yozora: {
          delete: {
            color: 'red',
            fontSize: 18,
            fontWeight: undefined,
            // fontStyle: 'oblique',
            textDecoration: 'dashed',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Delete>
            some text1
            <span>some text2</span>
          </Delete>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | Delete content

    DeleteProps inherited all attributes of `HTMLSpanElement` (`React.DelHTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     color          | `inherit`
     fontSize       | `inherit`
     fontWeight     | `inherit`
     fontStyle      | `inherit`
     textDecoration | `line-through`

    See [YozoraDeleteTheme][] for details.


## References

  - [mdast delete][]


[mdast delete]: https://github.com/syntax-tree/mdast#delete
[YozoraDeleteTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/delete/src/theme.ts
