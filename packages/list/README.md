[![npm version](https://img.shields.io/npm/v/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)
[![npm license](https://img.shields.io/npm/l/@yozora/react-list.svg)](https://www.npmjs.com/package/@yozora/react-list)


This library is designed to render [mdast list][] and [mdast list-item][] type data


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
    import { ListItem, OrderedList, UnorderedList } from '@yozora/react-list'

    ReactDOM.render(
      <div>
        <OrderedList start={ 1 } type="a">
          <ListItem key={ 0 }>First: Good afternoon!</ListItem>
          <ListItem key={ 1 }>Second: Good night!</ListItem>
        </OrderedList>
        <UnorderedList>
          <ListItem key={ 0 }>apple</ListItem>
          <ListItem key={ 1 }>banana</ListItem>
          <ListItem key={ 2 }>cat</ListItem>
        </UnorderedList>
      </div>
      , document.getElementById('root')
    )
    ```


  * ListItemProps

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                   | `true`    | -       | ListItem content
     `ref`      | `React.RefObject<HTMLLIElement>`    | `false`   | -       | Forwarded ref callback
     `status`   | `'todo'|'doing'|'done'`             | `false`   | -       | Whether if it is a TODO item, and given its status

    ListItemProps inherited all attributes of `HTMLLIElement` (`React.LiHTMLAttributes<HTMLLIElement>`)

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

     Name                     | Default         |  Description
    :------------------------:|:---------------:|:-----------------------
     `--md-list-item-margin`  | ` 0 0 0 0.25em` | List item margin
     `--md-list-padding`      | `0.625em 1em`   | List padding
     `--md-list-margin`       | `0 0 1.25em`    | List margin


[mdast list-item]: https://github.com/syntax-tree/mdast#listitem
[mdast list]: https://github.com/syntax-tree/mdast#list
