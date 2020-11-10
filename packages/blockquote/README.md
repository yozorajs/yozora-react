[![npm version](https://img.shields.io/npm/v/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm license](https://img.shields.io/npm/l/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)


This library is designed to render [mdast blockquote][] type data


# Install

  ```shell
  yarn add @yozora/react-blockquote
  ```

# Usage
  * Use in React project

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
      import Blockquote from '@yozora/react-blockquote'

      const Wrapper = (
        <Blockquote style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Blockquote>
      )
      ```

    - With theme

      ```typescript
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Blockquote from '@yozora/react-blockquote'

      const theme: DefaultTheme = {
        yozora: {
          blockquote: {
            color: 'red',
            padding: '0 1rem',
            borderColor: 'orange',
            margin: 18,
            background: 'rgba(0, 0, 0, 0.15)',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Blockquote>
            some text1
            <span>some text2</span>
          </Blockquote>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                 | `true`    | -       | Blockquote content
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback

    BlockquoteProps inherited all attributes of `HTMLDivElement` (`React.BlockquoteHTMLAttributes<HTMLDivElement>`)

  * Theme

    see [YozoraBlockquoteTheme][]

[mdast blockquote]: https://github.com/syntax-tree/mdast#blockquote
[YozoraBlockquoteTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/blockquote/src/theme.ts)
