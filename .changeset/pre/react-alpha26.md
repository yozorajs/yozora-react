---
"@yozora/react": patch
"@yozora/react-gfm": patch
"@yozora/react-gfm-ex": patch
"@yozora/react-yozora": patch
"@yozora/react-embed-graphviz": patch
"@yozora/react-embed-jsx": patch
"@yozora/react-embed-math": patch
"@yozora/react-embed-mermaid": patch
"@yozora/react-renderer": patch
"@yozora/react-renderer-admonition": patch
"@yozora/react-renderer-code": patch
---

Publish the reorganized React packages together as the next 3.0 alpha.

Replace `@yozora/react-markdown` with `@yozora/react-yozora`; use `react-gfm` or
`react-gfm-ex` for those AST presets. Shared renderers, themes and highlighting
are in `@yozora/react-renderer`; standalone code components and runner factories
are in `@yozora/react-renderer-code`. Embed packages use `@yozora/react-embed-*`.

Import the chosen component's compiled `style.css`. Replace old `light` / `darken`
themes with `vsc` and `light-modern` / `dark-modern` variants. Code metadata parsing
now requires `lineCount`; JSX loaders and shared MathJax initialization also have
breaking contract changes.

Add community themes, Mermaid rendering, media previews and table controls, and
fix asynchronous code-preview and MathJax updates. Bundled MathJax declarations
still require `skipLibCheck: true` in this alpha.

See the [release notes](https://github.com/yozorajs/yozora-react/blob/@yozora/react-yozora@3.0.0-alpha.26/CHANGELOG.md)
for package mappings, API migration and known limitations.
