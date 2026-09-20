<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/renderers/react-embed-math#readme">@yozora/react-embed-math</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-embed-math">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-embed-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-embed-math">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-embed-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-embed-math">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-embed-math.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-embed-math"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-embed-math/peer/react"
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

## Migration

`@yozora/react-mathjax` has been renamed to `@yozora/react-embed-math`.
Update the dependency name and imports. Named exports, component props, and
MathJax loading behavior are unchanged by this rename.

## Install

- npm

  ```bash
  npm install --save @yozora/react-embed-math
  ```

- yarn

  ```bash
  yarn add @yozora/react-embed-math
  ```

## Usage

- Basic:

  ```tsx
  import React from 'react'
  import { MathJaxProvider, MathJaxNode } from '@yozora/react-embed-math'

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

### Loading and ownership

All providers on a page share one MathJax initialization. They must use the same resolved
`mathjaxSrc` URL and structurally equal `mathjaxConfig` values; configuration callbacks must
retain the same references. The configuration is fixed once loading starts. Conflicting
requests reject and are reported through the requesting provider's `onError`, leaving other
providers and their shared engine intact.

Failed loads release their cache and owned script/global so a subsequent call can retry with
the same or a corrected URL/configuration. For a provider, change its URL/configuration or
remount it to retry; retries are not automatic. Unmounting a provider cancels its subscription
without resetting the shared engine. SSR returns no engine and does not populate the browser cache.

Configure MathJax through `mathjaxConfig` instead of preassigning `window.MathJax`. If another
integration already owns the global, this loader reports an error without replacing it.
Use `MathJaxContextType.Provider` with `{ MathJax: instance, language: TexLang.TEX }` to supply
an externally initialized instance directly.

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
    * URL for the page's shared MathJax instance. Must match other providers on the page.
    * @default 'https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js'
    */
    mathjaxSrc?: string
    /**
    * Initialization config for the shared instance; fixed after loading starts.
    * Conflicts are reported through onError. Failed loads can be retried.
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
