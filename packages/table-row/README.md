<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/table-row#readme">@yozora/react-table-row</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-table-row">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-table-row.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table-row">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-table-row.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-table-row">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-table-row.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-table-row"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table-row/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-table-row/peer/styled-components"
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

This package is designed to render [mdast table row][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-table-row
  ```

* yarn

  ```bash
  yarn add @yozora/react-table-row
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import TableRow from '@yozora/react-table-row'

      const wrapper = (
        <table>
          <tbody>
            <TableRow style={ { color: 'orange', fontSize: '16px' } }>
              <td>
                some text1
                <span>some text2</span>
              </td>
            </TableRow>
          </tbody>
        </table>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import TableRow from '@yozora/react-table-row'

      const theme: DefaultTheme = {
        yozora: {
          tableRow: {
            // background: 'red',
            evenBackground: 'blue',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <table>
            <tbody>
              <TableRow style={ { color: 'orange', fontSize: '16px' } }>
                <td>
                  some text1
                  <span>some text2</span>
                </td>
              </TableRow>
            </tbody>
          </table>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableRowElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | table row contents

    TableRowProps inherited all attributes of `HTMLTableRowElement` (`React.HTMLAttributes<HTMLTableRowElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     background     | `none`
     evenBackground | `none`

    See [YozoraTableRowTheme][] for details.


## References

  - [mdast table][]
  - [mdast table row][]
  - [mdast table cell][]


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table row]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablerow
[YozoraTableRowTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/table-row/src/theme.ts
