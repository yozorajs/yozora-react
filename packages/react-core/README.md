# @yozora/react-core

Shared theme providers, syntax highlighting, tokens, code-runner contracts, and utilities for Yozora React.

```ts
import { CommonTokenNames, TokenNames, clsx, parseCodeMeta, tokens } from '@yozora/react-core'
import type { ICodeMetaData, ICodeRunner, ICodeRunnerProps } from '@yozora/react-core'
```

## Migration

This package replaces `@yozora/core-react-constant`, `@yozora/core-react-types`,
`@yozora/core-react-util`, and `@yozora/core-react-theme`. Update dependencies and import specifiers to
`@yozora/react-core`. ESM, CommonJS, and TypeScript declarations are available
through the package root.

The old `light` / `darken` themes and `lightSchema` / `darkenSchema` exports have been
removed. Use `theme="vsc" variant="light-modern"` / `variant="dark-modern"` instead.
For direct color-map access, use `vscLightModernSchema.colors` /
`vscDarkModernSchema.colors`; these use the new palette rather than the old colors.

Source modules are grouped under `constant`, `types`, `util`, `theme`, and `highlighter` inside the package.
The public import entry is `@yozora/react-core`.

## Theme

```tsx
import '@yozora/react-core/style.css'
import { ThemeProvider, useThemeContext } from '@yozora/react-core'
```

`ThemeProvider`, `useThemeContext`, `vscLightModernSchema`, `vscDarkModernSchema`, `IBreakpoints`,
`IThemeContext`, and `IThemeProviderProps` are available from the package root.
Existing component stylesheets include the theme styles through their dependency on
`react-core`; standalone theme users import `@yozora/react-core/style.css`.
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

## Code highlighting

`@yozora/react-code-highlighter` is now included in this package. Replace its default
import with the named `CodeHighlighter` export, import types such as `IPrismTheme`
from `@yozora/react-core`, and use `@yozora/react-core/style.css`.

```tsx
import { CodeHighlighter, ThemeProvider } from '@yozora/react-core'
import '@yozora/react-core/style.css'

<ThemeProvider theme="catppuccin" variant="mocha">
  <CodeHighlighter lang="typescript" value="const answer: number = 42" />
</ThemeProvider>
```

Existing highlighter props, callbacks, CSS class names, and CSS variables are
preserved. An explicit Prism `theme` overrides `darken`, which overrides the
provider's theme; standalone highlighters still default to VS Code dark colors.
Language registration is included when using the highlighter. Bundled consumers
that only import core utilities can omit Prism and the registered languages.

The former named exports remain available, including `HighlightContent`,
`HighlightLinenos`, `classes`, `vars`, `githubTheme`, `vscDarkTheme`, `vscLightTheme`,
`normalizeTokens`, `themeToDict`, `areSameArray`, and the Prism-related types.

## Class names

```tsx
import { clsx } from '@yozora/react-core'

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
