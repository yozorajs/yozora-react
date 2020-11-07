[![npm version](https://img.shields.io/npm/v/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm license](https://img.shields.io/npm/l/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)


This library is designed to render [mdast inline-code][] type data


# Install

  ```shell
  yarn add @yozora/react-inline-code
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import InlineCode from '@yozora/react-inline-code'

    ReactDOM.render(
      <InlineCode value="Hello, world!">
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | InlineCode content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    InlineCodeProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                                 | Default                           |  Description
    :------------------------------------:|:---------------------------------:|:-----------------------
      `--md-inline-code-padding`          | `0.2em`                           | InlineCode padding
      `--md-inline-code-margin`           | `0`                               | InlineCode margin
      `--md-inline-code-border-radius`    | `2px`                             | InlineCode border radius
      `--md-inline-code-bg-color`         | -                                 | InlineCode background color
      `--md-inline-code-color`            | -                                 | InlineCode text color
     `--md-inline-code-font-family`       | `Consolas, monospace, sans-serif` | InlineCode font size
     `--md-inline-code-font-size`         | `1em`                             | InlineCode font size
     `--md-inline-code-font-weight`       | `500`                             | InlineCode line height
     `--md-inline-code-font-line-height`  | `1.375`                           | InlineCode font weight
     `--md-inline-code-font-white-space`  | `normal`                          | InlineCode white space

[mdast inline-code]: https://github.com/syntax-tree/mdast#inlinecode
