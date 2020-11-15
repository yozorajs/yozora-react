[![npm version](https://img.shields.io/npm/v/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-renderer-jsx.svg)](https://www.npmjs.com/package/@yozora/react-code-renderer-jsx)


This library is designed to live render jsx, like which [react live][] did. (In fact,
this component is implemented with reference to [react-live][])


# Install

  ```shell
  yarn add @yozora/react-code-renderer-jsx
  ```

# Usage
  * Use in React project

    ```typescript
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

      ```typescript
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

      ```typescript
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


# References

  - [mdast code][]
  - [react live][]

[mdast code]: https://github.com/syntax-tree/mdast#code
[react live]: https://github.com/FormidableLabs/react-live
