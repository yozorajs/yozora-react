import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  overflow: hidden;
  width: 100%;
  padding: 0;
  transition: max-height 0.5s ease-in-out;
  tab-size: 2;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smooth: always;
  white-space: pre;
  word-break: keep-all;
  word-spacing: normal;
  word-wrap: normal;

  .yozora-code-highlighter__line {
    display: block;
    min-width: 100%;
    letter-spacing: inherit;
    line-height: inherit;
    overflow-wrap: inherit;
    tab-size: inherit;
    text-indent: inherit;
    text-rendering: inherit;
    text-transform: inherit;
    white-space: inherit;
    word-break: inherit;
    word-spacing: inherit;
    word-wrap: inherit;
    &.yozora-code-highlighter__line--highlight {
      background: var(--code-bg-highlight, hsla(210deg, 100%, 84%, 0.2));
      border-color: transparent;
    }
  }

  .yozora-code-highlighter__linenos {
    flex: 0 0 auto;
    overflow: hidden;
    padding: 0.5rem 0;
    cursor: default;
    user-select: none;
    text-align: right;
    border-right: 1px solid var(--code-color-border, hsla(0deg, 0%, 30%, 0.8));
    .yozora-code-highlighter__line {
      padding: 0 6px;
    }
  }
  .yozora-code-highlighter__codes {
    flex: 1 1 auto;
    overflow: auto;     // for css compatibility
    overflow: overlay;
    padding: 0.5rem 0;
    .yozora-code-highlighter__line {
      padding: 0 1rem 0 6px;
    }
  }
`
