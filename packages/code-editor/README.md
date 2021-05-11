<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code-editor#readme">@yozora/react-code-editor</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code-editor">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code-editor.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-editor">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code-editor.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-editor">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code-editor.svg"
      />
    </a>
    <a href="#install">
      <img
        alt="Module formats: cjs, esm"
        src="https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/react-code-editor"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-editor/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-editor/peer/styled-components"
      />
    </a>
    <a href="https://github.com/facebook/jest">
      <img
        alt="Tested with Jest"
        src="https://img.shields.io/badge/tested_with-jest-9c465e.svg"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

Simple no-frills code editor with syntax highlighting, forked from [react-simple-code-editor][]
as it's seems not been updated for several months.


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-editor
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-editor
  ```

## Usage
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

### Props

Name                | Type                            | Required  | Default   | Description
:------------------:|:-------------------------------:|:---------:|:---------:|:-------------
`autoFocus`         | `boolean`                       | `false`   | -         | Set the editor focus in default
`className`         | `string`                        | `false`   | -         | CSS class name for the container
`code`              | `string`                        | `true`    | -         | Code content
`darken`            | `boolean`                       | `false`   | `true`    | Dark mode (vcsDarkTheme / vscLightTheme)
`lang`              | `string`                        | `true`    | -         | Code language
`lineHeight`        | `React.CSSProperties['height']` | `false`   | `'1.8em'` | line height
`onChange`          | `(content: string) => void`     | `true`    | -         | Triggered when code changed.
`preClassName`      | `string`                        | `false`   | -         | CSS class name for the underlying pre
`preStyle`          | `React.CSSProperties`           | `false`   | -         | CSS style object for the underlying textarea
`showLinenos`       | `boolean`                       | `false`   | `true`    | Display line numbers
`style`             | `React.CSSProperties`           | `false`   | -         | CSS style object for the container
`textareaClassName` | `string`                        | `false`   | -         | CSS class name for the underlying textarea
`textareaStyle`     | `React.CSSProperties`           | `false`   | -         | CSS style object for the underlying textarea
`theme`             | `PrismTheme`                    | `false`   | See below | Highlight prism theme.

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-code-editor'`

* `theme`: Default theme depends on the value of `darken`.


## Related

* [@yozora/react-code-highlighter][]
* [react-simple-code-editor][]


[@yozora/react-code-highlighter]: https://www.npmjs.com/package/@yozora/react-code-highlighter
[react-simple-code-editor]: https://github.com/satya164/react-simple-code-editor
