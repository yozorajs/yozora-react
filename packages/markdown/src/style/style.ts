import { css } from '@emotion/css'
import { useThemeContext } from '@yozora/react-core'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useStyles = () => {
  const { themeStyle } = useThemeContext()
  return React.useMemo(() => {
    const { colors, effects, fonts, spacing } = themeStyle
    return {
      markdown: css`
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smooth: always;

        .yozora-blockquote {
          box-sizing: border-box;
          padding: 0.625em 1em;
          border-left: 0.25em solid ${colors.border.blockquote};
          margin: ${spacing.margin.blockNode};
          background: ${colors.background.blockquote};
          box-shadow: 0 1px 2px 0 hsla(0deg, 0%, 0%, 0.1);
        }
        .yozora-break {
          box-sizing: border-box;
        }
        .yozora-delete {
          color: ${colors.text.deleted};
          text-decoration: line-through;
        }
        .yozora-emphasis {
          font-style: italic;
          margin: ${spacing.margin.emphasis};
        }
        .yozora-image {
          box-sizing: border-box;
          max-width: 100%; // Prevent images from overflowing the container.
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            flex: 1 0 auto;
            box-sizing: border-box;
            max-width: 100%;
            border: 1px solid ${colors.border.image};
            box-shadow: 0 0 20px 1px rgba(126, 125, 150, 0.6)
          }
          > figcaption {
            text-align: center;
            font-style: italic;
            font-size: 1em;
            color: ${colors.text.imageTitle};
          }
        }
        .yozora-inline-code {
          padding: 1px 4px;
          border-radius: 4px;
          margin: 0;
          background: ${colors.background.inlineCode};
          line-height: 1.375;
          color: ${colors.text.inlineCode};
          font-family: ${fonts.code.family};
          font-size: min(1rem, 18px);
          font-size: 1em;
          font-weight: 500;
        }
        .yozora-inline-math {
          padding: 0;
          border: none;
          margin: 0;
          background: none;
          color: ${colors.text.math}
        }
        .yozora-link {
          padding: 0.2rem 0;
          color: ${colors.text.link};
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
          &:active {
            color: ${effects.active.colors.text.link};
          }
          &:hover {
            color: ${effects.hover.colors.text.link};
            background-size: 100% 3px;
            background-position-x: 0;
          }
          &:visited {
            color: ${effects.visited.colors.text.link};
          }
        }
        .yozora-paragraph {
          overflow: auto hidden;
          padding: 0;
          margin: ${spacing.margin.blockNode};
          margin-bottom: 1em;
          line-height: 1.8;
          hyphens: auto;
          word-break: normal;
          letter-spacing: 1px;
          overflow-wrap: break-word;
        }
        .yozora-strong {
          font-weight: 600
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
          border: 1px solid ${colors.border.table};
          margin: 0 auto 1.25em;
          line-height: 1.6;
          > thead {
            background-color: ${colors.background.tableHead};
            border-bottom: 1px solid #f0f0f0;
          }
          > tbody {
            tr {
              border-top: 1px solid ${colors.border.table};
              background-color: ${colors.background.tableOddRow};
            }
            tr:nth-child(2n) {
              background-color: ${colors.background.tableEvenRow};
            }
          }
          > thead th,
          > tbody td {
            padding: 0.5rem 1rem;
            border-left: 1px solid ${colors.border.table};
          }
          > thead th {
            word-break: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          > thead th:first-child,
          > tbody td:first-child {
            border-left: none;
          }
        }
        .yozora-thematic-break {
          display: block;
          box-sizing: content-box;
          height: 0;
          width: 100%;
          padding: 0;
          border: 0;
          border-bottom: 1px solid ${colors.border.thematicBreak};
          outline: 0;
          margin: ${spacing.margin.thematicBreak};
        }
      `,
    }
  }, [themeStyle])
}
