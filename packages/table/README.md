<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/table#readme">@yozora/react-table</a>
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

This component is for rendering the [Table][@yozora/ast#table], [TableRow][@yozora/ast#tablerow], [TableCell][@yozora/ast#tablecell] data produced by
[@yozora/tokenizer-table][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.

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

* Basic:

  ```tsx
  import React from 'react'
  import Table from '@yozora/react-table'

  const ths: React.ReactNode[] = ['Name', 'Age']

  const tds: React.ReactNode[][] = [
    ['Alice', 18],
    ['Bob', 19],
  ]

  const wrapper = (
    <Table
      aligns={[ 'center', 'right' ]}
      ths={ths}
      tds={tds}
      style={{ color: 'orange', fontSize: '16px' }}
    />
  )
  ```

### Props

Name        | Type                    | Required  | Default | Description
:----------:|:-----------------------:|:---------:|:-------:|:-------------
`aligns`    | `(string|undefined)[]>` | `true`    | -       | Table cells in thead
`ths`       | `React.ReactNode[]`     | `true`    | -       | Table cells in thead
`tds`       | `React.ReactNode[]`     | `true`    | -       | Table cells in tbody
`className` | `string`                | `false`   | -       | Root css class
`style`     | `React.CSSProperties`   | `false`   | -       | Root css style

* `aligns`: `Array<'left'|'center'|'right'|undefined>`

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-table'`.


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-table][]
* [mdast table][]
* [mdast table row][]
* [mdast table cell][]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#table
[@yozora/ast#table]: https://www.npmjs.com/package/@yozora/ast#table
[@yozora/ast#tablerow]: https://www.npmjs.com/package/@yozora/ast#tablerow
[@yozora/ast#tablecell]: https://www.npmjs.com/package/@yozora/ast#tablecell
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-table]: https://www.npmjs.com/package/@yozora/tokenizer-table
[mdast table]: https://github.com/syntax-tree/mdast#table
[mdast table row]: https://github.com/syntax-tree/mdast#tablecell
[mdast table cell]: https://github.com/syntax-tree/mdast#tablerow
