[![npm version](https://img.shields.io/npm/v/@yozora/react-code-highlighter.svg)](https://www.npmjs.com/package/@yozora/react-code-highlighter)
[![npm download](https://img.shields.io/npm/dm/@yozora/react-code-highlighter.svg)](https://www.npmjs.com/package/@yozora/react-code-highlighter)
[![npm license](https://img.shields.io/npm/l/@yozora/react-code-highlighter.svg)](https://www.npmjs.com/package/@yozora/react-code-highlighter)


This library is designed to highlight [mdast code][] type data


# Install

  ```shell
  yarn add @yozora/react-code-highlighter
  ```

# Usage
  * Use in React project

    ```typescript
    // index.tsx
    import React from 'react'
    import ReactDOM from 'react-dom'
    import CodeHighlighter from '@yozora/react-code-highlighter'

    function Wrapper() {
      const [code, setCode] = useState<string>('let a: number = 1 + 2;')
      const [lineCount, setLineCount] = useState<number>(0)
      const lineNoWidth = `${ Math.max(2, ('' + lineCount).length) + 0.5 }em`

      useEffect(() => {
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

    ReactDOM.render(
      <Wrapper />
      , document.getElementById('root')
    )
    ```

  * Props

     Name                 | Type                                | Required  | Default | Description
    :--------------------:|:-----------------------------------:|:---------:|:-------:|:-------------
     `value`              | `string`                            | `true`    | -       | Code content
     `lang`               | `string`                            | `false`   | -       | Code language
     `theme`              | `PrismTheme`                        | `false`   | vsDark  | Code highlight theme
     `lineNoWidth`        | `number|string`                     | `false`   | -       | Code line number width
     `onLineCountChange`  | `(lineCount: number) => void`       | `false`   | -       | Callback of Code line count changing

  * CSS variables

     Name                     | Default  |  Description
    :------------------------:|:--------:|:-----------------------
     `--md-code-lineno-color` | `#858585 | Code line no color

[mdast code]: https://github.com/syntax-tree/mdast#code
