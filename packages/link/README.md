[![npm version](https://img.shields.io/npm/v/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)
[![npm license](https://img.shields.io/npm/l/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)


This library is designed to render [mdast link][] type data


# Install

  ```shell
  yarn add @yozora/react-link
  ```

# Usage
  * Use in React project

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
      import Link from '@yozora/react-link'

      const Wrapper = (
        <Link
          url="/home"
          title="home"
          style={ { color: 'orange', fontSize: '16px' } }
        >
          some text1
          <span>some text2</span>
        </Link>
      )
      ```

    - With theme

      ```typescript
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Link from '@yozora/react-link'

      const theme: DefaultTheme = {
        yozora: {
          link: {
            color: 'blue',
            fontSize: undefined,
            fontStyle: 'italic',
            textDecoration: 'none',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Link
            url="/home"
            title="home"
            style={ { color: 'orange', fontSize: '16px' } }
          >
            some text1
            <span>some text2</span>
          </Link>
        </ThemeProvider>
      )
      ```

  * Props

     Name       | Type                                  | Required      | Default | Description
    :----------:|:-------------------------------------:|:-------------:|:-------:|:-------------
     `url`      | `string`                              | `true`        | -       | link url
     `children` | `React.ReactNode`                     | `true`        | -       | link content
     `title`    | `string`                              | `false`       | -       | link title
     `ref`      | `React.RefObject<HTMLAnchorElement>`  | `false`       | -       | Forwarded ref callback
     `target`   | `string`                              | `_blank`      | -       |
     `rel`      | `string`                              | `noreferrer`  | -       |

    LinkProps inherited all attributes of `HTMLAnchorElement` (`React.AnchorHTMLAttributes<HTMLAnchorElement>`)

  * Theme

    see [YozoraLinkTheme][]

[mdast link]: https://github.com/syntax-tree/mdast#link
[YozoraLinkTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/link/src/theme.ts)

