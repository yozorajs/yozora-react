<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-inline-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-inline-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-inline-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-inline-code"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-inline-code/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-inline-code/peer/styled-components"
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

This package is designed to render [mdast inlineCode][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-inline-code
  ```

* yarn

  ```bash
  yarn add @yozora/react-inline-code
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import InlineCode from '@yozora/react-inline-code'

      const wrapper = (
        <InlineCode
          value="Hello, world!"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import InlineCode from '@yozora/react-inline-code'

      const theme: DefaultTheme = {
        yozora: {
          inlineCode: {
            padding: '2px',
            borderRadius: '3px',
            margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            lineHeight: 1.5,
            color: '#d81848',
            fontFamily: 'Consolas, monospace, sans-serif',
            fontSize: '1em',
            fontWeight: 'inherit',
            fontStyle: undefined,
            // whiteSpace: undefined,
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <InlineCode
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
     `value`  | `string`                            | `true`    | -       | InlineCode content

    InlineCodeProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `4px`
     borderRadius | `2px`
     margin       | `0`
     background   | `none`
     lineHeight   | `1.375`
     color        | `inherit`
     fontFamily   | `Consolas, monospace, sans-serif`
     fontSize     | `1em`
     fontWeight   | `inherit`
     fontStyle    | `inherit`
     whiteSpace   | `normal`

    See [YozoraInlineCodeTheme][] for details.


## References

  - [mdast inlineCode][]


[mdast inlineCode]: https://github.com/syntax-tree/mdast#inlinecode
[YozoraInlineCodeTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/inline-code/src/theme.ts
