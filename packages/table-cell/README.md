<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-table-cell</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-table-cell">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-table-cell.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table-cell">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-table-cell.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table-cell">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-table-cell.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-table-cell"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table-cell/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table-cell/peer/styled-components"
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

This package is designed to render [mdast table cell][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-table-cell
  ```

* yarn

  ```bash
  yarn add @yozora/react-table-cell
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import TableCell from '@yozora/react-table-cell'

      const wrapper = (
        <table>
          <tbody>
            <tr>
              <TableCell style={ { color: 'orange', fontSize: '16px' } }>
                some text1
                <span>some text2</span>
              </TableCell>
            </tr>
          </tbody>
        </table>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import TableCell from '@yozora/react-table-cell'

      const theme: DefaultTheme = {
        yozora: {
          tableCell: {
            // padding: '0.4rem',
            borderColor: 'red',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <table>
            <tbody>
              <tr>
                <TableCell style={ { color: 'orange', fontSize: '16px' } }>
                  some text1
                  <span>some text2</span>
                </TableCell>
              </tr>
            </tbody>
          </table>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableCellElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | table cell contents
     `isHeader` | `boolean`                               | `false`   | `false` | Whether is the table header cell
     `align`    | `left|center|right`                     | `false`   | -       | Table cell content align

    TableCellProps inherited all attributes of `HTMLTableCellElement` (`React.HTMLAttributes<HTMLTableCellElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0.4rem 0.8rem`
     borderColor  | `transparent`

    See [YozoraTableCellTheme][] for details.


## References

  - [mdast table][]
  - [mdast table cell][]
  - [mdast table cell][]


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table cell]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablecell
[YozoraTableCellTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/table-cell/src/theme.ts
