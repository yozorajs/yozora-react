# @yozora/demo

Private component playground. No new third-party packages: the demo reuses React,
tsdown, and local Yozora packages. The development server uses Node's built-in HTTP
server; Markdown samples are AST fixtures, so no parser is needed.

From the repository root:

```sh
pnpm demo
```

Open http://127.0.0.1:7302. This builds the demo and its workspace dependencies before
starting the server. Set `PORT` to use another port. The server binds to loopback only.

Use the Renderer selector to switch between `react-gfm`, `react-gfm-ex`, and
`react-yozora` (the default). Each selection uses that package's `Markdown`,
`MarkdownProvider`, stylesheet, and a matching AST fixture:

- `react-gfm`: typography, links, blockquotes, ordinary lists, and code blocks.
- `react-gfm-ex`: adds strikethrough, task lists, and tables.
- `react-yozora`: adds footnotes, admonitions, math, enhanced code blocks, and live JSX.

The Math section includes inline formulas, sums, integrals, matrices, and piecewise
functions. It uses `MathJaxProvider` and the preset's `inlineMath` / `math` renderers.
MathJax 4.1.3 and its CHTML fonts are copied from the existing workspace dependencies
into the static build, with the MathJax license and font package metadata; formulas
render without a CDN.

The standalone TypeScript editor remains available in every preset. Renderer switches
preserve the theme, line-number setting, and editor text; preset previews remount.
Use the theme and line-number controls and resize the browser to
check the 479px breakpoint. The theme selector includes all 18 named variants and defaults to
`vsc / light-modern`; Markdown, the editor, and live JSX share the selected palette.
Live JSX has a reset button for recovering from edits.

## Development

Edit `src/fixtures.ts` to add sample ASTs and `src/main.tsx` to add interactive cases.
The demo imports package exports and copies all three published preset stylesheets
unchanged, activating only the selected preset's stylesheet. The standalone editor
also loads `react-renderer-code/style.css`. This exercises the same JS and CSS that
consumers receive.

Demo source changes rebuild and reload the page. To also rebuild component packages
while editing their source, run this in a second terminal:

```sh
pnpm --filter '@yozora/demo^...' --parallel --if-present watch
```

The demo observes rebuilt package JS/CSS and reloads; a reload resets page state.

## Static build

```sh
pnpm --filter '@yozora/demo...' build
```

Serve `packages/demo/dist` with any static HTTP server. The static build does not
contain the development reload client. No external assets or CDN requests are needed.
Graphviz cases are not included in this playground.

## Checking live JSX errors

Change the working counter code to `function {`: the preview should show a syntax
error. Resetting the sample restores the counter. The separate “错误示例” button
mounts invalid code directly, which also shows the error panel and allows its
styles to be tested.
