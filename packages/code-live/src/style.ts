import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #d3d3d3;

  > .yozora-code-live__toolbar {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    height: 2rem;
    width: 100%;
    border-bottom: 1px solid var(--code-color-border, hsla(0deg, 0%, 30%, 0.8));
    background: var(--code-bg-primary, #1e1e1e);
    cursor: default;

    .yozora-code-live__title {
      margin-left: 1rem;
      font-family: var(--code-heading-font-family, 'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif);
      font-size: 0.9em;
      color: hsla(0deg, 0%, 90%, 0.8);
      user-select: none;
    }
    .yozora-code-live__copy-button {
      position: absolute;
      right: 1rem;
      display: inline-block;
      visibility: hidden;
      opacity: 0;
      transition: opacity .2s ease-in-out;
      user-select: none;
    }
  }

  > .yozora-code-live__main {
    flex: 1 1 auto;
    /**
     * To avoid the main container overflow at the y-axis, flex-basis will never
     * be shrink shorter less than the min-height (the default value of
     * min-height is *auto*).
     * By the way, set *height: 0px;* also works.
     */
    min-height: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    > .yozora-code-live__editor {
      flex: 1 1 0;
      position: relative;
      box-sizing: border-box;
      overflow: auto;
      padding: 0;
      margin: 0;
      caret-color: #aeafad;
      font-family: var(--code-font-family, 'Consolas, monospace, sans-serif');
      font-size: var(--code-font-size, 1rem);
      background: var(--code-bg-primary, #1e1e1e);
      ::selection {
        background: var(--code-bg-selection, hsla(200deg, 30%, 70%, 0.3));
      }
      > .yozora-code-editor {
        border: none;
        border-radius: 0px;
      }
    }
    > .yozora-code-live__previewer {
      flex: 1 1 0;
      box-sizing: border-box;
      overflow: auto;
      display: block;
      padding: 0;
      margin: 0;
      color: #000;
      background: var(--code-live-previewer-bg, #fff);
      &.yozora-code-live__previewer--center {
        > .yozora-code-embed {
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    &.yozora-code-live__main--vertical {
      flex-direction: column;
      > .yozora-code-live__editor {
        flex: 0 1 auto;
      }
      > .yozora-code-live__previewer {
        flex: 1 0 auto;
      }
    }
  }
  &:hover {
    .yozora-code-live__copy-button {
      visibility: visible;
      opacity: 1;
    }
  }
`
