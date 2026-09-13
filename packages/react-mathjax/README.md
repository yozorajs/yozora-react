<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-mathjax#readme">@yozora/react-mathjax</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-mathjax">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-mathjax.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-mathjax">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-mathjax.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-mathjax">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-mathjax.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-mathjax"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-mathjax/peer/react"
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

Rendering formula with [mathjax][] in react. Inspired by [react-mathjax][] and [react-mathjax2][].

The default version is MathJax 4.1.3, loaded from jsDelivr.

## Install

- npm

  ```bash
  npm install --save @yozora/react-mathjax
  ```

- yarn

  ```bash
  yarn add @yozora/react-mathjax
  ```

## Usage

- Basic:

  ```tsx
  import React from 'react'
  import { MathJaxProvider, MathJaxNode } from '@yozora/react-mathjax'

  const code = `
    \\begin{align}
      f(x) = \\left\\lbrace
        \\begin{aligned}
          &x^2, &x < 0 \\\\
          &\\frac{1}{x^3}, &x > 0
        \\end{aligned}
      \\right.
    \\end{align}
  `

  const wrapper = (
    <MathJaxProvider>
      <MathJaxNode inline={false} formula={code} />
    </MathJaxProvider>
  )
  ```

### Props

- `IMathJaxProviderProps`

  ```typescript
  export interface IMathJaxProviderProps {
    /**
    * Sub components.
    */
    children?: React.ReactNode
    /**
    * Contents / Animation displayed at waiting MathJax loading.
    * @default null
    */
    loading?: React.ReactNode
    /**
    * http / https url for loading mathjax.
    * @default 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'
    */
    mathjaxSrc?: string
    /**
    * MathJax config.
    */
    mathjaxConfig?: IMathJaxConfig
    /**
    * Triggered when MathJax has loaded.
    * @param mathJax
    */
    onLoad?(mathJax: IMathJax): void
    /**
    * Triggered when MathJax loading fails.
    * @param error
    */
    onError?(error: unknown): void
  }
  ```

- `IMathJaxNodeProps`

  ```typescript
  export interface IMathJaxNodeProps {
    /**
    * The literal formula string.
    */
    formula: string
    /**
    * Whether to render the formulas in inline mode.
    * @default false
    */
    inline?: boolean
    /**
    * CSS class name.
    */
    className?: string
    /**
    * CSS style properties
    */
    style?: React.CSSProperties
  }
  ```

### Migration from the v3 contract

- `IMathJaxContext.MathJax3` is now `IMathJaxContext.MathJax`.
- `MathJaxNodeWithoutContext` accepts a `MathJax` prop instead of `MathJax3`.
- `onError` receives only the loading error because a MathJax instance may not exist yet.
- `IMathJax3`, `IMathJaxConfig3`, and `loadMathJax3` remain as deprecated aliases.

## Related

- [react-mathjax][]
- [mathjax][]

[react-mathjax]: https://github.com/SamyPesse/react-mathjax
[react-mathjax2]: https://github.com/wko27/react-mathjax
[mathjax]: https://www.mathjax.org/
