<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/main/packages/mathjax#readme">@yozora/react-mathjax</a>
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

Rendering formula with [mathjax][] in react. Inspired by [react-mathjax][]
and [react-mathjax2][]. 

The default version is [mathjax@2.7.4](https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_SVG).

## Install

* npm

  ```bash
  npm install --save @yozora/react-mathjax
  ```

* yarn

  ```bash
  yarn add @yozora/react-mathjax
  ```

## Usage

* Basic:

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

* `MathJaxProviderProps`

  ```typescript
  interface MathJaxProviderProps {
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
    * @default 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
    */
    mathjaxSrc?: string
    /**
    * Mathjax config
    */
    mathjaxConfig?: MathJaxConfig
    /**
    * Mathjax options.
    */
    mathjaxOptions?: {
      /**
      * Delay between updates.
      * @default 0
      */
      processSectionDelay?: number
      /**
      * Type of the formula string.
      * @default 'tex'
      */
      language?: 'tex' | 'asciimath'
    }
    /**
    * Triggered on mathjax loaded.
    * @param MathJax
    */
    onLoad?(MathJax: MathJax): void
    /**
    * Triggered on mathjax thrown an error.
    *
    * @param MathJax
    * @param error
    */
    onError?(MathJax: MathJax, error: any): void
  }
  ```

* `MathJaxNodeProps` 

  ```typescript
  interface MathJaxNodeProps {
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
    /**
     * On mathjax rendering.
     */
    onRender?(): void
  }
  ```

## Related

* [@yozora/react-inline-math][]
* [@yozora/react-math][]
* [react-mathjax][]
* [mathjax][]

[@yozora/react-inline-math]: https://www.npmjs.com/package/@yozora/react-inline-math
[@yozora/react-math]: https://www.npmjs.com/package/@yozora/react-math
[react-mathjax]: https://github.com/SamyPesse/react-mathjax
[react-mathjax2]: https://github.com/wko27/react-mathjax
[mathjax]: https://www.mathjaxjax.org/
