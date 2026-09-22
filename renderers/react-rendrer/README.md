# @yozora/react-renderer

Shared AST renderers, theme providers, syntax highlighting, tokens, code-runner contracts, and utilities for Yozora React.

```ts
import { CommonTokenNames, TokenNames, clsx, parseCodeMeta, tokens } from '@yozora/react-renderer'
import type { ICodeMetaData, ICodeRunner, ICodeRunnerProps } from '@yozora/react-renderer'
```

## Migration

The package is now named `@yozora/react-renderer` (previously `@yozora/react` and
`@yozora/react-core`). Update dependency names and imports, including
`@yozora/react-renderer/style.css`. Public exports and component behavior are unchanged
by this rename.

This package replaces `@yozora/core-react-constant`, `@yozora/core-react-types`,
`@yozora/core-react-util`, and `@yozora/core-react-theme`. Update dependencies and import specifiers to
`@yozora/react-renderer`. ESM, CommonJS, and TypeScript declarations are available
through the package root.

The old `light` / `darken` themes and `lightSchema` / `darkenSchema` exports have been
removed. Use `theme="vsc" variant="light-modern"` / `variant="dark-modern"` instead.
For direct color-map access, use `vscLightModernSchema.colors` /
`vscDarkModernSchema.colors`; these use the new palette rather than the old colors.

Source modules are grouped under `constant`, `types`, `util`, `theme`, `highlighter`, and `renderer` inside the package.
The public import entry is `@yozora/react-renderer`.

## Theme

```tsx
import '@yozora/react-renderer/style.css'
import { ThemeProvider, useThemeContext } from '@yozora/react-renderer'
```

`ThemeProvider`, `useThemeContext`, `vscLightModernSchema`, `vscDarkModernSchema`, `IBreakpoints`,
`IThemeContext`, and `IThemeProviderProps` are available from the package root.
Existing component stylesheets include the theme styles through their dependency on
`@yozora/react-renderer`; standalone theme users import `@yozora/react-renderer/style.css`.
Custom breakpoints and inherited CSP nonces retain their existing behavior.

Built-in schemas are flat files under `src/theme/schema/`. Each schema is a literal
object defining the original `palette`, component `colors`, syntax roles in
`syntax`, and separate `theme`, `variant`, and `darken` metadata. Select a family and variant:

```tsx
<ThemeProvider theme="vsc" variant="dark-modern">{children}</ThemeProvider>
<ThemeProvider theme="catppuccin" variant="latte">{children}</ThemeProvider>
```

Full names such as `theme="vsc-dark-modern"` also work. `useThemeContext()` exposes
the resolved family, variant, and schema. `themeSchemas` lists the available
schemas; `getThemeSchema(theme, variant?)` resolves them without React. A provider
with no theme props uses `vsc / light-modern`; an explicit family name uses the
family default below. Supplying only `variant` selects a variant of `vsc`.

| Theme        | Variants                                | Default variant |
| ------------ | --------------------------------------- | --------------- |
| `vsc`        | `dark-modern`, `light-modern`           | `dark-modern`   |
| `catppuccin` | `frappe`, `latte`, `macchiato`, `mocha` | `mocha`         |
| `gruvbox`    | `dark`, `light`                         | `dark`          |
| `kanagawa`   | `dragon`, `lotus`, `wave`               | `wave`          |
| `rosepine`   | `dawn`, `main`, `moon`                  | `main`          |
| `tokyonight` | `day`, `moon`, `night`, `storm`         | `night`         |

Palettes retain the upstream color names and values. Component `colors` and
highlighting `syntax` only reuse colors already present in that palette; no colors
are blended, lightened, darkened, or given additional alpha. Upstream transparent
colors remain unchanged. The former semantic palette fields (`bg0`, `tokenKeyword`,
etc.) are replaced by native names; use `colors[TokenNames.colorBgBody]` and
`syntax.keyword` for those roles.

Each schema links to its pinned community source. The palettes are bundled locally;
consumers and builds do not access the network or personal configuration files.
Tokyo Night's nested color names use dotted paths (for example `diff.add`). VS Code
combines its inherited workbench colors and TextMate scope colors, retaining their
original names. `IThemePalette` describes native colors; `IThemeSyntax` describes the
shared syntax roles.

See [third-party notices](./THIRD_PARTY_NOTICES.md) for palette attribution and
licenses. Generated stylesheets include a copy alongside `style.css`.

| Theme | Community source |
| --- | --- |
| `catppuccin` | [catppuccin/palette](https://raw.githubusercontent.com/catppuccin/palette/07d02aa110ef9eb7e7427afca5c73ba9cf7f8ebd/palette.json) |
| `gruvbox` | [morhetz/gruvbox](https://raw.githubusercontent.com/morhetz/gruvbox/5d15b2765f59754d7ac263c88a0f6e3e58124951/colors/gruvbox.vim) |
| `kanagawa` | [rebelot/kanagawa.nvim](https://raw.githubusercontent.com/rebelot/kanagawa.nvim/bb85e4bfc8d89b0e62c8fa53ccdd13d12e2f77b3/lua/kanagawa/colors.lua) |
| `rosepine` | [rose-pine/neovim](https://raw.githubusercontent.com/rose-pine/neovim/ff483051a47e27d84bdef47703538df1ed9f4a47/lua/rose-pine/palette.lua) |
| `tokyonight` | [folke/tokyonight.nvim](https://raw.githubusercontent.com/folke/tokyonight.nvim/cdc07ac78467a233fd62c493de29a17e0cf2b2b6/extras/lua/tokyonight_night.lua) |
| `vsc` | [microsoft/vscode](https://raw.githubusercontent.com/microsoft/vscode/903d0d0aad3aa5a6a230be51a867edcffa3a00d5/extensions/theme-defaults/themes/dark_modern.json) |

Unknown names or variants select no built-in palette, so custom CSS themes remain usable.

Code highlighting follows the provider's palette automatically. An explicit highlighter
`theme` prop takes precedence, followed by an explicit `darken` prop. Standalone
highlighters without a provider retain their dark default.

## AST rendering

`@yozora/core-react-renderer` is now included under `src/renderer/`. Import its
components, hooks, renderer maps, and types from `@yozora/react-renderer`, and replace
its stylesheet import with `@yozora/react-renderer/style.css`.

```tsx
import { NodeRendererProvider, NodesRenderer, ThemeProvider } from '@yozora/react-renderer'
import '@yozora/react-renderer/style.css'

<ThemeProvider theme="vsc" variant="light-modern">
  <NodeRendererProvider>
    <NodesRenderer nodes={nodes} />
  </NodeRendererProvider>
</ThemeProvider>
```

`NodeRendererProvider` retains its `customRendererMap`, `definitionMap`,
`footnoteDefinitionMap`, `images`, `ImageViewer`, and `showCodeLineno` props.
Individual renderers, `buildNodeRendererMap`, `defaultNodeRendererMap`, and the
`useNodeRendererContext` / `useNodeRendererState` / `useNodeRendererDispatch` hooks
remain available. Renderer context and viewmodel exports retain their names and
behavior.

Tables show vertical column separators by default, using the active theme's
table border color. Set `showTableColumnLines={false}` on `NodeRendererProvider`
or a preset's `MarkdownProvider` to hide them. The option updates existing tables
without replacing the AST; horizontal row separators remain visible.

The renderer's existing `@guanghechen/react-viewmodel` dependency and `@yozora/ast`
/ `react-dom` peer requirements now belong to this package. Their versions are
unchanged. Bundled utility-only consumers can omit renderer dependencies.

## Code highlighting

`@yozora/react-code-highlighter` is now included in this package. Replace its default
import with the named `CodeHighlighter` export, import types such as `IPrismTheme`
from `@yozora/react-renderer`, and use `@yozora/react-renderer/style.css`.

```tsx
import { CodeHighlighter, ThemeProvider } from '@yozora/react-renderer'
import '@yozora/react-renderer/style.css'

<ThemeProvider theme="catppuccin" variant="mocha">
  <CodeHighlighter lang="typescript" value="const answer: number = 42" />
</ThemeProvider>
```

Existing highlighter props, callbacks, CSS class names, and CSS variables are
preserved. An explicit Prism `theme` overrides `darken`, which overrides the
provider's theme; standalone highlighters still default to VS Code dark colors.
Language registration is included when using the highlighter. Bundled consumers
that only import core utilities can omit Prism and the registered languages.
Mermaid source is highlighted with `lang="mermaid"` using the Prism 1.30.0 grammar;
the same registration is used by `CodeEditor` and `CodeLive`.

`parseCodeMeta` requires `lineCount` alongside `showCodeLineno`. Pass the actual
number of code lines; `countCodeLines(value)` counts LF, CRLF, and CR line endings
without splitting the code into an array (empty code has one line). Existing
callers must add this option; omitted, negative, fractional, or non-safe counts
throw a `RangeError`.

Line highlights in `{1-3}`, `highlight=`, and `highlights=` metadata are merged,
sorted, and clipped to `1…lineCount` before expansion. Unsafe endpoints are ignored.
For example, `{2-1000000000}` with `lineCount: 4` returns `[2, 3, 4]`. There is no
fixed highlight-count limit; allocation is bounded by the actual code line count.

The former named exports remain available, including `HighlightContent`,
`HighlightLinenos`, `classes`, `vars`, `githubTheme`, `vscDarkTheme`, `vscLightTheme`,
`normalizeTokens`, `themeToDict`, `areSameArray`, and the Prism-related types.

## Media preview

Shared modal preview for SVG diagrams and images. Supports React 17, 18, and 19.
Preview styles are included in `@yozora/react-renderer/style.css` and every
Markdown preset's stylesheet. Standalone consumers must import the renderer CSS.

### ImageViewer

Use `ImageViewer` with the image slot on any Yozora Markdown preset:

```tsx
import { ImageViewer } from '@yozora/react-renderer'
import { MarkdownProvider } from '@yozora/react-yozora'
import '@yozora/react-yozora/style.css'

<MarkdownProvider
  images={[{ src: '/photo.jpg', alt: 'Landscape' }]}
  ImageViewer={ImageViewer}
>
  {/* Markdown content */}
</MarkdownProvider>
```

For standalone use, pass `images`, `visible`, `activeIndex` (default `0`) and
`onClose`. `onMaskClick`, when provided, handles backdrop dismissal instead of
`onClose`; the parent must hide the viewer in either callback. Changing the active
image source or closing the viewer discards its edits.

### MediaPreview

Mount `MediaPreview` to open a dialog, and unmount it in `onClose`:

```tsx
import { MediaPreview } from '@yozora/react-renderer'
import '@yozora/react-renderer/style.css'

<MediaPreview
  source={{ kind: 'image', src: '/photo.jpg', alt: 'Landscape' }}
  onClose={() => setOpen(false)}
/>
```

SVG sources use `{ kind: 'svg', svg, width, height }`, with dimensions in SVG
coordinate units. SVG markup is displayed in a sandboxed iframe with scripts
disabled and IDs isolated from the host document. A missing root `viewBox` is
derived from `width` and `height` on the client; existing view boxes are preserved.
Supply trusted or sanitized SVG;
the preview does not sanitize markup or prevent external resource requests.
Mount a new preview (or change its React `key`) when replacing a source.

Both components accept `dark` (default `false`) and an optional
`palette: { surface, text, border }`. Map the current renderer theme colors into
these props to match the surrounding document. `MediaPreview` also accepts a
custom `title`.

### Controls

- Zoom in/out, Fit, original scale (100%), drag to pan, and touch scrolling.
- Rotate left/right in 90° steps; Reset restores the original view and fits it.
- Images: rectangular crop with selection dragging, corner handles, or pixel
  inputs; Apply commits the selection locally and Cancel discards it.
- Images: independent width/height stretch from 25% to 300%.

Crop coordinates refer to the original image, including after rotation and
stretching. All edits are preview-only: no export and no changes to source files.
The close button, Escape, and backdrop dismiss the modal and restore focus.
Fit follows viewport size changes; manual zoom preserves the chosen scale.
Short viewports use compact, horizontally scrollable controls while preserving
a usable canvas. At very small heights, the dialog contents can scroll vertically.
`PreviewIcon` is also exported for matching preview triggers.

Import and SSR are safe in Node. The dialog opens only in a client effect and
requires a browser with native `HTMLDialogElement` and `ResizeObserver` support.

## Class names

```tsx
import { clsx } from '@yozora/react-renderer'

clsx('button', ['rounded', false], { active: true }) // 'button rounded active'
```

`clsx(...values)` accepts strings, numbers, booleans, null, undefined, conditional
objects, and readonly nested arrays. Falsy values (including `0` and `NaN`) and
booleans are ignored. Objects contribute their own enumerable nonempty string keys
whose values are truthy; inherited and symbol keys are ignored. Arrays must be acyclic.

Input order, duplicates, and existing whitespace are preserved. It does not merge
conflicting Tailwind utilities. `ClassValue` and `IClassDictionary` are exported for
typed wrappers. The implementation concatenates directly without intermediate
filtered or flattened arrays and adds no dependencies.

Run the benchmark from the repository root with `node script/bench-clsx.mjs`.
It covers short/flat strings, conditional objects, nested arrays, and mixed inputs,
comparing against filter/collect-and-join references. Pass paths to local ESM modules
exporting `clsx` to compare additional implementations with identical inputs:

```sh
node script/bench-clsx.mjs /path/to/before.mjs /path/to/official-clsx.mjs
```

The benchmark warms each implementation, rotates execution order, and reads a
character from every output. Results depend on the JavaScript engine and workload.
