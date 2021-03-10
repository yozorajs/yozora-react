[![npm version](https://img.shields.io/npm/v/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)
[![npm license](https://img.shields.io/npm/l/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-text)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-text/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-text/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-text`

This package is designed to render [mdast text][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-text
  ```

* yarn

  ```bash
  yarn add @yozora/react-text
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Text from '@yozora/react-text'

      const wrapper = (
        <Text value="Hello, world!" />
      )

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Text from '@yozora/react-text'

      const theme: DefaultTheme = {
        yozora: {
          text: {
            lineHeight: '2',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Text
            value="Hello, world!"
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `value`  | `string`                            | `true`    | -       | Text content

    TextProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name  | Default
    :----------:|:--------------
     lineHeight | `inherit`

    See [YozoraTextTheme][] for details.


## References

  - [mdast text][]


[mdast text]: https://github.com/syntax-tree/mdast#text
[YozoraTextTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/text/src/theme.ts
