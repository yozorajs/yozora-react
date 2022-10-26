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

@yozora/react-mathjax is powered by better-react-mathjax, see the options on https://github.com/fast-reflexes/better-react-mathjax/blob/6a565eba4c2424c6c1c191a5b55d8a1681d88a02/README.md.

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

* `IMathJaxProviderProps`

  ```typescript
  export type IMathJaxProviderProps = IMathjaxProviderStaticProps &
    (IMathjax2Options | IMathjax3Options)

  interface IMathjaxProviderStaticProps {
    /**
    * Sub components.
    */
    children?: React.ReactNode
    /**
    * http / https url for loading mathjax.
    * @example 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
    */
    src?: string
    /**
    * Controls whether the content of the MathJax component should be hidden until after typesetting is finished.
    * @default 'first'
    * @see https://github.com/fast-reflexes/better-react-mathjax#hideuntiltypeset-first--every--undefined
    */
    hideUntilTypeset?: 'first' | 'every'
    /**
    * Controls how typesetting by MathJax is done in the DOM.
    * @default 'post'
    * @see https://github.com/fast-reflexes/better-react-mathjax#rendermode-pre--post--undefined
    */
    renderMode?: 'pre' | 'post'
    /**
    * Triggered on mathjax loaded.
    */
    onLoad?(): void
    /**
    * Triggered on mathjax thrown an error.
    */
    onError?(error: unknown): void
  }

  interface IMathjax2Options {
    version: 2
    config?: MathJax2Config
    onStartup?(mathJax: MathJax2Object): void
  }

  interface IMathjax3Options {
    version?: 3
    config?: MathJax3Config
    onStartup?(mathJax: MathJax3Object): void
  }
  ```

* `IMathJaxNodeProps` 

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
    * @default false
    * @see https://github.com/fast-reflexes/better-react-mathjax#dynamic-boolean--undefined
    */
    dynamic?: boolean
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

* [react-mathjax][]
* [mathjax][]
* [better-react-mathjax][]

[react-mathjax]: https://github.com/SamyPesse/react-mathjax
[react-mathjax2]: https://github.com/wko27/react-mathjax
[mathjax]: https://www.mathjaxjax.org/
[better-react-mathjax]: https://github.com/fast-reflexes/better-react-mathjax
