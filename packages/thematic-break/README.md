<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-thematic-break</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-thematic-break">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-thematic-break.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-thematic-break"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-thematic-break/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-thematic-break/peer/styled-components"
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

This package is designed to render [mdast thematicBreak][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-thematic-break
  ```

* yarn

  ```bash
  yarn add @yozora/react-thematic-break
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import ThematicBreak from '@yozora/react-thematic-break'

      const wrapper = (
        <ThematicBreak style={ { color: 'orange', fontSize: '16px' } } />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import ThematicBreak from '@yozora/react-thematic-break'

      const theme: DefaultTheme = {
        yozora: {
          thematicBreak: {
            borderColor: 'orange',
            // outline: '1px dash red',
            margin: '2rem 0',
          }
        }
      }

      const wrapper = (
      <ThemeProvider theme={ theme }>
        <ThematicBreak style={ { color: 'orange', fontSize: '16px' } } />
      </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                              | Required  | Default | Description
    :--------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLHRElement>`  | `false`   | -       | Forwarded ref callback

    ThematicBreakProps inherited all attributes of `HTMLHRElement` (`React.HTMLAttributes<HTMLHRElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:-----------
     borderColor  | `lightgray`
     outline      | `0`
     margin       | `1.5em 0`

    See [YozoraThematicBreakTheme][] for details.


## References

  - [mdast thematicBreak][]


[mdast thematicBreak]: https://github.com/syntax-tree/mdast#thematicbreak
[YozoraThematicBreakTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/thematic-break/src/theme.ts
