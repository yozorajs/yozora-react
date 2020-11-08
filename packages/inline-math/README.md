[![npm version](https://img.shields.io/npm/v/@yozora/react-inline-math.svg)](https://www.npmjs.com/package/@yozora/react-inline-math)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-inline-math.svg)](https://www.npmjs.com/package/@yozora/react-inline-math)
[![npm license](https://img.shields.io/npm/l/@yozora/react-inline-math.svg)](https://www.npmjs.com/package/@yozora/react-inline-math)


This library is designed to render [mdast inline-math][] type data


# Install

  ```shell
  yarn add @yozora/react-inline-math
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import InlineMath from '@yozora/react-inline-math'

    ReactDOM.render(
      <InlineMath value="E=m \\cdot c^2" />
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | InlineMath content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    InlineMathProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                                 | Default                           |  Description
    :------------------------------------:|:---------------------------------:|:-----------------------

[mathjax]: https://www.mathjax.org/
