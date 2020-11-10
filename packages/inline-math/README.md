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

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
      import InlineMath from '@yozora/react-inline-math'

      const Wrapper = (
        <InlineMath
          value="x^2 + y^2 = z^2"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```typescript
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import InlineMath from '@yozora/react-inline-math'

      const theme: DefaultTheme = {
        yozora: {
          inlineMath: {
            padding: '2px',
            border: '1px solid blue',
            // margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            color: '#d81848',
          }
        }
      }

      const Wrapper = (
        <ThemeProvider theme={ theme }>
          <InlineMath
            value="x^2 + y^2 = z^2"
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | InlineMath content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    InlineMathProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

    see [YozoraInlineMathTheme][]

[mathjax]: https://www.mathjax.org/
[YozoraInlineMathTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/inline-math/src/theme.ts)
