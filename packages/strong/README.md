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
     `children` | `React.ReactNode`                   | `true`    | `-`     | strong content
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | `-`     | Forwarded ref callback

    Strong Props inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

[mdast strong]: https://github.com/syntax-tree/mdast#strong
