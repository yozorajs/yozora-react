[![npm version](https://img.shields.io/npm/v/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)
[![npm license](https://img.shields.io/npm/l/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)


This library is designed to render [mdast table][] type data


# Install

  ```shell
  yarn add @yozora/react-table
  ```

# Usage
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


# References

  - [mdast table][]
  - [mdast table row][]
  - [mdast table cell][]


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table row]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablerow
[YozoraTableTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/table/src/theme.ts
