import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 2rem;
  font-size: 0.8rem;

  > .yozora-footnote-definitions__title {
    padding: 0;
    border-bottom: 1px solid var(--color-border-secondary);
    margin: 0 0 1rem;
    font-style: italic;
  }

  > .yozora-footnote-definitions__main {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .yozora-footnote-definitions__item {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
    margin: 0;
    .yozora-footnote-definitions__item-title {
      flex: 0 0 auto;
      display: inline-block;
      margin: 0;
      padding: 0;
    }
    .yozora-footnote-definitions__item-content {
      flex: 1 1 auto;
      overflow-x: auto;
      display: inline-block;
      margin: 0;
      padding: 0;
    }
  }
`
