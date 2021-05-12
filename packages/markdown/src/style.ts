import styled from 'styled-components'

export const Container = styled.div`
  --color-default: #ebedf0;
  --color-info: #54c7ec;
  --color-success: #00a400;
  --color-warning: #ffba00;
  --color-danger: #fa383e;
  --color-text-primary: #24292e;
  --color-text-secondary: #586069;
  --color-text-tertiary: #6a737d;
  --color-border-primary: #e1e4e8;
  --color-border-secondary: hsla(216deg, 20%, 80%, 0.92);
  --color-border-tertiary: #d1d5da;
  --color-border-table: #dfe2e5;
  --color-bg-primary: #fff;
  --color-bg-secondary: #fafbfa;
  --color-bg-tertiary: #f6f8fa;
  --font-family-primary: lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;

  --code-bg-highlight: hsla(210deg, 100%, 84%, 0.2);
  --code-bg-selection: hsla(200deg, 30%, 70%, 0.3);
  --code-color-border: hsla(0deg, 0%, 30%, 0.8);
  --code-font-family: Consolas, monospace, lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;
  --heading-font-family: Comic Sans MS, lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;
  --math-color: hsl(220, 100%, 32%);

  --link-color: #4682B4;
  --link-color-hover: #5c9fd6;
  --link-color-active: #5c9fd6;

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border: 3px solid hsl(0, 0%, 50%);
    background: hsl(0, 0%, 60%);
    border-radius: 4px;
    &:hover {
      border-color: hsl(0, 0%, 70%);
    }
  }

  a {
    color: var(--link-color);
    text-decoration: none;
    &:visited {
      color: var(--link-color);
    }
    &:hover {
      color: var(--link-color-hover);
    }
  }
  color: var(--color-text-tertiary);
  word-break: break-all;

  .yozora-admonition {
    padding: 1em;
    border-radius: 10px;
    margin: 0 0 1.25em;
    background-color: var(--color-default);
    color: #fff;
    .yozora-inline-math,
    .yozora-math {
      color: #fff;
    }
    &.yozora-admonition--info {
      background-color: var(--color-info);
    }
    &.yozora-admonition--success {
      background-color: var(--color-success);
    }
    &.yozora-admonition--warning {
      background-color: var(--color-warning);
    }
    &.yozora-admonition--danger {
      background-color: var(--color-danger);
    }
    .yozora-admonition__heading {
      h5 {
        font-size: 1.2em;
        margin: 0 0 8px 0;
        vertical-align: middle;
      }
      .yozora-text {
        text-transform: uppercase;
      }
    }
    .yozora-admonition__body {
      display: block;
    }
  }

  .yozora-blockquote {
    padding: 0.625em 1em;
    border-left: 0.25em solid #dfe2e5;
    margin: 0 0 1.25em;
    background: #fafaf9;
  }

  .yozora-break {
    box-sizing: border-box;
  }

  .yozora-code {
    position: relative;
    padding: 0 0 0.2rem;
    margin: 1rem 0;
    border-radius: 4px;
    background: #1e1e1e;
    caret-color: #aeafad;
    ::selection {
      background: var(--code-bg-selection);
    }
    > code {
      overflow: auto;
      padding: 0;
      border: none;
      margin: 0;
      font-family: var(--code-font-family);
      font-size: 14px;
      line-height: 1.33;
      background: none;
      text-shadow: 0 1px;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-spacing: normal;
      word-break: break-all;
      word-wrap: break-word;
      letter-spacing: 1px;
      line-height: inherit;
      tab-size: 2;
      > pre {
        margin: 0;
        font-family: var(--code-font-family);
        line-height: inherit;
        code, span {
          line-height: inherit;
        }
        code {
          padding: 0;
          margin: 0;
          background: transparent;
        }
        ::selection {
          background: var(--code-bg-selection);
        }
      }
    }
  }

  .yozora-delete {
    text-decoration: line-through;
  }

  .yozora-emphasis {
    font-style: italic;
    margin-right: 0.4em;
  }

  .yozora-footnote-reference {
    > a {
      display: inline-block;
      line-height: 1.2;
      text-decoration: none;
      &:visited {
        color: var(--link-color);
      }
      &:hover {
        color: var(--link-color-hover);
        transform: scale(1.2);
      }
    }
  }

  .yozora-html {
    box-sizing: border-box;
  }

  .yozora-image {
    box-sizing: border-box;
  }

  .yozora-heading {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0;
    margin: 0 0 1rem;
    line-height: 1.25;
    font-family: var(--heading-font-family);

    h1&, h2&, h3&, h4&, h5&, h6& {
      font-style: normal;
      font-weight: 500;
    }

    h1&, h2& {
      padding: 0.3rem 0;
      border-bottom: 1px solid var(--color-border-secondary);
    }
    h1& {
      font-size: 2rem;
    }
    h2& {
      font-size: 1.5rem;
    }
    h3& {
      font-size: 1.25rem;
    }
    h4& {
      font-size: 1rem;
    }
    h5& {
      font-size: 0.875rem;
    }
    h6& {
      font-size: 0.85rem;
    }
    .yozora-heading__content {
      flex: 0 1 auto;
      min-width: 0;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .yozora-heading__anchor {
      flex: 0 0 3rem;
      padding-left: 0.5rem;
      color: var(--link-color);
      opacity: 0;
      transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
      user-select: none;
      text-decoration: none;
      > svg {
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        fill: currentColor;
      }
    }
    &:hover > .yozora-heading__anchor {
      opacity: 0.8;
    }
    &:hover > .yozora-heading__anchor {
      color: var(--link-color-hover);
      opacity: 1;
    }
  }

  .yozora-inline-code {
    padding: 0.2em;
    border-radius: 2px;
    margin: 0;
    background: hsla(210deg, 13%, 12%, 0.05);
    line-height: 1.375;
    color: #d81848;
    font-family: var(--code-font-family);
    font-size: 1em;
    font-weight: 500;
  }

  .yozora-inline-math {
    padding: 0;
    border: none;
    margin: 0;
    background: none;
    color: var(--math-color);
  }

  .yozora-link {
    padding: 0.2rem 0;
    color: var(--link-color);
    text-decoration: none;
    background: linear-gradient(
      90deg,
      hsla(358deg, 100%, 62%, 0.8),
      hsla(048deg, 100%, 50%, 0.8),
      hsla(196deg, 100%, 53%, 0.8)
    );
    background-size: 0 3px;
    background-repeat: no-repeat;
    background-position: 50% 100%;
    transition: all 0.3s ease-in-out;
    &:visited {
      color: var(--link-color);
    }
    &:hover {
      color: var(--link-color-hover);
      background-size: 100% 3px;
      background-position-x: 0;
    }
  }

  .yozora-list {
    padding: 0;
    margin: 0 0 1em 1.2em;
    line-height: 2;
  }

  .yozora-list-item {
    padding: 0;
    margin: 0 0 0.5em;
    > :first-child {
      margin-bottom: 0;
    }
  }

  .yozora-math {
    border: none;
    color: var(--math-color);
    background: transparent;
  }

  .yozora-paragraph {
    padding: 0;
    margin: 0 0 1em;
    line-height: 2;
    &.yozora-paragraph--display {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
    }
  }

  .yozora-strong {
    font-weight: 600;
  }

  .yozora-table {
    display: block;
    overflow: auto;
    width: max-content;
    max-width: 100%;
    padding: 0;
    border-collapse: collapse;
    border-radius: 6px;
    border-spacing: 0;
    border: 1px solid var(--color-border-table);
    margin: 0 auto 1rem;
    line-height: 1.6;

    .yozora-table__thead {
      background-color: var(--color-bg-table-head);
      border-bottom: 1px solid #f0f0f0;
    }
    .yozora-table__thead th,
    .yozora-table__tbody td {
      padding: 0.5rem 1rem;
      border-left: 1px solid var(--color-border-table);
    }
    .yozora-table__thead th:first-child,
    .yozora-table__tbody td:first-child {
      border-left: none;
    }
    .yozora-table__tbody {
      tr {
        background-color: var(--color-bg-primary);
        border-top: 1px solid var(--color-border-table);
        &:nth-child(2n) {
          background-color: var(--color-bg-tertiary);
        }
      }
    }
  }

  .yozora-text {
    box-sizing: content-box;
  }

  .yozora-thematic-break {
    overflow: hidden;
    display: block;
    box-sizing: content-box;
    height: 0;
    width: 100%;
    padding: 0;
    border: 0;
    border-bottom: 1px solid var(--color-border-primary);
    outline: 0;
    margin: 1.5em 0;
  }
`
