<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-table</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-table">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-table.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-table.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-table.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-table"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table/peer/styled-components"
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

This package is designed to render [mdast table][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-table
  ```

* yarn

  ```bash
  yarn add @yozora/react-table
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Table from '@yozora/react-table'

      const rows: React.ReactNode[] = [
        (<tr key="0"><th>Name</th></tr>),
        (<tr key="1"><td>Alice</td></tr>),
        (<tr key="2"><td>Bob</td></tr>),
      ]

      const wrapper = (
        <Table style={ { color: 'orange', fontSize: '16px' } }>
          { rows }
        </Table>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Table from '@yozora/react-table'

      const theme: DefaultTheme = {
        yozora: {
          table: {
            width: '100%',
            overflow: 'hidden auto',
            margin: 18,
          }
        }
      }

      const rows: React.ReactNode[] = [
        (<tr key="0"><th>Name</th></tr>),
        (<tr key="1"><td>Alice</td></tr>),
        (<tr key="2"><td>Bob</td></tr>),
      ]

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Table style={ { color: 'orange', fontSize: '16px' } }>
            { rows }
          </Table>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableElement>` | `false`   | -       | Forwarded ref callback
     `head`     | `React.ReactNode`                   | `true`    | -       | table head rows
     `body`     | `React.ReactNode`                   | `false`   | -       | table body rows

    TableProps inherited all attributes of `HTMLTableElement` (`React.TableHTMLAttributes<HTMLTableElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     width          | `max-width`
     overflow       | `auto`
     margin         | `margin`
     borderSpacing  | `0`
     borderCollapse | `collapse`

    See [YozoraTableTheme][] for details.


## References

  - [mdast table][]
  - [mdast table row][]
  - [mdast table cell][]


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table row]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablerow
[YozoraTableTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/table/src/theme.ts
