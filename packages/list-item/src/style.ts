import styled from 'styled-components'

export const Container = styled.li`
  position: relative;
  padding: 0;
  margin: 0;

  &.yozora-list-task-item {
    list-style-type: none;

    > .yozora-list-task-item__checkbox {
      position: absolute;
      // TODO fix vertical align.
      top: 8px;
      left: -1.2rem;
      display: inline-block;
      width: 0.8rem;
      height: 0.8rem;
      line-height: 0.8rem;

      font-variant: tabular-nums;
      font-feature-settings: "tnum";
      white-space: nowrap;
      cursor: not-allowed;
      touch-action: manipulation;
      user-select: none;

      > input {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        margin: 0;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
      }

      > span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #9dafaf;
        border-radius: 2px;
        background-color: var(--list-task-item-bg--todo, #f5f5f5);
        width: 0.8rem;
        height: 0.8rem;

        &::after {
          content: '.';
          display: inline-block;
          border: 0;
          color: transparent;
        }

        &[data-status="doing"]::after {
          background-color: var(--list-task-item-bg--doing, #3399ff);
          width: 0.4rem;
          height: 0.4rem;
        }

        &[data-status="done"] {
          background-color: var(--list-task-item-bg--done, #3399ff);
          border-color: var(--list-task-item-bg--done, #3399ff);
          &::after {
            transform: rotate(45deg) scale(1) translate(-4%, -5%);
            height: 0.5012rem;
            width: 0.2468rem;
            border: 2px solid #fff;
            border-top: 0;
            border-left: 0;
          }
        }
      }
    }
  }
`
