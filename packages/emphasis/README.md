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
    - Pure

      ```tsx
      // index.tsx
      import React from 'react'
      import Emphasis from '@yozora/react-emphasis'

      const wrapper = (
        <Emphasis style={ { color: 'orange', fontSize: '16px' } }>
          some text1
          <span>some text2</span>
        </Emphasis>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Emphasis from '@yozora/react-emphasis'

      const theme: DefaultTheme = {
        yozora: {
          emphasis: {
            color: 'red',
            fontSize: 18,
            fontWeight: undefined,
            fontStyle: 'oblique',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Emphasis>
            some text1
            <span>some text2</span>
          </Emphasis>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | Emphasis content

    EmphasisProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name  | Default
    :----------:|:--------------
     color      | `inherit`
     fontSize   | `inherit`
     fontWeight | `inherit`
     fontStyle  | `italic`

    See [YozoraEmphasisTheme][] for details.


# References

  - [mdast emphasis][]


[mdast emphasis]: https://github.com/syntax-tree/mdast#emphasis
[YozoraEmphasisTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/emphasis/src/theme.ts
