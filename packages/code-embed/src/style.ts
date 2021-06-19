import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  border: none;
  padding: 0;
  background: transparent;

  &.yozora-code-embed--has-error {
    color: red;
    border: 1px solid red;
    min-height: 4rem;
  }

  .yozora-code-embed__error-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: auto;
    display: block;
    width: 100%;
    height: 100%;
  }

  .yozora-code-embed__error {
    display: block;
    width: 100%;
    min-height: 100%;
    padding: 0.5rem;
    background: transparent;
    white-space: pre-wrap;
    text-align: left;
  }
`
