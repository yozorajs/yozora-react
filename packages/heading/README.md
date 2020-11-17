[![npm version](https://img.shields.io/npm/v/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)
[![npm license](https://img.shields.io/npm/l/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)


This package is designed to render [mdast heading][] type data


# Install

  ```shell
  yarn add @yozora/react-heading
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Heading from '@yozora/react-heading'

      const wrapper = (
        <Heading
          level={ 2 }
          style={ { color: 'orange', fontSize: '16px' } }
        >
          Waw -- { 2 }, 中文标题“这”
        </Heading>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Heading from '@yozora/react-heading'

      const theme: DefaultTheme = {
        yozora: {
          heading: {
            fontStyle: 'italic',
            color: '#ccc',
            padding: '0 2em',
            borderColor: 'lightgray',
            // margin: '1.2em -2em 1em',
            lineHeight: 1.25,
            fontFamily: 'inherit',
            h1FontSize: '2em',
            h2FontSize: '1.5em',
            h3FontSize: '1.25em',
            h4FontSize: '1em',
            h5FontSize: '0.875em',
            h6FontSize: '0.85em',
            linkColor: 'blue',
            hoverLinkColor: 'cyan',
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Heading
            level={ 1 }
            style={ { color: 'orange', fontSize: '16px' } }
          >
            Waw -- { 1 }, 中文标题“这”
          </Heading>
        </ThemeProvider>
      )
      ```

  * Props

     Name               | Type                                | Required  | Default                     | Description
    :------------------:|:-----------------------------------:|:---------:|:---------------------------:|:-------------
     `ref`              | `React.RefObject<HTMLDivElement>`   | `false`   | -                           | Forwarded ref callback
     `children`         | `React.ReactNode`                   | `true`    | -                           | Heading content
     `level`            | `1|2|3|4|5|6`                       | `true`    | -                           | Heading level
     `identifier`       | `string`                            | `false`   | `heading-{e.textContent}`   | Heading identifier
     `headingIcon`      | `React.ReactNode`                   | `false`   | `<HeadingHeadingIcon />`    | Heading heading icon
     `headingClassName` | `string`                            | `false`   | -                           | css className for heading heading
     `calcIdentifer`    | `(h: HTMLHeadingElement) => string` | `false`   | `calcIdentifierForHeading`  | generate identifier if it not specified

    HeadingProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * Theme

     Prop Name      | Default
    :--------------:|:--------------
     color          | `inherit`
     padding        | `0 2em`
     borderColor    | `lightgray`
     margin         | `1.2em -2em 1em`
     lineHeight     | 1.25
     fontFamily     | `inherit`
     fontStyle      | `normal`
     h1FontSize     | `2em`
     h2FontSize     | `1.5em`
     h3FontSize     | `1.25em`
     h4FontSize     | `1em`
     h5FontSize     | `0.875em`
     h6FontSize     | `0.85em`
     linkColor      | -
     hoverLinkColor | -

    See [YozoraHeadingTheme][] for details.


# References

  - [mdast heading][]


[mdast heading]: https://github.com/syntax-tree/mdast#heading
[YozoraHeadingTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/heading/src/theme.ts
