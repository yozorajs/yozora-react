# @yozora/react-gfm-ex

Render the AST produced by `@yozora/parser-gfm-ex`. Extends the GFM preset with
tables, strikethrough, extended autolinks (ordinary link nodes), and task-list
items, including Yozora's `todo`, `doing` and `done` statuses.

```tsx
import { Markdown, MarkdownProvider } from '@yozora/react-gfm-ex'
import '@yozora/react-gfm-ex/style.css'

<MarkdownProvider definitionMap={definitionMap}>
  <Markdown ast={ast} />
</MarkdownProvider>
```

Exports the shared document API plus `defaultNodeRendererMap` and
`ListItemRenderer`. `customRendererMap` overrides the preset defaults. Raw HTML
remains disabled. Footnotes, math, admonitions and executable code are provided
by `@yozora/react-yozora`, which builds on this preset.
