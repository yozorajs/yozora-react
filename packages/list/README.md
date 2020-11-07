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

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { OrderedList, UnorderedList } from '@yozora/react-list'

    ReactDOM.render(
      <div>
        <OrderedList start={ 1 } type="a">
          <li>First: Good afternoon!</li>
          <li>Second: Good night!</li>
        </OrderedList>
        <UnorderedList>
          <li>apple</li>
          <li>banana</li>
          <li>cat</li>
        </UnorderedList>
      </div>
      , document.getElementById('root')
    )
    ```

  * OrderedListProps

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                 | `true`    | -       | OrderedList content
     `start`    | `number`                          | `true`    | -       | OrderedList start number
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback

    OrderedListProps inherited all attributes of `HTMLOListElement` (`React.OlHTMLAttributes<HTMLOListElement>`)

  * UnorderedListProps

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                 | `true`    | -       | UnorderedList content
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback

    UnorderedListProps inherited all attributes of `HTMLUListElement` (`React.HTMLAttributes<HTMLUListElement>`)

  * CSS variables

     Name                     | Default       |  Description
    :------------------------:|:-------------:|:-----------------------
     `--md-list-bg-color`     | -             | List background color
     `--md-list-border-color` | -             | List border color
     `--md-list-padding`      | `0.625em 1em` | List padding
     `--md-list-margin`       | `0 0 1.25em`  | List margin

[mdast list]: https://github.com/syntax-tree/mdast#list
