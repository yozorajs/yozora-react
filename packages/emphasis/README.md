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
     `children` | `React.ReactNode`                   | `true`    | `-`     | Emphasis content
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | `-`     | Forwarded ref callback

    Emphasis Props inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

[mdast emphasis]: https://github.com/syntax-tree/mdast#emphasis
