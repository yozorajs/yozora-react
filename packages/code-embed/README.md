[![npm version](https://img.shields.io/npm/v/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-embed.svg)](https://www.npmjs.com/package/@yozora/react-code-embed)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-code-embed)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-code-embed/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-code-embed/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-code-embed`

Render [mdast code][] type data with particular components.


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-embed
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-embed
  ```

## Usage
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
     background       | `transparent`
     color            | `inherit`
     errorBackground  | `#ff5555`
     errorColor       | `#f8f8f2`
     errorFontSize    | `0.9em`
     errorFontFamily  | `Consolas, "Source Code Pro", monospace, sans-serif`

    See [YozoraCodeEmbedTheme][] for details.


## References

  - [mdast code][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[YozoraCodeEmbedTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/code-embed/src/theme.ts
