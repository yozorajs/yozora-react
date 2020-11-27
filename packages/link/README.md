[![npm version](https://img.shields.io/npm/v/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)
[![npm license](https://img.shields.io/npm/l/@yozora/react-link.svg)](https://www.npmjs.com/package/@yozora/react-link)


This package is designed to render [mdast link][] type data


# Install

  ```shell
  yarn add @yozora/react-link
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Link from '@yozora/react-link'

      const wrapper = (
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

    - React router

      ```tsx
      import React from 'react'
      import { BrowserRouter as Router } from 'react-router-dom'
      import { RouteLink as Link } from '@yozora/react-link'

      const wrapper = (
        <Router>
          <Link
            url="/home"
            title="home"
            style={ { color: 'orange', fontSize: '16px' } }
          >
            some text1
            <span>some text2</span>
          </Link>
        </Router>
      )
      ```

    - With theme

      ```tsx
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
     `ref`      | `React.RefObject<HTMLAnchorElement>`  | `false`       | -       | Forwarded ref callback
     `children` | `React.ReactNode`                     | `true`        | -       | link content
     `url`      | `string`                              | `true`        | -       | link url
     `title`    | `string`                              | `false`       | -       | link title
     `target`   | `string`                              | `_blank`      | -       |
     `rel`      | `string`                              | `noreferrer`  | -       |

    LinkProps inherited all attributes of `HTMLAnchorElement` (`React.AnchorHTMLAttributes<HTMLAnchorElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     color          | `inherit`
     fontSize       | `inherit`
     fontStyle      | `inherit`
     textDecoration | `none`

    See [YozoraLinkTheme][] for details.


# References

  - [mdast link][]


[mdast link]: https://github.com/syntax-tree/mdast#link
[YozoraLinkTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/link/src/theme.ts

