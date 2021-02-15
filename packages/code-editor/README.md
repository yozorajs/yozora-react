[![npm version](https://img.shields.io/npm/v/@yozora/react-code-editor.svg)](https://www.npmjs.com/package/@yozora/react-code-editor)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-editor.svg)](https://www.npmjs.com/package/@yozora/react-code-editor)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-editor.svg)](https://www.npmjs.com/package/@yozora/react-code-editor)


Simple no-frills code editor with syntax highlighting, forked from [react-simple-code-editor][]
as it's seems not been updated for several months.


# Install

  ```shell
  yarn add @yozora/react-code-editor
  ```

# Usage
  * Use in React project

    ```tsx
    import React, { useState } from 'react'
    import CodeEditor from '@yozora/react-code-editor'

    function Wrapper() {
      const [code, setCode] = useState<string>('let a: number = 1 + 2;')

      return (
        <CodeEditor
          lang="typescript"
          code={ code }
          onChange={ setCode }
        />
      )
    }

    const wrapper = (<Wrapper />)
    ```

  * Props

     Name                 | Type                        | Required  | Default             | Description
    :--------------------:|:---------------------------:|:---------:|:-------------------:|:-------------
     `lang`               | `string`                    | `true`    | -                   | Code language
     `code`               | `string`                    | `true`    | -                   | Code content
     `onChange`           | `(content: string) => void` | `true`    | -                   | Triggered when code changed.
     `darken`             | `boolean`                   | `false`   | `true`              | Specify the default theme (vcsDarkTheme / vscLightTheme)
     `theme`              | `PrismTheme`                | `false`   | Depends on `darken` | Highlight prism theme.
     `textareaClassName`  | `string`                    | `false`   | -                   | CSS class name for the underlying textarea
     `textareaStyle`      | `React.CSSProperties`       | `false`   | -                   | CSS style object for the underlying textarea
     `preClassName`       | `string`                    | `false`   | -                   | CSS class name for the underlying pre
     `preStyle`           | `React.CSSProperties`       | `false`   | -                   | CSS style object for the underlying textarea
     `className`          | `string`                    | `false`   | -                   | CSS class name for the container
     `style`              | `React.CSSProperties`       | `false`   | -                   | CSS style object for the container


# References

  - [react-simple-code-editor][]


[react-simple-code-editor]: https://github.com/satya164/react-simple-code-editor
