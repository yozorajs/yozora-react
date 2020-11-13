[![npm version](https://img.shields.io/npm/v/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)
[![npm license](https://img.shields.io/npm/l/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)


This library is designed to render [mdast list][] type data


# Install

  ```shell
  yarn add @yozora/react-list
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      // index.tsx
      import React from 'react'
      import List from '@yozora/react-list'

      const wrapper = (
        <List ordered={ true } start={ 3 } type="a">
          <li key={ 0 }>apple</li>
          <li key={ 1 }>banana</li>
          <li key={ 2 }>cat</li>
        </List>
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import List from '@yozora/react-list'

      const theme: DefaultTheme = {
        yozora: {
          list: {
            color: 'red',
            padding: '0 1rem',
            margin: 18,
            // lineHeight: 1.5,
          }
        }
      }

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <List ordered={ false }>
            <li key={ 0 }>apple</li>
            <li key={ 1 }>banana</li>
            <li key={ 2 }>cat</li>
          </List>
        </ThemeProvider>>
      )
      ```

  * OrderedListProps

     Name       | Type                                | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLOListElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                   | `true`    | -       | OrderedList content
     `start`    | `number`                            | `true`    | -       | OrderedList start number

    OrderedListProps inherited all attributes of `HTMLOListElement` (`React.OlHTMLAttributes<HTMLOListElement>`)

  * UnorderedListProps

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback
     `children` | `React.ReactNode`                 | `true`    | -       | UnorderedList content

    UnorderedListProps inherited all attributes of `HTMLUListElement` (`React.HTMLAttributes<HTMLUListElement>`)

  * Props

     Name       | Type      | Required  | Default | Description
    :----------:|:---------:|:---------:|:-------:|:-------------
     ordered    | `boolean` | true      | -       | Flag used  to distinguish ordered and unordered list

    ListProps extends OrderedListProps and UnorderedListProps.

  * Theme

     Prop Name    | Default
    :------------:|:--------------
     padding      | `0 0 0 1.2em`
     margin       | `0 0 1`
     lineHeight   | `2`
     borderColor  | `transparent`

    See [YozoraListTheme][] for details.


# References

  - [mdast list][]


[mdast list]: https://github.com/syntax-tree/mdast#list
[YozoraListTheme]: (https://github.com/guanghechen/yozora-react/blob/master/packages/list/src/theme.ts
