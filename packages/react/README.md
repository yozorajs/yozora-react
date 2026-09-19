# @yozora/react

Shared document layout and Provider for rendering Yozora ASTs in React. This is a
rendering kernel: select a default renderer map explicitly, or use a syntax preset.
It does not parse Markdown or depend on the math, admonition, or live-code packages.

```tsx
import { Markdown, MarkdownProvider } from '@yozora/react'
import { defaultNodeRendererMap } from '@yozora/react-gfm'
import '@yozora/react-gfm/style.css'

<MarkdownProvider rendererMap={defaultNodeRendererMap}>
  <Markdown ast={ast} />
</MarkdownProvider>
```

`Markdown` renders the AST body and an optional `footer`. `MarkdownRoot` supplies
the shared document layout and responsive styles, including inherited CSP nonces.
`MarkdownProvider` accepts a `rendererMap` and the common reference-definition,
image-viewer, line-number and `customRendererMap` options. Defined custom renderers
override the preset; omitted or `undefined` entries retain its defaults.

The presets follow the corresponding Yozora parser packages:

- [`@yozora/react-gfm`](../react-gfm): the `@yozora/parser-gfm` node set.
- [`@yozora/react-gfm-ex`](../react-gfm-ex): tables, strikethrough, extended autolinks and task lists.
- [`@yozora/react-yozora`](../react-yozora): footnotes, math, admonitions and executable code.

Each preset exports `Markdown` (also the default), `MarkdownProvider`,
`MarkdownRoot` and `defaultNodeRendererMap`. Import the selected preset's
`style.css`; it includes dependency styles. ASTs come from `@yozora/ast` and the
matching parser, rather than a raw Markdown string.

The former `@yozora/react-markdown` API is now provided by `@yozora/react-yozora`.
The low-level renderers and theme API remain in `@yozora/react-renderer`.
