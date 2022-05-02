<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/react-code-runners#readme">@yozora/react-code-runners</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code-runners">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code-runners.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-runners">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code-runners.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-runners">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code-runners.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-code-runners"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-runners/peer/react"
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

This package is designed to provide code runners for [@yozora/react-code-embed][]
or [@yozora/react-code-live][].


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-runners
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-runners
  ```

## Usage

* Create a GraphvizRunner.

  ```tsx title="./runner-graphviz.tsx"
  import loadable from '@loadable/component'
  import type { CodeRunner } from '@yozora/react-code-runners'
  import { createGraphvizRunner } from '@yozora/react-code-runners'

  const GraphvizRenderer = loadable(
    () => import('@yozora/react-code-renderer-graphviz'),
  )

  export const GraphvizRunner: CodeRunner = createGraphvizRunner(GraphvizRenderer)
  ```

* Create a JsxRunner.

  ```tsx title="./runner-jsx.tsx"
  import styled from '@emotion/styled'
  import loadable from '@loadable/component'
  import type { EcmaImport } from '@yozora/ast'
  import type { ICodeRendererJsxProps } from '@yozora/react-code-renderer-jsx'
  import type { ICodeRunner } from '@yozora/react-code-runners'
  import { createUseJsxRunner } from '@yozora/react-code-runners'
  import { useCallback, useEffect, useMemo, useState } from 'react'

  const JsxRenderer = loadable<ICodeRendererJsxProps>(
    () => import('@yozora/react-code-renderer-jsx') as any,
  )

  export const useJsxRunner: (ecmaImports: EcmaImport[]) => ICodeRunner =
    createUseJsxRunner(
      {
        styled,
        useCallback,
        useEffect,
        useMemo,
        useState,
      },
      [],
      JsxRenderer,
      'block',
    )

  function Demo() {
    const JsxRunner = useJsxRunner([])
    // ....
  }
  ```

* Create a MathRunner.

  ```tsx title="./runner-math.tsx"
  import type { ICodeRunner } from '@yozora/react-code-runners'
  import { createMathRunner } from '@yozora/react-code-runners'
  import { MathJaxNode } from '@yozora/react-mathjax'

  export const MathRunner: ICodeRunner = createMathRunner(
    props => <MathJaxNode className="yozora-math" inline={false} formula={props.value} />
  )
  ```

* Create runner items.

  ```tsx title="./runner.tsx"
  import type { EcmaImport } from '@yozora/ast'
  import type { ICodeRunnerItem } from '@yozora/react-code-runners'
  import React  from 'react'
  import GraphvizRunner from './runner-graphviz'
  import { useJsxRunner } from './runner-jsx'
  import MathRunner from './runner-math'

  export function useCodeRunners(ecmaImports: EcmaImport[]): ICodeRunnerItem[] {
    const JsxRunner = useJsxRunner(ecmaImports)
    return React.useMemo(
      () => [
        {
          title: 'jsx',
          pattern: /^jsx$/,
          runner: JsxRunner,
        },
        {
          title: 'graphviz',
          pattern: /^graphviz|dot$/,
          runner: GraphvizRunner,
        },
        {
          title: 'math',
          pattern: /^tex|latex|math|mathjax$/,
          runner: MathRunner,
        },
      ],
      [JsxRunner],
    )
  }
  ```


### Overview

Name                    | Description
:----------------------:|:-------------------------------------------:
`createUseJsxRunner`    | Create a jsx live code runner creator.
`createGraphvizRunner`  | Create a graphviz live code runner.
`createMathRunner`      | Create a formula live code runner.



## Related

* [@yozora/react-code-renderer-graphviz][]
* [@yozora/react-code-renderer-jsx][] 


[@yozora/react-code-embed]: ../code-live/README.md
[@yozora/react-code-live]: ../code-live/README.md
[@yozora/react-code-renderer-graphviz]: ../code-renderer-graphviz/README.md
[@yozora/react-code-renderer-jsx]: ../code-renderer-jsx/README.md