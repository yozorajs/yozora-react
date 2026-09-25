# Change Log

## 3.0.0-alpha.26

All 11 public packages use `3.0.0-alpha.26` and the `alpha` npm dist-tag. This
prerelease includes breaking changes since the August 27, 2026 alpha release.
Install the selected preset explicitly, for example
`npm install @yozora/react-yozora@alpha`.

### Package migration

Replace old dependencies and import specifiers together. The renamed packages
are published under their new names; upgrading an old package name does not
switch an application to the new package.

| Previous package | Replacement |
| --- | --- |
| `@yozora/react-markdown` | `@yozora/react-yozora` |
| `@yozora/core-react-renderer`, `core-react-theme`, `core-react-constant`, `core-react-types`, `core-react-util` | `@yozora/react-renderer` |
| `@yozora/react-code-highlighter` | `CodeHighlighter` from `@yozora/react-renderer` |
| `@yozora/react-code` | `@yozora/react-renderer-code` |
| `@yozora/react-code-editor`, `react-code-embed`, `react-code-literal`, `react-code-live` | Corresponding named exports from `@yozora/react-renderer-code` |
| `@yozora/react-common-copy-button`, `react-common-light-buttons`, `react-code-runners` | Named components and runner factories from `@yozora/react-renderer-code` |
| `@yozora/react-admonition` | `@yozora/react-renderer-admonition` |
| `@yozora/react-mathjax` | `@yozora/react-embed-math` |
| `@yozora/react-code-renderer-graphviz` | `@yozora/react-embed-graphviz` |
| `@yozora/react-code-renderer-jsx` | `@yozora/react-embed-jsx` |

All abbreviated package names in the table use the `@yozora/` scope.
For consumers of intermediate source revisions, `@yozora/react-core` and the
former low-level `@yozora/react` API also moved to `@yozora/react-renderer`.

### Breaking changes

- **AST presets:** `@yozora/react` is now the shared document kernel, whose
  `MarkdownProvider` requires an explicit `rendererMap`. Most applications should
  use `@yozora/react-gfm`, `@yozora/react-gfm-ex`, or `@yozora/react-yozora` to match
  their parser's AST. The Yozora preset adds footnotes, math, admonitions and
  executable code. See the [preset API](./packages/react/README.md).
- **Styles:** Emotion runtime styles were replaced by compiled Tailwind v4 CSS.
  Import the highest-level component's `style.css` once, for example
  `@yozora/react-yozora/style.css`. Consumers do not need Tailwind. Existing
  `yozora-*` classes and `--yozora_*` tokens remain available. Tables now have a
  `.yozora-table-scroll` wrapper, so direct-child selectors need updating.
  Supported browsers start at Chrome/Edge 111, Safari 16.4 and Firefox 128.
- **Themes:** `theme="light"` / `theme="darken"` and `lightSchema` / `darkenSchema`
  were removed. Use `theme="vsc" variant="light-modern"` / `variant="dark-modern"`.
  Direct color maps are `vscLightModernSchema.colors` and
  `vscDarkModernSchema.colors`; these palettes replace the old colors. Schemas
  now expose `palette`, `colors`, `syntax`, `theme`, `variant` and `darken`.
  Unknown theme names select no built-in palette. See the
  [theme migration](./renderers/react-renderer/README.md#migration).
- **Code components and runners:** use named exports from
  `@yozora/react-renderer-code` for the consolidated components. `classes` now
  groups selectors by component, for example `classes.editor.container`.
  `getLines` and `IAsyncRunnerScopes.Placeholders` were removed. `dynamicImport`
  takes `(ecmaImport, scope, rules)`, and module loaders take no arguments.
  Lazy previews load after client mount with an empty SSR/initial-hydration
  fallback. See the [code migration](./renderers/react-renderer-code/README.md#migration).
- **Highlight metadata:** `parseCodeMeta` requires a non-negative safe integer
  `lineCount`; pass `countCodeLines(value)`. Missing or invalid counts throw
  `RangeError`. Highlight ranges are clipped before expansion, so a range such
  as `{2-1000000000}` cannot allocate beyond the actual code line count.
- **MathJax ownership:** providers on one page must use matching resolved URLs
  and initialization configurations. Conflicting requests call `onError`.
  Failed loads can be retried by changing provider configuration or remounting.
  Supply an externally initialized engine through `MathJaxContextType.Provider`
  instead of preassigning `window.MathJax`. See
  [loading and ownership](./renderers/react-embed-math/README.md#loading-and-ownership).

### Features and fixes

- Added `@yozora/react-embed-mermaid` with themed SVG rendering, queued rendering
  and optional preview; Mermaid syntax highlighting is also available.
- Added shared `ImageViewer` and `MediaPreview` components with zoom, pan,
  rotation, image cropping and stretching. Edits affect the preview only.
- Added 18 community theme variants and reactive table column-line controls.
- Improved MathJax loading retries, typesetting recovery and updates during
  pending typesetting. Corrected code preview state updates and runner regex handling.
- Added an offline component demo with AST preset switching, math examples and
  shared theme controls. Updated the build to tsdown and the lint workflow to Biome.

### Known limitations

- Bundled MathJax declarations report `TS2344` generic-constraint errors with
  declaration checking enabled. This affects `@yozora/react-embed-math` and the
  `@yozora/react-yozora` preset. `compilerOptions.skipLibCheck: true` is the alpha
  workaround; it skips checking all dependency declarations while application
  source remains checked. Consumers requiring checked declarations should wait
  for a fix. Distribution tests currently use this workaround for these two packages.
- Release checks cover unit tests, ESM/CJS loading, SSR, declarations and build
  output. Real-browser visual and interaction checks are still required before
  declaring the 3.0 API stable, especially for media previews and responsive CSS.

Earlier package histories remain in each package's `CHANGELOG.md`.
