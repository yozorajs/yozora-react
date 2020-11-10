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

    - Pure

      ```typescript
      // index.tsx
      import React from 'react'
      import ThematicBreak from '@yozora/react-thematic-break'

      const Wrapper = (
        <ThematicBreak style={ { color: 'orange', fontSize: '16px' } } />
      )
      ```

    - With theme

      ```typescript
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import ThematicBreak from '@yozora/react-thematic-break'

      const theme: DefaultTheme = {
        yozora: {
          thematicBreak: {
            borderColor: 'orange',
            // outline: '1px dash red',
            margin: '2rem 0',
          }
        }
      }

      const Wrapper = (
      <ThemeProvider theme={ theme }>
        <ThematicBreak style={ { color: 'orange', fontSize: '16px' } } />
      </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                              | Required  | Default | Description
    :--------:|:---------------------------------:|:---------:|:-------:|:-------------
     `ref`    | `React.RefObject<HTMLHRElement>`  | `false`   | -       | Forwarded ref callback

    ThematicBreakProps inherited all attributes of `HTMLHRElement` (`React.HTMLAttributes<HTMLHRElement>`)

  * Theme

    see [YozoraThematicBreakTheme][]

[mdast thematic-break]: https://github.com/syntax-tree/mdast#thematicbreak
[YozoraThematicBreakTheme]: (https://github.com/lemon-clown/yozora-react/blob/master/packages/thematic-break/src/theme.ts)
