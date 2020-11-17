[![npm version](https://img.shields.io/npm/v/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm license](https://img.shields.io/npm/l/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)


This package is designed to render [mdast inlineCode][] type data


# Install

  ```shell
  yarn add @yozora/react-inline-code
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import InlineCode from '@yozora/react-inline-code'

      const wrapper = (
        <InlineCode
          value="Hello, world!"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import InlineCode from '@yozora/react-inline-code'

      const theme: DefaultTheme = {
        yozora: {
          inlineCode: {
            padding: '2px',
            borderRadius: '3px',
            margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
            lineHeight: 1.5,
            color: '#d81848',
            fontFamily: 'Consolas, monospace, sans-serif',
            fontSize: '1em',
            fontWeight: 'inherit',
            fontStyle: undefined,
            // whiteSpace: undefined,
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <InlineCode
            value="Hello, world!"
            style={ { color: 'orange', fontSize: '16px' } }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `value`  | `string`                            | `true`    | -       | InlineCode content

    InlineCodeProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `4px`
     borderRadius | `2px`
     margin       | `0`
     background   | `none`
     lineHeight   | `1.375`
     color        | `inherit`
     fontFamily   | `Consolas, monospace, sans-serif`
     fontSize     | `1em`
     fontWeight   | `inherit`
     fontStyle    | `inherit`
     whiteSpace   | `normal`

    See [YozoraInlineCodeTheme][] for details.


# References

  - [mdast inlineCode][]


[mdast inlineCode]: https://github.com/syntax-tree/mdast#inlinecode
[YozoraInlineCodeTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/inline-code/src/theme.ts
