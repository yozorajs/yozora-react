[![npm version](https://img.shields.io/npm/v/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)
[![npm license](https://img.shields.io/npm/l/@yozora/react-heading.svg)](https://www.npmjs.com/package/@yozora/react-heading)


This library is designed to render [mdast heading][] type data


# Install

  ```shell
  yarn add @yozora/react-heading
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Heading from '@yozora/react-heading'

    ReactDOM.render(
      <Heading level={ 1 }>
        Problem Description
      </Heading>
      , document.getElementById('root')
    )
    ```

  * Props

     Name             | Type                                | Required  | Default                     | Description
    :----------------:|:-----------------------------------:|:---------:|:---------------------------:|:-------------
     `level`          | `1|2|3|4|5|6`                       | `true`    | -                           | Heading level
     `children`       | `React.ReactNode`                   | `true`    | -                           | Heading content
     `ref`            | `React.RefObject<HTMLDivElement>`   | `false`   | -                           | Forwarded ref callback
     `identifier`     | `string`                            | `false`   | `heading-{e.textContent}`   | Heading identifier
     `linkIcon`       | `React.ReactNode`                   | `false`   | `<HeadingLinkIcon />`       | Heading link icon
     `linkClassName`  | `string`                            | `false`   | -                           | css className for heading link
     `calcIdentifer`  | `(h: HTMLHeadingElement) => string` | `false`   | `calcIdentifierForHeading`  | generate identifier if it not specified


    HeadingProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * CSS variables

     Name                           | Default       |  Description
    :------------------------------:|:-------------:|:-----------------------
     `--md-heading-border-color`    | -             | Heading border bottom color
     `--md-heading-margin`          | `1.2em 0 1em` | Heading margin
     `--md-heading-color`           | `inherit`     | Heading text font color
     `--md-heading-font-family`     | -             | Heading text font family
     `--md-heading-line-height`     | `1.25`        | Heading line height
     `--md-heading-font-style`      | `normal`      | Heading text font style
     `--md-heading1-font-size`      | `2em`         | Text font size of h1
     `--md-heading2-font-size`      | `1.5em`       | Text font size of h2
     `--md-heading3-font-size`      | `1.25em`      | Text font size of h3
     `--md-heading4-font-size`      | `1em`         | Text font size of h4
     `--md-heading5-font-size`      | `0.875em`     | Text font size of h5
     `--md-heading6-font-size`      | `0.85em`      | Text font size of h6

[mdast heading]: https://github.com/syntax-tree/mdast#heading
