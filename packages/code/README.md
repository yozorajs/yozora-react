<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme">@yozora/react-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-code"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code/peer/styled-components"
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

This component is for rendering the [Code][@yozora/ast] data produced by
[@yozora/tokenizer-indented-code][] and [@yozora/tokenizer-fenced-code].\
This component has been built into [@yozora/react-markdown][], you can use it directly.


## Install

* npm

  ```bash
  npm install --save @yozora/react-code
  ```

* yarn

  ```bash
  yarn add @yozora/react-code
  ```

## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import Code from '@yozora/react-code'

  const wrapper = (
    <Code
      lang="typescript"
      value="let a: number = 1 + 2;"
    />
  )
  ```

### Props

Name                | Type                  | Required  | Default   | Description
:------------------:|:---------------------:|:---------:|:---------:|:-------------
`className`         | `string`              | `false`   | -         | Root css class
`lang`              | `string`              | `false`   | -         | Language of the source codes
`meta`              | `string`              | `false`   | -         | Meta data of the code block
`runners`           | `CodeRunnerItem[]`    | `false`   | See below | Code runners.
`style`             | `React.CSSProperties` | `false`   | -         | Root css style
`value`             | `string`              | `true`    | -         | Literal source codes

- `runners`:

  ```typescript
  import JsxRenderer from '@yozora/react-code-renderer-jsx'

  const defaultRunners: CodeRunnerItem[] = [
    {
      title: 'jsx',
      pattern: /^jsx$/,
      runner: function JsxRunner(props: CodeRunnerProps): React.ReactElement {
        const { value, scope, onError } = props
        return (
          <JsxRenderer
            code={value}
            inline={true}
            scope={scope}
            onError={onError}
          />
        )
      },
    },
  ]
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-code-embed][]
* [@yozora/react-code-highlighter][]
* [@yozora/react-code-literal][]
* [@yozora/react-code-live][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-indented-code][]
* [@yozora/tokenizer-fenced-code][]
* [Code | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#code
[@yozora/react-code-embed]: https://www.npmjs.com/package/@yozora/react-code-embed
[@yozora/react-code-highlighter]: https://www.npmjs.com/package/@yozora/react-code-highlighter
[@yozora/react-code-literal]: https://www.npmjs.com/package/@yozora/react-code-literal
[@yozora/react-code-live]: https://www.npmjs.com/package/@yozora/react-code-live
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-indented-code]: https://www.npmjs.com/package/@yozora/tokenizer-indented-code
[@yozora/tokenizer-fenced-code]: https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
[mdast]: https://github.com/syntax-tree/mdast#code
