[![npm version](https://img.shields.io/npm/v/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)


Render [mdast code][] type data with particular components.


# Install

  ```shell
  yarn add @yozora/react-code-embed
  ```

# Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import CodeEmbed, { CodeRendererProps } from '@yozora/react-code-embed'

      const JsxRenderer = ({ value }: CodeRendererProps): React.ReactElement => {
        // eslint-disable-next-line no-new-func
        const f = new Function(value)
        const v = f()
        return <span data-type="jsx">{ v }</span>
      }

      const code = `
        const a = 1 + 2;
        return a * a
      `

      const wrapper = (
        <CodeEmbed
          lang="jsx"
          value={ code }
          CodeRenderer={ JsxRenderer }
        />
      )
      ```

    - With theme

      ```tsx
      import React from 'react'
      import { DefaultTheme, ThemeProvider } from 'styled-components'
      import CodeEmbed, { CodeRendererProps } from '@yozora/react-code-embed'

      const JsxRenderer = ({ value }: CodeRendererProps): React.ReactElement => {
        // eslint-disable-next-line no-new-func
        const f = new Function(value)
        const v = f()
        return <span data-type="jsx">{ v }</span>
      }

      const theme: DefaultTheme = {
        yozora: {
          codeEmbed: {
            padding: '2px',
            border: 'none',
            background: '#fff',
            color: '#ccc',
            errorBackground: 'red',
            errorColor: '#f8f8f2',
            errorFontSize: '0.9em',
          }
        }
      }

      const code = `
        const a = 1 + 2;
        return a * a
      `

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <CodeEmbed
            lang="jsx"
            value={ code }
            CodeRenderer={ JsxRenderer }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name                       | Type                | Required  | Default | Description
    :--------------------------:|:-------------------:|:---------:|:-------:|:-------------
     `lang`                     | `string`            | `true`    | -       | Code language
     `value`                    | `string`            | `true`    | -       | Code content
     `CodeRenderer`             | `React.ElementType` | `true`    | -       | Code renderer
     `errorClassName`           | `string`            | `false`   | -       | CSS class name for CodeEmbedError

    CodeEmbedProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`

  * Theme

     Prop Name        | Default
    :----------------:|:----------------------------------------------------
     padding          | `0`
     border           | `none`
     background       | `#fff`
     color            | `#000`
     errorBackground  | `#ff5555`
     errorColor       | `#f8f8f2`
     errorFontSize    | `0.9em`
     errorFontFamily  | `Consolas, "Source Code Pro", monospace, sans-serif`

    See [YozoraCodeEmbedTheme][] for details.


# References

  - [mdast code][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[YozoraCodeEmbedTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/code-embed/src/theme.ts
