[![npm version](https://img.shields.io/npm/v/@yozora/react-table-cell.svg)](https://www.npmjs.com/package/@yozora/react-table-cell)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-table-cell.svg)](https://www.npmjs.com/package/@yozora/react-table-cell)
[![npm license](https://img.shields.io/npm/l/@yozora/react-table-cell.svg)](https://www.npmjs.com/package/@yozora/react-table-cell)


This library is designed to render [mdast table cell][] type data


# Install

  ```shell
  yarn add @yozora/react-table-cell
  ```

# Usage
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


# References

  - [mdast table][]
  - [mdast table cell][]
  - [mdast table cell][]


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table cell]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablecell
[YozoraTableCellTheme]: (https://github.com/guanghechen/yozora-react/blob/master/packages/table-cell/src/theme.ts)
