[![npm version](https://img.shields.io/npm/v/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)


This library is designed to render [mdast code][] type data


# Install

  ```shell
  yarn add @yozora/react-code
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Code from '@yozora/react-code'

    ReactDOM.render(
      <Code
        lang="typescript"
        value="console.log(Hello, world!)"
      />
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | code content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    CodeProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * CSS variables

     Name                    | Default  |  Description
    :-----------------------:|:--------:|:-----------------------

[mdast code]: https://github.com/syntax-tree/mdast#code
