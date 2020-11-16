[![npm version](https://img.shields.io/npm/v/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-live.svg)](https://www.npmjs.com/package/@yozora/react-code-live)


This library is designed to highlight [mdast code][] type data


# Install

  ```shell
  yarn add @yozora/react-code-live
  ```

# Usage
  * Use in React project

    ```typescript
    import React from 'react'
    import CodeLive, { CodeLiveProps } from '@yozora/react-code-live'

    const JsxRenderer: CodeLiveProps['CodeRenderer'] = ({ code }): React.ReactElement => {
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

  * Props

     Name                       | Type                | Required  | Default | Description
    :--------------------------:|:-------------------:|:---------:|:-------:|:-------------
     `lang`                     | `string`            | `true`    | -       | Code language
     `value`                    | `string`            | `true`    | -       | Code content
     `CodeRenderer`             | `React.ElementType` | `true`    | -       | Code renderer
     `errorClassName`           | `string`            | `false`   | -       | CSS class name for CodeLiveError
     `editorTextareaClassName`  | `string`            | `false`   | -       | CSS class name for the editor's textarea element
     `editorPreClassName`       | `string`            | `false`   | -       | CSS class name for the editor's pre element

    CodeLiveProps inherited all attributes of `HTMLDivElement` (`React.HTMLAttributes<HTMLDivElement>`

  * Theme

     Prop Name            | Default
    :--------------------:|:----------------------------------------------------
     margin               | `0 0 1rem`
     editorPadding        | `0.8rem 0`
     editorBackground     | `#1e1e1e`
     editorCaretColor     | `#aeafad`
     editorFontSize       | `1rem`
     editorFontFamily     | `Consolas, "Source Code Pro", monospace, sans-serif`
     previewPadding       | `0.5rem`
     previewBorder        | `none`
     previewBackground    | `#fff`
     previewColor         | `#000`
     errorBackground      | `#ff5555`
     errorColor           | `#f8f8f2`
     errorFontSize        | `0.9em`
     errorFontFamily      | `Consolas, "Source Code Pro", monospace, sans-serif`

    See [YozoraCodeLiveTheme][] for details.


# References

  - [mdast code][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[YozoraCodeLiveTheme]: https://github.com/guanghechen/yozora-react/blob/master/packages/code-live/src/theme.ts
