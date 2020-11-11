[![npm version](https://img.shields.io/npm/v/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)
[![npm license](https://img.shields.io/npm/l/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)


This library is designed to render [mdast paragraph][] type data


# Install

  ```shell
  yarn add @yozora/react-paragraph
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      // index.tsx
      import React from 'react'
      import Paragraph from '@yozora/react-paragraph'

      const wrapper = (
        <Paragraph style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Paragraph>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Paragraph from '@yozora/react-paragraph'

      const theme: DefaultTheme = {
        yozora: {
          paragraph: {
            padding: '0 1rem',
            margin: 18,
            // lineHeight: 1.5,
            color: 'red',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Paragraph>
            some text1
            <span>some text2</span>
          </Paragraph>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLParagraphElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                       | `true`    | -       | Paragraph content

    ParagraphProps inherited all attributes of `HTMLParagraphElement` (`React.HTMLAttributes<HTMLParagraphElement>`)

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0`
     margin       | `0 0 1em`
     lineHeight   | `2`
     color        | `inherit`

    See [YozoraParagraphTheme][] for details.


[mdast paragraph]: https://github.com/syntax-tree/mdast#paragraph
[YozoraParagraphTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/paragraph/src/theme.ts)
