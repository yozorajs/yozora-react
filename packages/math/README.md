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

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
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

      const Wrapper = (
        <Math
          value={ code }
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```typescript
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Math from '@yozora/react-math'

      const theme: DefaultTheme = {
        yozora: {
          math: {
            padding: '2px',
            border: '1px solid blue',
            // margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            color: '#d81848',
          }
        }
      }

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

      const Wrapper = (
        <ThemeProvider theme={ theme }>
          <Math
            value={ code }
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | Math content
     `ref`    | `React.RefObject<HTMLDivElement>`   | `false`   | -       | Forwarded ref callback

    MathProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * Theme

    see [YozoraMathTheme][]

[mathjax]: https://www.mathjax.org/
[YozoraMathTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/math/src/theme.ts)

