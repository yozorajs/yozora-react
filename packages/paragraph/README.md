<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-paragraph</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-paragraph">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-paragraph.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-paragraph">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-paragraph.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-paragraph">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-paragraph.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-paragraph"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-paragraph/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-paragraph/peer/styled-components"
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

This package is designed to render [mdast paragraph][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-paragraph
  ```

* yarn

  ```bash
  yarn add @yozora/react-paragraph
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Paragraph from '@yozora/react-paragraph'

      const wrapper = (
        <Paragraph style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Paragraph>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Paragraph from '@yozora/react-paragraph'

      const theme: DefaultTheme = {
        yozora: {
          paragraph: {
            padding: '0 1rem',
            margin: 18,
            // lineHeight: 1.5,
            color: 'red',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Paragraph>
            some text1
            <span>some text2</span>
          </Paragraph>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLParagraphElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | Paragraph content

    ParagraphProps inherited all attributes of `HTMLParagraphElement` (`React.HTMLAttributes<HTMLParagraphElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0`
     margin       | `0 0 1em`
     lineHeight   | `2`
     color        | `inherit`

    See [YozoraParagraphTheme][] for details.


## References

  - [mdast paragraph][]


[mdast paragraph]: https://github.com/syntax-tree/mdast#paragraph
[YozoraParagraphTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/paragraph/src/theme.ts
