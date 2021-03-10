[![npm version](https://img.shields.io/npm/v/@yozora/react-table-row.svg)](https://www.npmjs.com/package/@yozora/react-table-row)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-table-row.svg)](https://www.npmjs.com/package/@yozora/react-table-row)
[![npm license](https://img.shields.io/npm/l/@yozora/react-table-row.svg)](https://www.npmjs.com/package/@yozora/react-table-row)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-table-row)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-table-row/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-table-row/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-table-row`

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
