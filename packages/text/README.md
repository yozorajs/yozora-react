[![npm version](https://img.shields.io/npm/v/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)
[![npm license](https://img.shields.io/npm/l/@yozora/react-text.svg)](https://www.npmjs.com/package/@yozora/react-text)


This library is designed to render [mdast text][] type data


# Install

  ```shell
  yarn add @yozora/react-text
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Text from '@yozora/react-text'

      const wrapper = (
        <Text value="Hello, world!" />
      )

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Text from '@yozora/react-text'

      const theme: DefaultTheme = {
        yozora: {
          text: {
            lineHeight: '2',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Text
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
     `value`  | `string`                            | `true`    | -       | Text content

    TextProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name  | Default
    :----------:|:--------------
     lineHeight | `inherit`

    See [YozoraTextTheme][] for details.


# References

  - [mdast text][]


[mdast text]: https://github.com/syntax-tree/mdast#text
[YozoraTextTheme]: (https://github.com/guanghechen/yozora-react/blob/master/packages/text/src/theme.ts)
