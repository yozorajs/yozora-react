<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-strong</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-strong">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-strong.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-strong">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-strong.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-strong">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-strong.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-strong"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-strong/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-strong/peer/styled-components"
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
