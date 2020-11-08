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

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Text from '@yozora/react-text'

    ReactDOM.render(
      <Text value="Hello, world!" />
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | Text content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    TextProps inherited all attributes of `HTMLSpanElement` (`React.HTMLAttributes<HTMLSpanElement>`)

  * CSS variables

     Name                    | Default  |  Description
    :-----------------------:|:--------:|:-----------------------
     `--md-text-color`       | -        | Text font color
     `--md-text-font-size`   | `1em`    | Text font size
     `--md-text-font-style`  | `normal` | Text font style
     `--md-text-font-weight` | `400`    | Text font weight

[mdast text]: https://github.com/syntax-tree/mdast#text
