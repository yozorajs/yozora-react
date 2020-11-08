[![npm version](https://img.shields.io/npm/v/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)
[![npm license](https://img.shields.io/npm/l/@yozora/react-emphasis.svg)](https://www.npmjs.com/package/@yozora/react-emphasis)


This library is designed to render [mdast emphasis][] type data


# Install

  ```shell
  yarn add @yozora/react-emphasis
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Emphasis from '@yozora/react-emphasis'

    ReactDOM.render(
      <Emphasis>
        <span>Hello, world!</span>
      </Emphasis>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                   | `true`    | -       | Emphasis content
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    EmphasisProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                       | Default   |  Description
    :--------------------------:|:---------:|:-----------------------
     `--md-emphasis-color`      | -         | Emphasis text font color
     `--md-emphasis-font-size`  | `1em`     | Emphasis text font size
     `--md-emphasis-font-style` | `italic`  | Emphasis text font style

[mdast emphasis]: https://github.com/syntax-tree/mdast#emphasis
