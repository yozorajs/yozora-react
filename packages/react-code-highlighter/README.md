<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/release-2.x.x/packages/react-code-highlighter#readme">@yozora/react-code-highlighter</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-code-highlighter">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-code-highlighter.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-highlighter">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-code-highlighter.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-code-highlighter">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-code-highlighter.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-code-highlighter"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-code-highlighter/peer/react"
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

This package is designed to highlight [mdast code][] type data


## Install

* npm

  ```bash
  npm install --save @yozora/react-code-highlighter
  ```

* yarn

  ```bash
  yarn add @yozora/react-code-highlighter
  ```

## Usage

* Basic:

  ```tsx
  import React from 'react'
  import CodeHighlighter from '@yozora/react-code-highlighter'

  function Wrapper() {
    const [code, setCode] = React.useState<string>('let a: number = 1 + 2;')
    const [lineCount, setLineCount] = React.useState<number>(0)
    const lineNoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`

    React.useEffect(() => {
      const nextCode = (
        'let a = 1, b = 2\n' +
        Array.from(new Array(100)).map((x, i) => '// ' + i).join('\n') +
        '\nlet c = 3\nconsole.log(\'c:\', c)'
      )
      setCode(nextCode)
    }, [])

    return (
      <pre data-line-count={ lineCount }>
        <CodeHighlighter
          lang="typescript"
          value={ code }
          linenoWidth={ lineNoWidth }
          onLineCountChange={ setLineCount }
        />
      </pre>
    )
  }

  const wrapper = (<Wrapper />)
  ```

* Props

    Name                 | Type                            | Required  | Default             | Description
  :--------------------:|:-------------------------------:|:---------:|:-------------------:|:-------------
    `value`              | `string`                        | `true`    | -                   | Code content
    `lang`               | `string`                        | `false`   | -                   | Code language
    `darken`             | `boolean`                       | `false`   | -                   | Specify the default theme (vcsDarkTheme / vscLightTheme)
    `theme`              | `PrismTheme`                    | `false`   | Depends on `darken` | Code highlight theme
    `linenoWidth`        | `React.CSSProperties['width']`  | `false`   | `0`                 | Code line number width
    `linenoColor`        | `React.CSSProperties['color']`  | `false`   | `#858585`           | Code line number color
    `onLineCountChange`  | `(lineCount: number) => void`   | `false`   | -                   | Callback of Code line count changing

### CSS variables

Name                                        | Default value
:------------------------------------------:|:----------------:
`--yozora-colors-background-codeHighlight`  | `hsla(30deg, 90%, 50%, 0.3)`
`--yozora-colors-border-codeLineno`         | `hsla(0deg, 0%, 80%, 0.8)`


## FAQ

* How do I add more language highlighting support?

  See https://github.com/FormidableLabs/prism-react-renderer#faq:

  ```javascript
  import Prism from "prism-react-renderer/prism";

  (typeof global !== "undefined" ? global : window).Prism = Prism;

  require("prismjs/components/prism-kotlin");
  require("prismjs/components/prism-csharp");
  ```

  The above method will cause errors in [vite][] + React project at this time
  (2021-07-27). The reason is that the `import` statement will be lifted to
  the top when using [vite][] to bundling, resulting in that the assignment
  statement of `window.Prism=Prism` has not been executed before loading 
  additional prismjs language components.

## Related

* [mdast code][]
* [prism-react-renderer][]


[mdast code]: https://github.com/syntax-tree/mdast#code
[prism-react-renderer]: https://github.com/FormidableLabs/prism-react-renderer
[vite]: https://github.com/vitejs/vite
