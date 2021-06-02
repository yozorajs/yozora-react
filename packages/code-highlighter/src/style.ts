import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  overflow: hidden;
  padding-bottom: 0.3rem;
  transition: max-height 0.5s ease-in-out;
  tab-size: 2;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smooth: always;
  white-space: pre;
  word-break: keep-all;
  word-spacing: normal;
  word-wrap: normal;

  .yozora-code-highlighter__linenos {
    flex: 0 0 auto;
    overflow: hidden;
    cursor: default;
    user-select: none;
    text-align: right;
    border-right: 1px solid var(--code-color-border, hsla(0deg, 0%, 30%, 0.8));
  }
  .yozora-code-highlighter__codes {
    flex: 1 1 auto;
    overflow: auto;
    ::-webkit-scrollbar-corner {
      display: none;
    }
  }
  .yozora-code-highlighter__line {
    display: block;
    padding: 0 0.6em;
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
`
