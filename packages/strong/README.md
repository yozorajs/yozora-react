[![npm version](https://img.shields.io/npm/v/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)
[![npm license](https://img.shields.io/npm/l/@yozora/react-strong.svg)](https://www.npmjs.com/package/@yozora/react-strong)


This library is designed to render [mdast strong][] type data


# Install

  ```shell
  yarn add @yozora/react-strong
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import strong from '@yozora/react-strong'

    ReactDOM.render(
      <strong>
        <span>Hello, world!</span>
      </strong>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                   | `true`    | -       | strong content
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    Strong Props inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                       | Default   |  Description
    :--------------------------:|:---------:|:-----------------------
     `--md-strong-color`        | -         | Strong text font color
     `--md-strong-font-size`    | `1em`     | Strong text font size
     `--md-strong-font-style`   | `normal`  | Strong text font style
     `--md-strong-font-weight`  | `600`     | Strong text font weight

[mdast strong]: https://github.com/syntax-tree/mdast#strong
