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

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import link from '@yozora/react-link'

    ReactDOM.render(
      <link>
        <span>Hello, world!</span>
      </link>
      , document.getElementById('root')
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

    link Props inherited all attributes of `HTMLAnchorElement` (`React.AnchorHTMLAttributes<HTMLAnchorElement>`)

  * CSS variables

     Name                         | Default   |  Description
    :----------------------------:|:---------:|:-----------------------
     `--md-link-color`            | -         | link text color
     `--md-link-font-size`        | `inherit` | link text font size
     `--md-link-font-style`       | `normal`  | link text font style
     `--md-link-text-decoration`  | `none`    | link text text decoration

[mdast link]: https://github.com/syntax-tree/mdast#link
