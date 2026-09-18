<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/renderers/react-embed-jsx#readme">@yozora/react-embed-jsx</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-embed-jsx">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-embed-jsx.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-embed-jsx">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-embed-jsx.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-embed-jsx">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-embed-jsx.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-embed-jsx"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-embed-jsx/peer/react"
      />
    </a>
    <a href="https://github.com/vitest-dev/vitest">
      <img
        alt="Tested with Vitest"
        src="https://img.shields.io/badge/tested_with-vitest-6E9F18.svg"
      />
    </a>
    <a href="https://biomejs.dev/">
      <img
        alt="Code Style: Biome"
        src="https://img.shields.io/badge/code_style-Biome-60a5fa.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

This package is designed to live render jsx, inspired by [react live][].

## Migration

This package replaces `@yozora/react-code-renderer-jsx`. Update the import
specifier to `@yozora/react-embed-jsx`; existing component names, props, and
default/named exports are unchanged.

## Install

- npm

  ```bash
  npm install --save @yozora/react-embed-jsx
  ```

- yarn

  ```bash
  yarn add @yozora/react-embed-jsx
  ```

## Usage

- Basic:

  ```tsx
  import CodeRendererJsx from '@yozora/react-embed-jsx'
  import React from 'react'

  const scope = { accent: 'orange' }

  function JsxPreview(props: { code: string, inline: boolean }) {
    const [error, setError] = React.useState<any>(null)
    return (
      <div>
        <CodeRendererJsx
          code={props.code}
          inline={props.inline}
          scope={scope}
          onError={setError}
        />
        <pre>{error}</pre>
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

  const wrapper = <JsxPreview code={ code } inline={ true } >
  ```

- Block code: Call the `render()` function with `React.ReactNode` explicitly

  ```tsx

  const code = `
    render(
      <div style={{ background: 'hsl(0deg, 10%, 90%)' }}>
        <span style={{ color: accent }}>Hello, world</span>
      </div>
    )
  `

  const scope = { accent: 'orange' }

  const wrapper = (
    <JsxPreview scope={scope} code={ code } inline={ false } />
  )
  ```

### Props

|   Name    |               Type                | Required | Default | Description                     |
| :-------: | :-------------------------------: | :------: | :-----: | :------------------------------ |
|  `code`   |             `string`              |  `true`  |    -    | Source code                     |
| `inline`  |             `boolean`             |  `true`  |    -    | `inline` / `block` mode         |
|  `scope`  |     `Record<string, unknown>`     | `false`  |  `{}`   | Additional accessible variables |
| `onError` | `(error: string \| null) => void` |  `true`  |    -    | Error callback                  |

## Related

- [mdast code][]
- [react live][]

[mdast code]: https://github.com/syntax-tree/mdast#code
[react live]: https://github.com/FormidableLabs/react-live
