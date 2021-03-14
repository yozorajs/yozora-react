<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-list-item</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-list-item.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-list-item.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list-item">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-list-item.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-list-item"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list-item/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list-item/peer/styled-components"
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

This package is designed to render [mdast list-item][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-list-item
  ```

* yarn

  ```bash
  yarn add @yozora/react-list-item
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import ListItem from '@yozora/react-list-item'

      const wrapper = (
        <ListItem status="done" style={ { color: 'orange', fontSize: '16px' } }>
          some text1
          <span>some text2</span>
        </ListItem
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import ListItem from '@yozora/react-list-item'

      const theme: DefaultTheme = {
        yozora: {
          listItem: {
            color: 'red',
            padding: '0 1rem',
            margin: 18,
            // lineHeight: 1.5,
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <ListItem status="doing" style={ { color: 'orange', fontSize: '16px' } }>
            some text1
            <span>some text2</span>
          </ListItem>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLLIElement>`    | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | ListItem content
     `status`   | `'todo'|'doing'|'done'`             | `false`   | -       | Whether if it is a TODO item, and given its status

    ListItemProps inherited all attributes of `HTMLLIElement` (`React.LiHTMLAttributes<HTMLLIElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0 0 0 1.2em`
     margin       | `transparent`
     lineHeight   | `2`
     color        | `inherit`

    See [YozoraListItemTheme][] for details.


## References

  - [mdast list-item][]


[mdast list-item]: https://github.com/syntax-tree/mdast#listitem
[YozoraListItemTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/list-item/src/theme.ts
