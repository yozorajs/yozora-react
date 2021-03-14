<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-emphasis</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-emphasis">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-emphasis.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-emphasis"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-emphasis/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-emphasis/peer/styled-components"
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
