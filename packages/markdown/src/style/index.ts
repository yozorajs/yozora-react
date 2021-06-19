import styled from 'styled-components'
import { BaseCss } from './base'

export const Container = styled.div`
  // background colors
  --color-bg-primary: #fff;
  --color-bg-secondary: #fafbfa;
  --color-bg-tertiary: #f6f8fa;

  // border colors
  --color-border-primary: #e1e4e8;
  --color-border-secondary: hsla(216deg, 20%, 80%, 0.92);
  --color-border-tertiary: #d1d5da;

  // text colors
  --color-text-primary: #24292e;
  --color-text-secondary: #586069;
  --color-text-tertiary: #6a737d;

  // box sizing
  --margin-block-node: 0 0 1.25em;

  // Admonition styles
  --admonition-color-default: #ebedf0;
  --admonition-color-info: #54c7ec;
  --admonition-color-success: #00a400;
  --admonition-color-warning: #ffba00;
  --admonition-color-danger: #fa383e;

  // Code styles
  --code-bg-primary: #1e1e1e;
  --code-bg-highlight: hsla(210deg, 100%, 84%, 0.2);
  --code-bg-selection: hsla(200deg, 30%, 70%, 0.3);
  --code-color-border: hsla(0deg, 0%, 30%, 0.8);
  --code-font-family: Consolas, 'Source Code Pro', 'Roboto Mono', monospace, sans-serif;
  --code-font-size: min(1rem, 18px);

  // Heading styles
  --heading-font-family: Comic Sans MS, lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;

  // Link styles
  --link-color: #4682B4;
  --link-color-hover: #5c9fd6;
  --link-color-active: #5c9fd6;

  // Math styles
  --math-color: hsl(220, 100%, 32%);

  // Table styles
  --table-bg-thead: #eff0f0;
  --table-bg-row-odd: #fff;
  --table-bg-row-even: #f6f8fa;
  --table-color-border: #dfe2e5;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-corner {
    display: none;
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

  * {
    box-sizing: border-box;
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
  font-family: lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;
  word-break: break-all;

  ${BaseCss}

  .yozora-admonition__body,
  .yozora-blockquote,
  .yozora-list,
  .yozora-list-item,
  .yozora-paragraph {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`
