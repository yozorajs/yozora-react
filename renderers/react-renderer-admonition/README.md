<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/renderers/react-renderer-admonition#readme">@yozora/react-renderer-admonition</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-admonition">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-renderer-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-admonition">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-renderer-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-admonition">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-renderer-admonition.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-renderer-admonition"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-renderer-admonition/peer/react"
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

This component is for rendering the [Admonition][@yozora/ast] data produced by
[@yozora/tokenizer-admonition][].\
This component has been built into [@yozora/react-yozora][], you can use it directly.

![yozora-admonition.png][]

## Migration

`@yozora/react-admonition` has been renamed to `@yozora/react-renderer-admonition`.
Update the dependency name and imports, including
`@yozora/react-renderer-admonition/style.css`. Component props, named exports,
icons, and CSS class names are unchanged by this rename.

## Install

- npm

  ```bash
  npm install --save @yozora/react-renderer-admonition
  ```

- yarn

  ```bash
  yarn add @yozora/react-renderer-admonition
  ```

## Usage

Import the compiled stylesheet once at your application entry:

```tsx
import '@yozora/react-renderer-admonition/style.css'
```

It includes styles for dependency components. Tailwind is not required in the consuming
application. The stylesheet uses the `yz` utility prefix and excludes Preflight.


- Basic:

  ```tsx
  import React from 'react'
  import Admonition from '@yozora/react-renderer-admonition'

  const wrapper = (
    <Admonition
      keyword="info"
      style={{ color: 'orange', fontSize: '16px' }}
      title={<span>a<strong>b</strong></span>}
    >
      some text1
      <span>some text2</span>
    </Admonition>
  )
  ```

### Props

|    Name     |         Type          | Required | Default | Description           |
| :---------: | :-------------------: | :------: | :-----: | :-------------------- |
| `children`  |   `React.ReactNode`   | `false`  |    -    | Admonition contents   |
| `className` |       `string`        | `false`  |    -    | Root css class        |
|  `keyword`  |       `string`        | `false`  |    -    | Admonition keyword    |
|   `title`   |       `string`        | `false`  |    -    | Admonition title      |
|   `style`   | `React.CSSProperties` | `false`  |    -    | Root css style        |
|   `icon`    |   `React.ReactNode`   | `false`  |    -    | Admonition title icon |

- `className`: The root element of this component will always bind with the CSS class
  `'yozora-admonition'`

- `keyword`

  | Raw Keyword | Resolved Keyword |
  | :---------: | :--------------: |
  |     ` `     |      `note`      |
  |  `default`  |      `note`      |
  |   `note`    |      `note`      |
  |  `import`   |      `info`      |
  |   `info`    |      `info`      |
  |  `success`  |      `tip`       |
  |    `tip`    |      `tip`       |
  |  `warning`  |    `caution`     |
  |  `caution`  |    `caution`     |
  |   `error`   |     `error`      |
  |  `danger`   |     `danger`     |

### CSS variables

|                 Name                 | Default value |
| :----------------------------------: | :-----------: |
|  `--yozora-admonition-border-width`  |     `5px`     |
|  `--yozora-colors-background-error`  |   `#ffebec`   |
|  `--yozora-colors-background-info`   |   `#eef9fd`   |
|  `--yozora-colors-background-note`   |   `#fdfdfe`   |
| `--yozora-colors-background-success` |   `#e6f6e6`   |
| `--yozora-colors-background-warning` |   `#fff8e6`   |
|    `--yozora-colors-border-error`    |   `#e13238`   |
|    `--yozora-colors-border-info`     |   `#4cb3d4`   |
|    `--yozora-colors-border-note`     |   `#d4d5d8`   |
|   `--yozora-colors-border-success`   |   `#009400`   |
|   `--yozora-colors-border-warning`   |   `#e6a700`   |

## Related

- [@yozora/ast][]
- [@yozora/react-yozora][]
- [@yozora/tokenizer-admonition][]
- [remark-admonitions][]

[yozora-admonition.png]:
  https://github.com/yozorajs/yozora-react/raw/main/renderers/react-renderer-admonition/doc/yozora-admonition.png
[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#admonition
[@yozora/react-yozora]: https://www.npmjs.com/package/@yozora/react-yozora
[@yozora/tokenizer-admonition]: https://www.npmjs.com/package/@yozora/tokenizer-admonition
[remark-admonitions]: https://github.com/elviswolcott/remark-admonitions
