[![npm version](https://img.shields.io/npm/v/@yozora/react-thematic-break.svg)](https://www.npmjs.com/package/@yozora/react-thematic-break)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-thematic-break.svg)](https://www.npmjs.com/package/@yozora/react-thematic-break)
[![npm license](https://img.shields.io/npm/l/@yozora/react-thematic-break.svg)](https://www.npmjs.com/package/@yozora/react-thematic-break)


This library is designed to render [mdast thematic-break][] type data


# Install

  ```shell
  yarn add @yozora/react-thematic-break
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import ThematicBreak from '@yozora/react-thematic-break'

    ReactDOM.render(
      <ThematicBreak />
      , document.getElementById('root')
    )
    ```

  * Props

     Name     | Type                              | Required  | Default | Description
    :--------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLHRElement>`  | `false`   | -       | Forwarded ref callback

    ThematicBreakProps inherited all attributes of `HTMLHRElement` (`React.HTMLAttributes<HTMLHRElement>`)

  * CSS variables

     Name                           | Default   |  Description
    :------------------------------:|:---------:|:-----------------------
     `--md-thematic-margin`         | `1.5em 0` | Thematic break margin
     `--md-thematic-break-bg-color` | `#e1e4e8` | Thematic break background value


[mdast thematic-break]: https://github.com/syntax-tree/mdast#thematicbreak
