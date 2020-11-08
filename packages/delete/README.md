[![npm version](https://img.shields.io/npm/v/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm license](https://img.shields.io/npm/l/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)


This library is designed to render [mdast delete][] type data


# Install

  ```shell
  yarn add @yozora/react-delete
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Delete from '@yozora/react-delete'

    ReactDOM.render(
      <Delete>
        <span>Hello, world!</span>
      </Delete>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                   | `true`    | -       | Delete content
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    DeleteProps inherited all attributes of `HTMLSpanElement` (`React.DelHTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                           | Default         |  Description
    :------------------------------:|:---------------:|:-----------------------
     `--md-delete-color`            | -               | Delete text font color
     `--md-delete-font-size`        | `1em`           | Delete text font size
     `--md-delete-font-style`       | `normal`        | Delete text font style
     `--md-delete-text-decoration`  | `line-through`  | Delete text decoration

[mdast delete]: https://github.com/syntax-tree/mdast#delete
