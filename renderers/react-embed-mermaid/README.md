# @yozora/react-embed-mermaid

Render Mermaid diagrams as inline SVG in React. Supports React 17, 18, and 19.

## Install

```bash
pnpm add @yozora/react-embed-mermaid
```

## Usage

```tsx
import MermaidRenderer from '@yozora/react-embed-mermaid'

<MermaidRenderer
  code={`flowchart LR
    A[Markdown] --> B[SVG diagram]`}
  theme="default"
  onError={error => {
    if (error) console.error(error)
  }}
/>
```

The named export `MermaidRenderer` and `IMermaidRendererProps` are also available.
Mermaid loads on the client when a diagram mounts. Importing the package in Node
is safe; SSR outputs an empty container, and hydration fills it with SVG.
Server-side SVG layout is not provided.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `code` | `string` | Required | Mermaid diagram source. |
| `theme` | `'default' \| 'dark' \| 'forest' \| 'neutral' \| 'base'` | `'default'` | Mermaid theme. |
| `palette` | `IMermaidPalette` | — | Override node, border, text, line, surface, and group colors. |
| `onError` | `(error: string \| null) => void` | — | Receives a rendering error, or `null` on success. |
| `className` | `string` | — | Additional class on the root container. |
| `style` | `React.CSSProperties` | — | Inline styles for the root container. |

The `default` and `dark` themes use restrained blue-gray palettes. All themes use
system fonts and rounded flowchart connectors. Explicit
node shapes and source-defined styles are preserved; `forest`, `neutral`, and
`base` retain their Mermaid palettes.

The root always has the class `yozora-code-renderer-mermaid`. It fills the available
width and centers the SVG; `style` can override these defaults. No additional
stylesheet is required. Mermaid renders with `securityLevel: 'strict'`, which
sanitizes diagram content and disables source-defined JavaScript callbacks.

Updates to `code`, `theme`, or palette colors trigger a new render. Equivalent
palette objects do not restart rendering. Replaced or unmounted requests
cannot publish SVG or errors; queued obsolete requests are skipped. Temporary
layout containers are removed on completion or cleanup. Changing the source
after a syntax error retries rendering.

Mermaid configuration is shared. Renderer copies on the same page share a queue
and SVG ID counter, including mixed ESM/CJS imports. Avoid concurrently calling
`mermaid.initialize()` elsewhere on the same Mermaid instance.

## Use with react-renderer themes

Read the active `ThemeProvider` schema and pass its colors explicitly. This keeps
the Mermaid package usable independently of `@yozora/react-renderer`.

```tsx
import MermaidRenderer from '@yozora/react-embed-mermaid'
import { TokenNames, useThemeContext } from '@yozora/react-renderer'
import React from 'react'

function ThemedMermaid({ code }: { code: string }) {
  const { schema } = useThemeContext()
  const palette = React.useMemo(() => {
    if (!schema) return undefined
    const { colors } = schema
    return {
      node: colors[TokenNames.colorBgBody],
      border: colors[TokenNames.colorBorderCode],
      text: colors[TokenNames.colorBody],
      line: colors[TokenNames.colorCodeTitle],
      surface: colors[TokenNames.colorBgCode],
      group: colors[TokenNames.colorBgBlockquote],
    }
  }, [schema])

  return (
    <MermaidRenderer
      code={code}
      theme={schema?.darken ? 'dark' : 'default'}
      palette={palette}
    />
  )
}
```

Use concrete color values from `schema.colors`, rather than CSS `var(...)`
references. A supplied palette overrides the theme's diagram colors; omitting it
restores the selected Mermaid theme's defaults. Switching between two dark or
two light palettes updates the diagram as well.

## Use with CodeLive

Mermaid is an optional renderer; it is not added to the default Markdown runners.

```tsx
import MermaidRenderer from '@yozora/react-embed-mermaid'
import type { ICodeRunnerItem } from '@yozora/react-renderer'
import { CodeLive } from '@yozora/react-renderer-code'

const runners: ICodeRunnerItem[] = [{
  title: 'mermaid',
  pattern: /^mermaid$/,
  runner: ({ value, onError }) => <MermaidRenderer code={value} onError={onError} />,
}]

<CodeLive lang="mermaid" value="flowchart LR; A-->B" runners={runners} />
```

The same runner can be passed to `Code` for `mermaid` code blocks using `embed`
or `live` metadata. Import the stylesheet required by the code renderer as usual.
