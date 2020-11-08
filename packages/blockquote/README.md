[![npm version](https://img.shields.io/npm/v/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)
[![npm license](https://img.shields.io/npm/l/@yozora/react-blockquote.svg)](https://www.npmjs.com/package/@yozora/react-blockquote)


This library is designed to render [mdast blockquote][] type data


# Install

  ```shell
  yarn add @yozora/react-blockquote
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Blockquote from '@yozora/react-blockquote'

    ReactDOM.render(
      <Blockquote>
        <span>Hello, world!</span>
      </Blockquote>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                              | Required  | Default | Description
    :----------:|:---------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                 | `true`    | -       | Blockquote content
     `ref`      | `React.RefObject<HTMLDivElement>` | `false`   | -       | Forwarded ref callback

    BlockquoteProps inherited all attributes of `HTMLDivElement` (`React.BlockquoteHTMLAttributes<HTMLDivElement>`)

  * CSS variables

     Name                           | Default       |  Description
    :------------------------------:|:-------------:|:-----------------------
     `--md-blockquote-bg-color`     | -             | Blockquote background color
     `--md-blockquote-border-color` | -             | Blockquote border color
     `--md-blockquote-padding`      | `0.625em 1em` | Blockquote padding
     `--md-blockquote-margin`       | `0 0 1.25em`  | Blockquote margin

[mdast blockquote]: https://github.com/syntax-tree/mdast#blockquote
