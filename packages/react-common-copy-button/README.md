<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-common-copy-button#readme">@yozora/react-common-copy-button</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-common-copy-button">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-common-copy-button.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-common-copy-button">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-common-copy-button.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-common-copy-button">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-common-copy-button.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-common-copy-button"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-common-copy-button/peer/react"
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

Render a simple copy button.

## Install

- npm

  ```bash
  npm install --save @yozora/react-common-copy-button
  ```

- yarn

  ```bash
  yarn add @yozora/react-common-copy-button
  ```

## Usage

Import the compiled stylesheet once at your application entry:

```tsx
import '@yozora/react-common-copy-button/style.css'
```

It includes styles for dependency components. Tailwind is not required in the consuming
application. The stylesheet uses the `yz` utility prefix and excludes Preflight.


- Basic:

  ```tsx
  import React from 'react'
  import CopyButton from '@yozora/react-common-copy-button'

  const wrapper = (<CopyButton value="waw" style={ { color: 'orange' } } />)
  ```

### Props

|      Name       |               Type                | Required |  Default  | Description                                      |
| :-------------: | :-------------------------------: | :------: | :-------: | :----------------------------------------------- |
|   `className`   |             `string`              | `false`  |     -     | Root css class                                   |
| `statusNodeMap` | `Record<string, React.ReactNode>` | `false`  | See below | Map of copy status and displaying text.          |
|     `style`     |       `React.CSSProperties`       | `false`  |     -     | Root css style                                   |
|     `value`     |             `string`              |  `true`  |     -     | The literal texture content that waiting to copy |

- `className`: The root element of this component will always bind with the CSS class
  `'yozora-common-copy-button'`.

- `statusNodeMap`:

  ```typescript
  export const defaultStatusNodeMap: Record<CopyStatus, React.ReactNode> = {
    waiting: 'copy',
    copying: 'copying..',
    failed: 'failed!',
    succeed: 'copied!',
  }
  ```

## Related
