<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-admonition#readme">@yozora/react-admonition</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-admonition">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-admonition">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-admonition">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-admonition.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-admonition"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-admonition/peer/react"
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

This component is for rendering the [Admonition][@yozora/ast] data produced by
[@yozora/tokenizer-admonition][].\
This component has been built into [@yozora/react-markdown][], you can use it directly.

![yozora-admonition.png][]

## Install

- npm

  ```bash
  npm install --save @yozora/react-admonition
  ```

- yarn

  ```bash
  yarn add @yozora/react-admonition
  ```

## Usage

- Basic:

  ```tsx
  import React from 'react'
  import Admonition from '@yozora/react-admonition'

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
- [@yozora/react-markdown][]
- [@yozora/tokenizer-admonition][]
- [remark-admonitions][]

[yozora-admonition.png]:
  https://github.com/yozorajs/yozora-react/raw/main/packages/react-admonition/doc/yozora-admonition.png
[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#admonition
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-admonition]: https://www.npmjs.com/package/@yozora/tokenizer-admonition
[remark-admonitions]: https://github.com/elviswolcott/remark-admonitions
