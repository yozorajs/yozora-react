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

The page covers Markdown typography, links, task lists, tables, footnotes, admonitions,
syntax highlighting, copy buttons, an editable TypeScript editor, and live JSX with
error rendering. Use the theme and line-number controls and resize the browser to
check the 479px breakpoint. The theme selector includes all 18 named variants and defaults to
`vsc / light-modern`; Markdown, the editor, and live JSX share the selected palette.
Live JSX has a reset button for recovering from edits.

## Development

Edit `src/fixtures.ts` to add sample ASTs and `src/main.tsx` to add interactive cases.
The demo imports package exports and copies the published `react-yozora/style.css`
entry unchanged. This exercises the same JS and CSS that consumers receive.

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
MathJax and Graphviz cases are not included in this minimal playground.

## Reproducing an existing live JSX issue

Change the working counter code to `function {`: the preview becomes empty without
showing the syntax error. `CodeEmbed.componentDidUpdate` clears the error on value
changes after the child renderer reports it. Resetting the sample restores the
counter. The separate “错误示例” button mounts invalid code directly, which shows the
error panel and allows its styles to be tested. The demo preserves this library
behavior instead of applying a workaround in the runner.
