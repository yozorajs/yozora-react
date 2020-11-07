[![npm version](https://img.shields.io/npm/v/@yozora/react-list-item.svg)](https://www.npmjs.com/package/@yozora/react-list-item)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-list-item.svg)](https://www.npmjs.com/package/@yozora/react-list-item)
[![npm license](https://img.shields.io/npm/l/@yozora/react-list-item.svg)](https://www.npmjs.com/package/@yozora/react-list-item)


This library is designed to render [mdast list-item][] type data


# Install

  ```shell
  yarn add @yozora/react-list-item
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import ListItem from '@yozora/react-list-item'

    ReactDOM.render(
      <ListItem>
        <span>Hello, world!</span>
      </ListItem>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                                | Required  | Default | Description
    :----------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                   | `true`    | -       | List-item content
     `ref`      | `React.RefObject<HTMLLIElement>`    | `false`   | -       | Forwarded ref callback

    ListItemProps inherited all attributes of `HTMLLIElement` (`React.LiHTMLAttributes<HTMLLIElement>`)

  * CSS variables

     Name                     | Default         |  Description
    :------------------------:|:---------------:|:-----------------------
     `--md-list-item-margin`  | ` 0 0 0 0.25em` | List item margin

[mdast list-item]: https://github.com/syntax-tree/mdast#listitem
