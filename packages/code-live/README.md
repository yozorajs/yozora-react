[![npm version](https://img.shields.io/npm/v/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-code-live)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-code-live/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-code-live/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-code-live`

Create a code live container.


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-live
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-live
  ```

## Usage
  * Use in React project

    - Pure

      ```tsx
      import React from 'react'
      import CodeLive, { CodeRendererProps } from '@yozora/react-code-live'

      const JsxRenderer = ({ value }: CodeRendererProps): React.ReactElement => {
        // eslint-disable-next-line no-new-func
        const f = new Function(code)
        const v = f()
        return <span data-type="jsx">{ v }</span>
      }

      const code = `
        const a = 1 + 2;
        return a * a
      `

      const wrapper = (
        <CodeLive
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
      import CodeLive, { CodeRendererProps } from '@yozora/react-code-live'

      const JsxRenderer = ({ value }: CodeRendererProps): React.ReactElement => {
        // eslint-disable-next-line no-new-func
        const f = new Function(code)
        const v = f()
        return <span data-type="jsx">{ v }</span>
      }

      const theme: DefaultTheme = {
        yozora: {
          codeLive: {
            margin: '1rem 0',
            editorBackground: 'pink',
            editorCaretColor: 'white',
            editorFontSize: '18px',
          },
          codeEmbed: {
            errorBackground: 'red',
          }
        }
      }

      const code = `
        const a = 1 + 2;
        return a * a
      `

      const wrapper = (
        <ThemeProvider theme={ theme }>
          <CodeLive
            lang="jsx"
            value={ code }
            CodeRenderer={ JsxRenderer }
          />
        </ThemeProvider>
      )
      ```

  * Props

     Name                       | Type                | Required  | Default             | Description
    :--------------------------:|:-------------------:|:---------:|:-------------------:|:-------------
     `lang`                     | `string`            | `true`    | -                   | Code language
     `value`                    | `string`            | `true`    | -                   | Code content
     `darken`                   | `boolean`           | `false`   | -                   | Specify the default theme (vcsDarkTheme / vscLightTheme)
     `theme`                    | `PrismTheme`        | `false`   | Depends on `darken` | Highlight prism theme.
     `CodeRenderer`             | `React.ElementType` | `true`    | -                   | Code renderer
     `errorClassName`           | `string`            | `false`   | -                   | CSS class name for CodeLiveError
     `editorTextareaClassName`  | `string`            | `false`   | -                   | CSS class name for the editor's textarea element
     `editorPreClassName`       | `string`            | `false`   | -                   | CSS class name for the editor's pre element

    CodeLiveProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`

  * Theme

     Prop Name                  | Default
    :--------------------------:|:----------------------------------------------------
     margin                     | `0 0 1rem`
     editorPadding              | `0.8rem 0`
     editorBackground           | `#1e1e1e`
     editorCaretColor           | `#aeafad`
     editorFontSize             | `1rem`
     editorFontFamily           | `Consolas, "Source Code Pro", monospace, sans-serif`
     editorSelectionBackground  | `none`
     previewPadding             | `0`
     previewBorder              | `none`
     previewBackground          | `#fff`
     previewColor               | `#000`

    See [YozoraCodeLiveTheme][] for details.


## References

  - [mdast code][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[YozoraCodeLiveTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/code-live/src/theme.ts
