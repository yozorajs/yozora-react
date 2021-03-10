[![npm version](https://img.shields.io/npm/v/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)
[![module formats: cjs, esm](https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg)](#install)
[![Node Version](https://img.shields.io/node/v/@yozora/react-code-renderer-jsx)](https://github.com/nodejs/node)
[![React version](https://img.shields.io/npm/dependency-version/@yozora/react-code-renderer-jsx/peer/react)](https://github.com/facebook/react)
[![styled-components version](https://img.shields.io/npm/dependency-version/@yozora/react-code-renderer-jsx/peer/styled-components)](https://github.com/styled-components/styled-components)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-9c465e.svg)](https://github.com/facebook/jest)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# `@yozora/react-code-renderer-jsx`

This package is designed to live render jsx, like which [react live][] did. (In fact,
this component is implemented with reference to [react-live][])


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-renderer-jsx
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-renderer-jsx
  ```

## Usage
  * Use in React project

    ```tsx
    import React from 'react'
    import styled from 'styled-components'
    import CodeRendererJsx from '../src'

    function JsxPreview(props: { code: string, inline: boolean }) {
      const [error, setError] = React.useState<any>(null)
      return (
        <div>
          <CodeRendererJsx
            code={ props.code }
            inline={ props.inline }
            scope={ { styled } }
            onError={ setError }
          />
          <pre>{ error }</pre>
        </div >
      )
    }
    ```

    - Inline code: Render `React.ReactNode` directly

      ```tsx
      const code = `
        (
          <div>
            <span>Hello, world</span>
          </div>
        )
      `

      const wrapper = (
        <JsxPreview code={ code } inline={ true } >
      )
      ```

    - Block code: Call the `render()` function with `React.ReactNode` explicitly

      ```tsx
      const code = `
        const Container = styled.div\`
          background: hsl(0deg, 10%, 90%);
        \`

        render(
          <Container>
            <span style={{ color: 'orange' }}>Hello, world</span>
          </Container>
        )
      `

      const wrapper = (
        <JsxPreview code={ code } inline={ false } />
      )
      ```

  * Props

     Name       | Type                              | Required  | Default     | Description
    :----------:|:---------------------------------:|:---------:|:-----------:|:-------------
     `code`     | `string`                          | `true`    | -           | Source code
     `inline`   | `boolean`                         | `true`    | -           | `inline` / `block` mode
     `scope`    | `Record<string, unknown>`         | `false`   | `{styled}`  | Additional accessible variables
     `onError`  | `(error: string | null) => void`  | `true`    | -           | Error callback


## References

  - [mdast code][]
  - [react live][]

[mdast code]: https://github.com/syntax-tree/mdast#code
[react live]: https://github.com/FormidableLabs/react-live
