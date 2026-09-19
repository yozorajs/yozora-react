# @yozora/react-gfm

Render the AST produced by `@yozora/parser-gfm`. Naming follows the Yozora parser
packages: this preset contains the base node set, while GFM extensions are in
`@yozora/react-gfm-ex`.

```tsx
import { Markdown, MarkdownProvider } from '@yozora/react-gfm'
import '@yozora/react-gfm/style.css'

<MarkdownProvider definitionMap={definitionMap}>
  <Markdown ast={ast} />
</MarkdownProvider>
```

Supports text, paragraphs, headings, emphasis, strong text, links and references,
images and references, lists, blockquotes, code, breaks and thematic breaks.
Raw HTML and definition nodes are not inserted into the DOM. Tables,
strikethrough, task checkboxes and Yozora extensions are not enabled by default.

The common Provider options include `customRendererMap`, `showCodeLineno`,
`definitionMap`, `images` and `ImageViewer`. Custom renderers take precedence.
`MarkdownRoot`, `defaultNodeRendererMap` and their types are also exported.
No MathJax, admonition or executable-code package is loaded by this preset.
