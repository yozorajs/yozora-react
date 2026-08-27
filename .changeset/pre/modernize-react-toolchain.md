---
"@yozora/core-react-renderer": patch
"@yozora/core-react-theme": patch
"@yozora/react-admonition": patch
"@yozora/react-code": patch
"@yozora/react-code-editor": patch
"@yozora/react-code-embed": patch
"@yozora/react-code-highlighter": patch
"@yozora/react-code-literal": patch
"@yozora/react-code-live": patch
"@yozora/react-code-renderer-graphviz": patch
"@yozora/react-code-renderer-jsx": patch
"@yozora/react-code-runners": patch
"@yozora/react-common-copy-button": patch
"@yozora/react-common-light-buttons": patch
"@yozora/react-markdown": patch
"@yozora/react-mathjax": patch
---

Upgrade the React 19 and TypeScript 6 toolchain and remove the deprecated `prop-types` runtime
dependency.

Within the 3.0 prerelease, `@yozora/react-code-runners` no longer exports `CodeRunnerPropTypes`, and
`@yozora/react-mathjax` now loads MathJax 4 by default.

For `@yozora/react-mathjax`, `IMathJaxContext.MathJax3` and the `MathJaxNodeWithoutContext`
`MathJax3` prop are renamed to `MathJax`. The provider `onError` callback now receives only the
loading error. The `IMathJax3`, `IMathJaxConfig3`, and `loadMathJax3` aliases remain deprecated for
migration.
