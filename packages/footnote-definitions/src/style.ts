import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  margin-top: 4rem;
  border-top: 1px solid var(--color-border-secondary);
  font-size: 0.8rem;

  &::before {
    content: 'footnote-definitions';
    position: absolute;
    top: -1.1rem;
    font-style: italic;
  }

  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .yozora-footnote-definitions__item {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .yozora-footnote-definitions__item-title {
    flex: 0 0 auto;
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .yozora-footnote-definitions__item-content {
    flex: 0 1 auto;
    display: inline-block;
    margin: 0;
    padding: 0;
  }
`
