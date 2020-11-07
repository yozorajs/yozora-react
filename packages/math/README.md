[![npm version](https://img.shields.io/npm/v/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)
[![npm license](https://img.shields.io/npm/l/@yozora/react-math.svg)](https://www.npmjs.com/package/@yozora/react-math)


This library is designed to render [mdast math][] type data


# Install

  ```shell
  yarn add @yozora/react-math
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Math from '@yozora/react-math'

    const code = `
      \\begin{align}
        f(x) = \\left\\lbrace
          \\begin{aligned}
            &x^2, &x < 0 \\\\
            &\\frac{1}{x^3}, &x > 0
          \\end{aligned}
        \\right.
      \\end{align}
    `

    ReactDOM.render(
      <Math value={ code }>
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | Math content
     `ref`    | `React.RefObject<HTMLDivElement>`   | `false`   | -       | Forwarded ref callback

    MathProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * CSS variables

     Name                                 | Default                           |  Description
    :------------------------------------:|:---------------------------------:|:-----------------------

[mathjax]: https://www.mathjax.org/
