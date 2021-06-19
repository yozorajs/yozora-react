<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/code-renderer-graphviz#readme">@yozora/react-code-renderer-graphviz</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code-renderer-graphviz">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code-renderer-graphviz.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-renderer-graphviz">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code-renderer-graphviz.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-renderer-graphviz">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code-renderer-graphviz.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-code-renderer-graphviz"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-renderer-graphviz/peer/react"
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

This package is designed to render graphviz (dot) in react, inspired by [graphviz-react][]. 


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-renderer-graphviz
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-renderer-graphviz
  ```

## Usage

* Basic:

  ```tsx
  import React from 'react'
  import GraphvizRenderer from '@yozora/react-code-renderer-graphviz'

  const code = `
    digraph finite_state_machine {
      rankdir=LR;
      size="8,5"
      node [shape = doublecircle]; 0 3 4 8;
      node [shape = circle];
      0 -> 2 [label = "SS(B)"];
      0 -> 1 [label = "SS(S)"];
      1 -> 3 [label = "S($end)"];
      2 -> 6 [label = "SS(b)"];
      2 -> 5 [label = "SS(a)"];
      2 -> 4 [label = "S(A)"];
      5 -> 7 [label = "S(b)"];
      5 -> 5 [label = "S(a)"];
      6 -> 6 [label = "S(b)"];
      6 -> 5 [label = "S(a)"];
      7 -> 8 [label = "S(b)"];
      7 -> 5 [label = "S(a)"];
      8 -> 6 [label = "S(b)"];
      8 -> 5 [label = "S(a)"];
    }
  `
  <GraphvizRender code={code} />
  ```

* Custom error handler:

  ```tsx
  import React from 'react'
  import GraphvizRenderer from '@yozora/react-code-renderer-graphviz'

  function JsxPreview(props: { code: string, inline: boolean }) {
    const [error, setError] = React.useState<any>(null)
    return (
      <div>
        <GraphvizRenderer 
          code={ props.code }
          onError={ setError }
        />
        <pre>{ error }</pre>
      </div >
    )
  }
  ```

### Props

Name      | Type                              | Required  | Default     | Description
:--------:|:---------------------------------:|:---------:|:-----------:|:-------------
`className` | `string`              | `false`   | -       | Root css class
`code`    | `string`                          | `true`    | -           | Source code
`onError` | `(error: string | null) => void`  | `true`    | -           | Error callback

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-code-renderer-graphviz'`.


## Related

* [graphviz-react][]


[graphviz-react]: https://github.com/DomParfitt/graphviz-react
