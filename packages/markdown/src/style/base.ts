import { css } from 'styled-components'

/**
 * CSS variables
 *
 *  * Colors
 *
 *    // background colors
 *    --color-bg-primary
 *    --color-bg-secondary
 *    --color-bg-tertiary
 *
 *    // border colors
 *    --color-border-primary
 *    --color-border-secondary
 *    --color-border-tertiary
 *
 *    // text colors
 *    --color-text-primary
 *    --color-text-secondary
 *    --color-text-tertiary
 *
 *    // box sizing
 *    --margin-block-node
 *
 *  * Customized styles
 *
 *    // Admonition styles
 *    --admonition-border-width
 *    --admonition-note-color-border
 *    --admonition-note-bg
 *    --admonition-info-color-border
 *    --admonition-info-bg
 *    --admonition-tip-color-border
 *    --admonition-tip-bg
 *    --admonition-caution-color-border
 *    --admonition-caution-bg
 *    --admonition-danger-color-border
 *    --admonition-danger-bg
 *
 *    // Code styles
 *    --code-bg-primary
 *    --code-bg-highlight
 *    --code-bg-selection
 *    --code-color-border
 *    --code-font-family
 *    --code-font-size
 *
 *    // Delete styles
 *     --delete-color: #acb2b9
 *
 *    // Heading styles
 *    --heading-font-family
 *
 *    // Image styles
 *    --image-color-border
 *
 *    // Link styles
 *    --link-color
 *    --link-color-hover
 *    --link-color-active
 *
 *    // List task item styles
 *     --list-task-item-bg--todo
 *     --list-task-item-bg--doing
 *     --list-task-item-bg--done
 *
 *    // Math styles
 *    --math-color
 *
 *    // Table styles
 *    --table-bg-thead
 *    --table-bg-row
 *    --table-bg-row-even
 *    --table-color-border
 */

export const BaseCss = css`
  .yozora-admonition {
    padding: 1em;
    border-left: var(--admonition-border-width) solid transparent;
    border-radius: 6px;
    margin: var(--margin-block-node);
    box-shadow: 0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1);

    .yozora-admonition__heading {
      display: flex;
      align-items: flex-start;
      line-height: 1.6;
      font-size: 0.857rem;
      margin: 0 0 8px 0;
      vertical-align: middle;
      text-rendering: optimizelegibility;
      text-size-adjust: 100%;
      text-transform: uppercase;
      overflow-wrap: break-word;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
      .yozora-admonition__heading-icon {
        > svg:first-child path {
          fill: currentColor;
        }
        margin-right: 0.5rem;
      }
      .yozora-admonition__heading-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }
    .yozora-admonition__body {
      display: block;
    }

    &.yozora-admonition--note {
      border-right: 1px solid hsla(0deg, 0%, 0%, 0.1);
      border-color: var(--admonition-note-color-border);
      background-color: var(--admonition-note-bg);
      .yozora-admonition__heading {
        color: var(--admonition-note-color-border);
        .yozora-math,
        .yozora-inline-math {
          color: inherit;
        }
      }
    }
    &.yozora-admonition--info {
      border-color: var(--admonition-info-color-border);
      background-color: var(--admonition-info-bg);
      .yozora-admonition__heading {
        color: var(--admonition-info-color-border);
      }
    }
    &.yozora-admonition--tip {
      border-color: var(--admonition-tip-color-border);
      background-color: var(--admonition-tip-bg);
      .yozora-admonition__heading {
        color: var(--admonition-tip-color-border);
      }
    }
    &.yozora-admonition--caution {
      border-color: var(--admonition-caution-color-border);
      background-color: var(--admonition-caution-bg);
      .yozora-admonition__heading {
        color: var(--admonition-caution-color-border);
      }
    }
    &.yozora-admonition--danger {
      border-color: var(--admonition-danger-color-border);
      background-color: var(--admonition-danger-bg);
      .yozora-admonition__heading {
        color: var(--admonition-danger-color-border);
      }
    }
  }

  .yozora-blockquote {
    padding: 0.625em 1em;
    border-left: 0.25em solid #dfe2e5;
    margin: var(--margin-block-node);
    background: #fafaf9;
  }

  .yozora-break {
    box-sizing: border-box;
  }

  .yozora-code-literal,
  .yozora-code-live {
    margin: var(--margin-block-node);
  }

  .yozora-code-renderer-graphviz {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    background: hsla(0deg, 0%, 90%, 0.20);
  }

  .yozora-delete {
    color: var(--delete-color);
    text-decoration: line-through;
  }

  .yozora-emphasis {
    font-style: italic;
    margin: 0 6px 0 2px;
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

  .yozora-heading {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: var(--margin-block-node);
    margin-bottom: 1em;
    line-height: 1.25;
    font-family: var(--heading-font-family);
    .yozora-heading__content {
      flex: 0 1 auto;
      min-width: 0;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      line-height: 1.7;
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

  h1.yozora-heading,
  h2.yozora-heading,
  h3.yozora-heading,
  h4.yozora-heading,
  h5.yozora-heading,
  h6.yozora-heading {
    font-style: normal;
    font-weight: 500;
  }
  h1.yozora-heading,
  h2.yozora-heading {
    padding: 0.3rem 0;
    border-bottom: 1px solid var(--color-border-secondary);
  }
  h1.yozora-heading {
    font-size: 2rem;
  }
  h2.yozora-heading {
    font-size: 1.5rem;
  }
  h3.yozora-heading {
    font-size: 1.25rem;
  }
  h4.yozora-heading {
    font-size: 1rem;
  }
  h5.yozora-heading {
    font-size: 0.875rem;
  }
  h6.yozora-heading {
    font-size: 0.85rem;
  }

  .yozora-html {
    box-sizing: border-box;
  }

  .yozora-image {
    box-sizing: border-box;
    max-width: 100%; // Prevent images from overflowing the container.
    border: 1px solid var(--image-color-border);
    box-shadow: 0px 0px 20px 1px rgba(126,125,150,0.6);
  }

  .yozora-inline-code {
    padding: 1px 4px;
    border-radius: 4px;
    margin: 0;
    background: hsla(210deg, 15%, 60%, 0.15);
    line-height: 1.375;
    color: #d81848;
    font-family: var(--code-font-family);
    font-size: var(--code-font-size, 1rem);
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
    margin: 0 0 1em 2em;
    line-height: 2;
  }

  .yozora-list-item {
    > .yozora-list {
      margin-left: 1.2em;
    }
  }

  .yozora-math {
    overflow: auto;
    border: none;
    margin: 0 0 1em;
    color: var(--math-color);
    background: transparent;
  }

  .yozora-paragraph {
    overflow: auto hidden;
    padding: 0;
    margin: var(--margin-block-node);
    margin-bottom: 1em;
    line-height: 2;
    hyphens: auto;
    word-break: normal;
    overflow-wrap: break-word;
    // line-break: anywhere;
    &.yozora-paragraph--display {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
    }

    + .yozora-math {
      margin-top: -1em;
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
    border: 1px solid var(--table-color-border);
    margin: 0 auto 1.25em;
    line-height: 1.6;

    .yozora-table__thead {
      background-color: var(--table-bg-thead);
      border-bottom: 1px solid #f0f0f0;
    }
    .yozora-table__thead th,
    .yozora-table__tbody td {
      padding: 0.5rem 1rem;
      border-left: 1px solid var(--table-color-border);
    }
    .yozora-table__thead th {
      word-break: normal;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .yozora-table__thead th:first-child,
    .yozora-table__tbody td:first-child {
      border-left: none;
    }
    .yozora-table__tbody {
      tr {
        border-top: 1px solid var(--table-color-border);
        background-color: var(--table-bg-row-odd, var(--color-bg-primary));
        &:nth-child(2n) {
          background-color: var(--table-bg-row-even, var(--color-bg-tertiary));
        }
      }
    }
  }

  .yozora-text {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
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
