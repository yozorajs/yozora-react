[![npm version](https://img.shields.io/npm/v/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)
[![npm license](https://img.shields.io/npm/l/@yozora/react-table.svg)](https://www.npmjs.com/package/@yozora/react-table)


This library is designed to render [mdast table][], [mdast table row][] and
[mdast table cell][] type data


# Install

  ```shell
  yarn add @yozora/react-table
  ```

# Usage
  * Use in React project

    ```tsx
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { Table, TableCell, TableRow } from '@yozora/react-table'

    const HeadRow = () => (
      <TableRow>
        <TableCell isHeader={ true }>Name</TableCell>
      </TableRow>
    )

    const BodyRows = () => (
      <React.Fragment>
        <TableRow>
          <TableCell isHeader={ false }>Alice</TableCell>
        </TableRow>
        <TableRow>
          <TableCell isHeader={ false }>Bob</TableCell>
        </TableRow>
      </React.Fragment>
    )

    ReactDOM.render(
      <Table
        head={ <HeadRow /> }
        body={ <BodyRows /> }
        style={ { color: 'orange', fontSize: '16px' }}
      />
      , document.getElementById('root')
    )
    ```

  * TableProps

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableElement>` | `false`   | -       | Forwarded ref callback
     `head`     | `React.ReactNode`                   | `true`    | -       | table head rows
     `body`     | `React.ReactNode`                   | `false`   | -       | table body rows

    TableProps inherited all attributes of `HTMLTableElement` (`React.TableHTMLAttributes<HTMLTableElement>`)

  * TableRowProps

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableRowElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | table row contents

    TableRowProps inherited all attributes of `HTMLTableRowElement` (`React.HTMLAttributes<HTMLTableRowElement>`)

  * TableCellProps

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLTableRowElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | table row contents
     `isHeader` | `boolean`                               | `false`   | `false` | Whether is the table header cell
     `align`    | `left|center|right`                     | `false`   | -       | Table cell content align

    TableCellProps inherited all attributes of `HTMLTableCellElement` (`React.HTMLAttributes<HTMLTableCellElement>`)

  * CSS variables

     Name                       | Default         |  Description
    :--------------------------:|:---------------:|:-----------------------
     `--md-table-width`         | `max-content`   | Table width
     `--md-table-overflow`      | `auto`          | Table overflow
     `--md-table-margin`        | `0 0 1rem`      | Table margin
     `--md-table-cell-padding`  | `0.4rem 0.8rem` | Table cell padding
     `--md-table-border-color`  | -               | Table border color


[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table row]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablerow
