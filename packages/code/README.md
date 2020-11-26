[![npm version](https://img.shields.io/npm/v/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code.svg)](https://www.npmjs.com/package/@yozora/react-code)


This package is designed to render [mdast code][] type data


# Install

  ```shell
  yarn add @yozora/react-code
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import Code from '@yozora/react-code'

      const wrapper = (
        <Code
          lang="typescript"
          value="let a: number = 1 + 2;"
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import Code from '@yozora/react-code'

      const theme: DefaultTheme = {
        yozora: {
          code: {
            padding: '2px',
            border: '1px solid blue',
            // margin: '0 2px',
            background: 'hsla(210deg, 13%, 12%, 0.05)',
          }
        }
      }

      const code = `
        const a = 1, b = 2, c = 3
        const result = 3 * a * a * a + 2 * b * b + c
        console.log('result:', result)
      `

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <Code lang="typescript" value={ code } />
        </ThemeProvider>
      )
      ```

  * Props

     Name     | Type                                | Required  | Default | Description
    :--------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`  | `string`                            | `true`    | -       | code content
     `ref`    | `React.RefObject<HTMLSpanElement>`  | `false`   | -       | Forwarded ref callback

    CodeProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`)

  * Theme

     Prop Name            | Default
    :--------------------:|:--------------
     padding              | `0`
     border               | `none`
     margin               | `0`
     lineHeight           | `1.33`
     background           | `none`
     fontFamily           | `Consolas, "Source Code Pro", monospace, sans-serif`
     selectionBackground  | `none`

    See [YozoraCodeTheme][] for details.


# References

  - [mdast code][]
  - [YozoraCodeTheme][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[YozoraCodeTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/code/src/theme.ts
