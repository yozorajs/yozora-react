<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react#readme">Yozora React</a>
  </h1>
  <div align="center">
    <a href="#license">
      <img
        alt="License"
        src="https://img.shields.io/github/license/guanghechen/yozora-react"
      />
    </a>
    <a href="https://github.com/guanghechen/yozora-react/tags">
      <img
        alt="Package Version"
        src="https://img.shields.io/github/v/tag/guanghechen/yozora-react?include_prereleases&sort=semver"
      />
    </a>
    <a href="https://github.com/guanghechen/yozora-react/search?l=typescript">
      <img
        alt="Github Top Language"
        src="https://img.shields.io/github/languages/top/guanghechen/yozora-react"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/react-blockquote"
      />
    </a>
    <a href="https://github.com/guanghechen/yozora-react/actions/workflows/ci.yml">
      <img
        alt="CI Workflow"
        src="https://github.com/guanghechen/yozora-react/workflows/Build/badge.svg?branch=master"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-blockquote/peer/react"
      />
    </a>
    <a href="https://github.com/styled-components/styled-components">
      <img
        alt="Styled-Components version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-blockquote/peer/styled-components"
      />
    </a>
    <a href="https://github.com/facebook/jest">
      <img
        alt="Tested with Jest"
        src="https://img.shields.io/badge/tested_with-jest-9c465e.svg"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>

A monorepo contains react components render [yozora tokens][yozora/autolink]. See https://yozora.guanghechen.com for details.

## Overview

### Markdown components

Component Name                    | Token Name
:--------------------------------:|:--------------------------------------
[@yozora/react-blockquote][]      | [blockquote][yozora/blockquote][]
[@yozora/react-code][]            | [indentedCode][yozora/indented-code][], [fencedCode][yozora/fenced-code]
[@yozora/react-delete][]          | [delete][yozora/delete]
[@yozora/react-emphasis][]        | [emphasis][yozora/emphasis]
[@yozora/react-heading][]         | [heading][yozora/heading], [setextHeading][yozora/setext-heading]
[@yozora/react-inline-code][]     | [inlineCode][yozora/inline-code]
[@yozora/react-inline-math][]     | [inlineFormula][yozora/inline-formula]
[@yozora/react-link][]            | [link][yozora/link]
[@yozora/react-list][]            | [list][yozora/list]
[@yozora/react-list-item][]       | [listItem][yozora/list-item]
[@yozora/react-math][]            | -
[@yozora/react-paragraph][]       | [paragraph][yozora/paragraph]
[@yozora/react-strong][]          | [strong][yozora/emphasis]
[@yozora/react-table][]           | [table][yozora/table]
[@yozora/react-table-cell][]      | [tableCell][yozora/table]
[@yozora/react-table-row][]       | [tableRow][yozora/table]
[@yozora/react-text][]            | [text][yozora/text]
[@yozora/react-thematic-break][]  | [thematic-break][yozora/thematic-break]


### Other components

Component Name              | Description
:--------------------------:|:----------------------------------
[@yozora/code-editor]       | A simple code editor.
[@yozora/code-embed]        | A simple code editor online.
[@yozora/code-highlighter]  | Highlight codes.
[@yozora/code-live]         | A live code editor, be similar to [react-live].
[@yozora/code-renderer-jsx] | A component for renderer jsx directly in browser.
[@yozora/markdown]          | A component for render markdown content with above Markdown Components.


[react-live]: https://github.com/FormidableLabs/react-live

<!-- yozora component links -->
[@yozora/react-blockquote]: https://github.com/guanghechen/yozora-react/tree/master/packages/blockquote#readme
[@yozora/react-code]: https://github.com/guanghechen/yozora-react/tree/master/packages/code#readme
[@yozora/react-code-editor]: https://github.com/guanghechen/yozora-react/tree/master/packages/code-editor#readme
[@yozora/react-code-embed]: https://github.com/guanghechen/yozora-react/tree/master/packages/code-embed#readme
[@yozora/react-code-highlighter]: https://github.com/guanghechen/yozora-react/tree/master/packages/code-highlighter#readme
[@yozora/react-code-live]: https://github.com/guanghechen/yozora-react/tree/master/packages/code-live#readme
[@yozora/react-code-renderer-jsx]: https://github.com/guanghechen/yozora-react/tree/master/packages/code-renderer-jsx#readme
[@yozora/react-delete]: https://github.com/guanghechen/yozora-react/tree/master/packages/delete#readme
[@yozora/react-emphasis]: https://github.com/guanghechen/yozora-react/tree/master/packages/emphasis#readme
[@yozora/react-heading]: https://github.com/guanghechen/yozora-react/tree/master/packages/heading#readme
[@yozora/react-inline-code]: https://github.com/guanghechen/yozora-react/tree/master/packages/inline-code#readme
[@yozora/react-inline-math]: https://github.com/guanghechen/yozora-react/tree/master/packages/inline-math#readme
[@yozora/react-link]: https://github.com/guanghechen/yozora-react/tree/master/packages/link#readme
[@yozora/react-list]: https://github.com/guanghechen/yozora-react/tree/master/packages/list#readme
[@yozora/react-list-item]: https://github.com/guanghechen/yozora-react/tree/master/packages/list-item#readme
[@yozora/react-math]: https://github.com/guanghechen/yozora-react/tree/master/packages/math#readme
[@yozora/react-paragraph]: https://github.com/guanghechen/yozora-react/tree/master/packages/paragraph#readme
[@yozora/react-strong]: https://github.com/guanghechen/yozora-react/tree/master/packages/strong#readme
[@yozora/react-table]: https://github.com/guanghechen/yozora-react/tree/master/packages/table#readme
[@yozora/react-table-cell]: https://github.com/guanghechen/yozora-react/tree/master/packages/table-cell#readme
[@yozora/react-table-row]: https://github.com/guanghechen/yozora-react/tree/master/packages/table-row#readme
[@yozora/react-text]: https://github.com/guanghechen/yozora-react/tree/master/packages/text#readme
[@yozora/react-thematic-break]: https://github.com/guanghechen/yozora-react/tree/master/packages/thematic-break#readme
[@yozora/react-markdown]: https://github.com/guanghechen/yozora-react/tree/master/packages/markdown#readme

<!-- yozora doc links -->
[yozora/doc]: https://yozora.guanghechen.com
[yozora/autolink]: https://yozora.guanghechen.com/docs/package/tokenizer-autolink
[yozora/blockquote]: https://yozora.guanghechen.com/docs/package/tokenizer-blockquote
[yozora/break]: https://yozora.guanghechen.com/docs/package/tokenizer-break
[yozora/delete]: https://yozora.guanghechen.com/docs/package/tokenizer-delete
[yozora/emphasis]: https://yozora.guanghechen.com/docs/package/tokenizer-emphasis
[yozora/fenced-code]: https://yozora.guanghechen.com/docs/package/tokenizer-fencend-code
[yozora/heading]: https://yozora.guanghechen.com/docs/package/tokenizer-heading
[yozora/html-block]: https://yozora.guanghechen.com/docs/package/tokenizer-html-block
[yozora/html-inline]: https://yozora.guanghechen.com/docs/package/tokenizer-html-inline
[yozora/image]: https://yozora.guanghechen.com/docs/package/tokenizer-image
[yozora/image-reference]: https://yozora.guanghechen.com/docs/package/tokenizer-image-reference
[yozora/indented-code]: https://yozora.guanghechen.com/docs/package/tokenizer-indented-code
[yozora/inline-code]: https://yozora.guanghechen.com/docs/package/tokenizer-inline-code
[yozora/inline-formula]: https://yozora.guanghechen.com/docs/package/tokenizer-inline-formula
[yozora/link]: https://yozora.guanghechen.com/docs/package/tokenizer-link
[yozora/link-reference]: https://yozora.guanghechen.com/docs/package/tokenizer-link-reference
[yozora/link-definition]: https://yozora.guanghechen.com/docs/package/tokenizer-link-definition
[yozora/list]: https://yozora.guanghechen.com/docs/package/tokenizer-list
[yozora/list-item]: https://yozora.guanghechen.com/docs/package/tokenizer-list-item
[yozora/paragraph]: https://yozora.guanghechen.com/docs/package/tokenizer-paragraph
[yozora/setext-heading]: https://yozora.guanghechen.com/docs/package/tokenizer-setext-heading
[yozora/table]: https://yozora.guanghechen.com/docs/package/tokenizer-table
[yozora/text]: https://yozora.guanghechen.com/docs/package/tokenizer-text
[yozora/thematic-break]: https://yozora.guanghechen.com/docs/package/tokenizer-thematic-break
