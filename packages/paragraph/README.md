[![npm version](https://img.shields.io/npm/v/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)
[![npm license](https://img.shields.io/npm/l/@yozora/react-paragraph.svg)](https://www.npmjs.com/package/@yozora/react-paragraph)


This library is designed to render [mdast paragraph][] type data


# Install

  ```shell
  yarn add @yozora/react-paragraph
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Paragraph from '@yozora/react-paragraph'

    ReactDOM.render(
      <Paragraph>
        <span>Hello, world!</span>
      </Paragraph>
      , document.getElementById('root')
    )
    ```

  * Props

     Name       | Type                                    | Required  | Default | Description
    :----------:|:---------------------------------------:|:---------:|:-------:|:-------------
     `children` | `React.ReactNode`                       | `true`    | -       | Paragraph content
     `ref`      | `React.RefObject<HTMLParagraphElement>` | `false`   | -       | Forwarded ref callback

    Paragraph Props inherited all attributes of `HTMLParagraphElement` (`React.HTMLAttributes<HTMLParagraphElement>`)

  * CSS variables

     Name                           | Default   |  Description
    :------------------------------:|:---------:|:-----------------------
     `--md-paragraph-padding`       | `0`       | Paragraph padding
     `--md-paragraph-margin`        | `0 0 1em` | Paragraph margin
     `--md-paragraph-line-height`   | `2`       | Paragraph border color

[mdast paragraph]: https://github.com/syntax-tree/mdast#paragraph
