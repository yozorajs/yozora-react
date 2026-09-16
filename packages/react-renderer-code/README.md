<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-react/tree/main/packages/react-renderer-code#readme">@yozora/react-renderer-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-renderer-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-renderer-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-renderer-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-renderer-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/react-renderer-code"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-renderer-code/peer/react"
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

This component is for rendering the [Code][@yozora/ast] data produced by
[@yozora/tokenizer-indented-code][] and [@yozora/tokenizer-fenced-code].\
This component has been built into [@yozora/react-markdown][], you can use it directly.

## Migration

`@yozora/react-code` has been renamed to `@yozora/react-renderer-code`. Update the
dependency name and imports, including `@yozora/react-renderer-code/style.css`.
Component names, named exports, and props are unchanged by this rename.

`@yozora/react-code-editor`, `@yozora/react-code-embed`, `@yozora/react-code-literal`,
`@yozora/react-code-live`, `@yozora/react-common-copy-button`,
`@yozora/react-common-light-buttons`, and `@yozora/react-code-runners` are now part of
this package. Replace their dependencies with `@yozora/react-renderer-code` and use the
corresponding named exports:

```tsx
import Code, { CodeEditor, CodeEmbed, CodeLiteral, CodeLive } from '@yozora/react-renderer-code'
import { CopyButton, LightButtons, copyToClipboard } from '@yozora/react-renderer-code'
import '@yozora/react-renderer-code/style.css'
```

`Code` remains the default export. Component props and CSS class names are unchanged.
The stylesheet includes all these components and their dependency styles; it replaces
the former packages' stylesheet imports. Applications already importing
`@yozora/react-markdown/style.css` do not need a second stylesheet.

The editor's remaining named exports, including `SimpleCodeEditor`, `classes`, keyboard
constants, and history types, are also available from `@yozora/react-renderer-code`.

`classes` groups selectors by component: `classes.editor`, `classes.embed`,
`classes.literal`, and `classes.live`. Replace editor selector access such as
`classes.container` with `classes.editor.container`.

`getLines` is no longer exported. Inline `text.substring(0, endPos).split('\n')`
where needed.

Lazy previews use native dynamic imports. The default JSX renderer loads on first
client render. `createLazyRenderer(() => import(...))` supplies a stable renderer
with its own `Suspense` boundary and an empty SSR/initial-hydration fallback;
create it outside component render functions. Literal blocks and editors remain
synchronously renderable on the server.

`dynamicImport` now takes `(ecmaImport, scope, rules)` and module loaders take no
arguments. Bind module selection in `rule.importFunc(match)`. Ordinary `.js`/`.ts`
modules load directly and return a Promise that rejects on failure; there is no
placeholder to mount. Component `.jsx`/`.tsx` bindings remain lazy and share a module request
between default and named exports. The existing ordinary-module `defaultImport`
namespace binding is retained. `IAsyncRunnerScopes.Placeholders` was removed.

## Install

- npm

  ```bash
  npm install --save @yozora/react-renderer-code
  ```

- yarn

  ```bash
  yarn add @yozora/react-renderer-code
  ```

## Usage

Import the compiled stylesheet once at your application entry:

```tsx
import '@yozora/react-renderer-code/style.css'
```

It includes styles for dependency components. Tailwind is not required in the consuming
application. The stylesheet uses the `yz` utility prefix and excludes Preflight.


- Basic:

  ```tsx
  import React from 'react'
  import Code from '@yozora/react-renderer-code'

  const wrapper = (
    <Code
      lang="typescript"
      value="let a: number = 1 + 2;"
    />
  )
  ```

### Props

|       Name       |         Type          | Required |  Default  | Description                  |
| :--------------: | :-------------------: | :------: | :-------: | :--------------------------- |
|   `className`    |       `string`        | `false`  |     -     | Root css class               |
|     `darken`     |       `boolean`       | `false`  |     -     | Enable the darken mode       |
|      `lang`      |       `string`        | `false`  |     -     | Language of the source codes |
|      `meta`      |       `string`        | `false`  |     -     | Meta data of the code block  |
| `showCodeLineno` |       `boolean`       | `false`  |  `true`   | Display linenos in default   |
|    `runners`     |  `CodeRunnerItem[]`   | `false`  | See below | Code runners.                |
|     `style`      | `React.CSSProperties` | `false`  |     -     | Root css style               |
|     `value`      |       `string`        |  `true`  |     -     | Literal source codes         |

- `runners`:

  ```typescript
  import JsxRenderer from '@yozora/react-embed-jsx'

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

* `meta`:

  ```typescript
  import type { ICodeMetaData as IBaseCodeMetaData } from '@yozora/react'
  import type { ICodeRunnerItem, ICodeRunnerMetaData } from '@yozora/react'

  /**
  * Meta data of the fenced-code.
  */
  export interface ICodeMetaData extends IBaseCodeMetaData, ICodeRunnerMetaData {
    /**
    * Rendering mode.
    */
    _yozoracodemode: 'live' | 'embed' | 'literal' | string
  }
  ```

## Standalone components

### CodeEditor

A controlled editor with syntax highlighting. Its implementation is derived from
[react-simple-code-editor][].

```tsx
import { CodeEditor } from '@yozora/react-renderer-code'
import React from 'react'

function Editor() {
  const [code, setCode] = React.useState('const value = 1')
  return <CodeEditor lang="typescript" code={code} onChange={setCode} />
}
```

`CodeEditor` accepts `maxLines`, `collapsed`, `showLineNo`, `autoFocus`, `theme`,
`darken`, and container, textarea, and pre class/style props. An explicit `theme`
takes precedence over `darken`; otherwise syntax colors follow `ThemeProvider` from
`@yozora/react`. Standalone editors retain their dark default.

### CodeEmbed

Render a code value with a supplied runner and display runner errors inline:

```tsx
import { CodeEmbed } from '@yozora/react-renderer-code'
import type { ICodeRunnerProps } from '@yozora/react'

function TextRunner({ value }: ICodeRunnerProps) {
  return <output>{value}</output>
}

const preview = <CodeEmbed lang="text" value="Hello" runner={TextRunner} />
```

`CodeEmbed` also accepts `meta`, `scope`, `className`, and `style`.

### CodeLiteral

Render highlighted code with a title, copy button, and collapse controls:

```tsx
import { CodeLiteral } from '@yozora/react-renderer-code'

const code = (
  <CodeLiteral lang="typescript" value="const value = 1" title="Example" showLineNo />
)
```

`CodeLiteral` also accepts `highlightLinenos`, `maxLines`, `collapsed`, `darken`,
`className`, and `style`.

### CodeLive

Combine the editor and preview using a list of runners:

```tsx
import { CodeLive, defaultRunners } from '@yozora/react-renderer-code'

const live = (
  <CodeLive
    lang="jsx"
    value="function Example() { return <strong>Hello</strong> }"
    runners={defaultRunners}
  />
)
```

`CodeLive` also accepts `meta`, `scope`, `title`, `maxLines`, `collapsed`, `showLineNo`,
`theme`, `darken`, `autoFocus`, `centerPreviewer`, `className`, and `style`.
`ICodeLiveProps` and `ICodeLiveState` remain named type exports.

### CopyButton

Copy a value to the clipboard and display its status:

```tsx
import { CopyButton } from '@yozora/react-renderer-code'

const copy = <CopyButton value="const value = 1" statusTipMap={{ completed: 'Copied' }} />
```

`CopyButton` also accepts `onClick`, `onError`, `className`, and `style`.
`ICopyStatusTipMap` and `copyToClipboard` remain named exports. The status keys are
`pending`, `copying`, `completed`, and `failed`.

### LightButtons

Render the close, minimize, and maximize controls used by code toolbars:

```tsx
import { LightButtons } from '@yozora/react-renderer-code'
import React from 'react'

function Controls() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div data-collapsed={collapsed}>
      <LightButtons onMinimize={() => setCollapsed(true)} onMaximize={() => setCollapsed(false)} />
    </div>
  )
}
```

`LightButtons` also accepts `onClose`, `className`, and `style`.

## Runners

Runner factories and dynamic-import helpers formerly provided by
`@yozora/react-code-runners` are exported from `@yozora/react-renderer-code`:

- `createGraphvizRunner(GraphvizRenderer)` adapts a renderer accepting `code`, `engine`,
  and `onError` to a code runner.
- `createMathRunner(MathRenderer)` adapts a renderer accepting a Yozora math token;
  surrounding dollar delimiters are removed from the formula.
- `createUseJsxRunner(params)` creates a hook that supplies JSX runners with preset
  scopes and dynamic imports.
- `dynamicImport` prepares lazy component bindings or loads ordinary module bindings
  directly into the runner scope.

```tsx
import { CodeLive, createLazyRenderer, createUseJsxRunner } from '@yozora/react-renderer-code'
import React from 'react'

const useJsxRunner = createUseJsxRunner({
  presetJsxScope: { React },
  rules: [],
  JsxRenderer: createLazyRenderer(() => import('@yozora/react-embed-jsx')),
  defaultRenderMode: 'inline',
})

function Demo() {
  const JsxRunner = useJsxRunner([])
  const runners = React.useMemo(
    () => [{ title: 'jsx', pattern: /^jsx$/, runner: JsxRunner }],
    [JsxRunner],
  )
  return (
    <CodeLive
      lang="jsx"
      value="function Example() { return <strong>Hello</strong> }"
      runners={runners}
    />
  )
}
```

Optional embed renderers can be loaded in the same way without making them
mandatory dependencies of this package:

```tsx
import { createGraphvizRunner, createLazyRenderer } from '@yozora/react-renderer-code'

const GraphvizRunner = createGraphvizRunner(
  createLazyRenderer(() => import('@yozora/react-embed-graphviz')),
)
```

For ordinary modules, the runner starts loading when it mounts, reports failures
through `onError`, and discards results from replaced import configurations.
Equivalent imports preserve runner/component identity. Remounting after a failed
ordinary-module request retries it. A rejected native lazy component remains
cached by React; recreate that lazy renderer or reload to retry its module.

`ICreateUseJsxRunnerParams`, `IDynamicImportRule`, and `IDynamicImportFunc` are also
exported here. Shared contracts such as `ICodeRunner`, `ICodeRunnerItem`, and
`ICodeRunnerProps` are available from `@yozora/react`.

## Related

- [@yozora/ast][]
- [@yozora/react][]
- [@yozora/react-markdown][]
- [@yozora/tokenizer-indented-code][]
- [@yozora/tokenizer-fenced-code][]
- [Code | Mdast][mdast]
- [react-simple-code-editor][]

[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#code
[@yozora/react]: https://www.npmjs.com/package/@yozora/react
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-indented-code]: https://www.npmjs.com/package/@yozora/tokenizer-indented-code
[@yozora/tokenizer-fenced-code]: https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
[mdast]: https://github.com/syntax-tree/mdast#code
[react-simple-code-editor]: https://github.com/satya164/react-simple-code-editor
