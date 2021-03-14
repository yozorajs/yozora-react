<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-list</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-list">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-list.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-list"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-list/peer/styled-components"
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

This package is designed to render [mdast list][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-list
  ```

* yarn

  ```bash
  yarn add @yozora/react-list
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import List from '@yozora/react-list'

      const wrapper = (
        <List ordered={ true } start={ 3 } type="a">
          <li key={ 0 }>apple</li>
          <li key={ 1 }>banana</li>
          <li key={ 2 }>cat</li>
        </List>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import List from '@yozora/react-list'

      const theme: DefaultTheme = {
        yozora: {
          list: {
            color: 'red',
            padding: '0 1rem',
            margin: 18,
            // lineHeight: 1.5,
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <List ordered={ false }>
            <li key={ 0 }>apple</li>
            <li key={ 1 }>banana</li>
            <li key={ 2 }>cat</li>
          </List>
        </ThemeProvider>>
      )
      ```

  * OrderedListProps

     Name       | Type                                | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLOListElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | OrderedList content
     `start`    | `number`                            | `true`    | -       | OrderedList start number

    OrderedListProps inherited all attributes of `HTMLOListElement` (`React.OlHTMLAttributes<HTMLOListElement>`)

  * UnorderedListProps

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                 | `true`    | -       | UnorderedList content

    UnorderedListProps inherited all attributes of `HTMLUListElement` (`React.HTMLAttributes<HTMLUListElement>`)

  * Props

     Name       | Type      | Required  | Default | Description
    :----------:|:---------:|:---------:|:-------:|:-------------
     ordered    | `boolean` | true      | -       | Flag used  to distinguish ordered and unordered list

    ListProps extends OrderedListProps and UnorderedListProps.

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0 0 0 1.2em`
     margin       | `0 0 1`
     lineHeight   | `2`
     borderColor  | `transparent`

    See [YozoraListTheme][] for details.


## References

  - [mdast list][]


[mdast list]: https://github.com/syntax-tree/mdast#list
[YozoraListTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/list/src/theme.ts
