[![npm version](https://img.shields.io/npm/v/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)
[![npm license](https://img.shields.io/npm/l/@yozora/react-inline-code.svg)](https://www.npmjs.com/package/@yozora/react-inline-code)


This library is designed to render [mdast inline-code][] type data


# Install

  ```shell
  yarn add @yozora/react-inline-code
  ```

# Usage
  * Use in React project

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
      import InlineCode from '@yozora/react-inline-code'

      const Wrapper = (
        <InlineCode
          value="Hello, world!"
          style={ { color: 'orange', fontSize: '16px' } }
        />
      )
      ```

    - With theme

      ```typescript
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

      const Wrapper = (
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
     `value`  | `string`                            | `true`    | -       | InlineCode content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    InlineCodeProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

    see [YozoraInlineCodeTheme][]

[mdast inline-code]: https://github.com/syntax-tree/mdast#inlinecode
[YozoraInlineCodeTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/inline-code/src/theme.ts)
