import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #d3d3d3;

  > .yozora-code-literal__toolbar {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    height: 2rem;
    width: 100%;
    border-bottom: 1px solid var(--code-color-border, hsla(0deg, 0%, 30%, 0.8));
    background: var(--code-bg-color, #1e1e1e);

    .yozora-code-literal__title {
      margin-left: 1rem;
      font-family: var(--code-heading-font-family, 'Comic Sans MS', 'lucida grande', 'lucida sans unicode', lucida, 'Hiragino Sans GB', 'Helvetica Neue', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif);
      font-size: 0.9em;
      color: hsla(0deg, 0%, 90%, 0.8);
    }
    .yozora-code-literal__copy-button {
      position: absolute;
      right: 1rem;
      display: inline-block;
      visibility: hidden;
      opacity: 0;
      transition: opacity .2s ease-in-out;
      user-select: none;
    }
  }

  &:hover {
    .yozora-code-literal__copy-button {
      visibility: visible;
      opacity: 1;
    }
  }
`
