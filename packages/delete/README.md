[![npm version](https://img.shields.io/npm/v/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)
[![npm license](https://img.shields.io/npm/l/@yozora/react-delete.svg)](https://www.npmjs.com/package/@yozora/react-delete)


This library is designed to render [mdast delete][] type data


# Install

  ```shell
  yarn add @yozora/react-delete
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      // index.tsx
      import React from 'react'
      import Delete from '@yozora/react-delete'

      const wrapper = (
        <Delete style={{ color: 'orange', fontSize: '16px' }}>
          some text1
          <span>some text2</span>
        </Delete>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Delete from '@yozora/react-delete'

      const theme: DefaultTheme = {
        yozora: {
          delete: {
            color: 'red',
            fontSize: 18,
            fontWeight: undefined,
            // fontStyle: 'oblique',
            textDecoration: 'dashed',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Delete>
            some text1
            <span>some text2</span>
          </Delete>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | Delete content

    DeleteProps inherited all attributes of `HTMLSpanElement` (`React.DelHTMLAttributes<HTMLSpanElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     color          | `inherit`
     fontSize       | `inherit`
     fontWeight     | `inherit`
     fontStyle      | `inherit`
     textDecoration | `line-through`

    See [YozoraDeleteTheme][] for details.


# References

  - [mdast delete][]


[mdast delete]: https://github.com/syntax-tree/mdast#delete
[YozoraDeleteTheme]: (https://github.com/guanghechen/yozora-react/blob/master/packages/delete/src/theme.ts)
