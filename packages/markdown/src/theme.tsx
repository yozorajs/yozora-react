import type { DefaultTheme } from 'styled-components'


const fontFamily = {
  primary: `
    lucida grande, lucida sans unicode, lucida, Hiragino Sans GB, Helvetica Neue,
    Microsoft Yahei, WenQuanYi Micro Hei, sans-serif`,
  heading: `
    Comic Sans MS, lucida grande, lucida sans unicode, lucida, Hiragino Sans GB,
    Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif`,
  code: `
    Consolas, monospace, lucida grande, lucida sans unicode, lucida,
    Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif`
}


const color = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  textTertiary: '#6a737d',
  borderPrimary: '#e1e4e8',
  borderSecondary: '#eaecef',
  borderTertiary: '#d1d5da',
  backgroundPrimary: '#fff',
  backgroundSecondary: '#fafbfc',
  backgroundTertiary: '#f6f8fa',
  link: '#0366d6',
  linkHover: '#0366d6',
  math: 'hsl(220, 100%, 32%)',
}


export const defaultTheme: DefaultTheme = {
  yozora: {
    blockquote: {
      borderColor: 'var(--md-blockquote-border-color, #dfe2e5)',
      background: 'var(--md-blockquote-bg-color, #fafaf9)',
      padding: 'var(--md-blockquote-padding, 0.625em 1em)',
      margin: 'var(--md-blockquote-margin, 0 0 1.25em)'
    },
    code: {
      padding: 'var(--md-code-padding, 0)',
      border: 'var(--md-code-border, none)',
      margin: 'var(--md-code-margin, 0)',
      lineHeight: 'var(--md-code-line-height, 1.33)',
      background: 'var(--md-code-background, none)',
      fontFamily: `var(--md-code-font-family, ${ fontFamily.code })`,
      selectionBackground: 'var(--md-code-selection-background, hsla(200deg, 30%, 70%, 0.3))',
    },
    codeEmbed: {
      padding: 'var(--md-code-embed-padding, 0)',
      border: 'var(--md-code-embed-border, none)',
      background: 'var(--md-code-embed-background, transparent)',
      color: 'var(--md-code-embed-color, inherit)',
      errorBackground: 'var(--md-code-embed-error-background, #ff5555)',
      errorColor: 'var(--md-code-embed-error-color, #f8f8f8)',
      errorFontSize: 'var(--md-code-embed-error-font-size, 0.9em)',
      errorFontFamily: 'var(--md-code-embed-error-font-family, Consolas, "Source Code Pro", monospace, sans-serif)',
    },
    codeLive: {
      margin: 'var(--md-code-live-margin, 0 0 1rem)',
      editorPadding: 'var(--md-code-live-editor-padding, 0.8rem 0)',
      editorBackground: 'var(--md-code-live-editor-background, #1e1e1e)',
      editorCaretColor: 'var(--md-code-live-editor-caret-color, #aeafad)',
      editorFontSize: 'var(--md-code-live-editor-font-size, 1rem)',
      editorFontFamily: 'var(--md-code-live-editor-font-family, Consolas, "Source Code Pro", monospace, sans-serif)',
      editorSelectionBackground: 'var(--md-code-live-editor-selection-background, hsla(200deg, 30%, 70%, 0.3))',
      previewPadding: 'var(--md-code-live-preview-padding, 0)',
      previewBorder: 'var(--md-code-live-preview-border, 1px solid lightgray)',
      previewBackground: 'var(--md-code-live-preview-background, #fff)',
      previewColor: 'var(--md-code-live-preview-color, #000)',
    },
    delete: {
      color: 'var(--md-delete-color, inherit)',
      fontSize: 'var(--md-delete-font-size, 1em)',
      fontStyle: 'var(--md-delete-font-style, inherit)',
      textDecoration: 'var(--md-delete-text-decoration, line-through)',
    },
    emphasis: {
      color: 'var(--md-emphasis-color, inherit)',
      fontSize: 'var(--md-emphasis-font-size, 1em)',
      fontStyle: 'var(--md-emphasis-font-style, italic)',
      fontWeight: 'var(--md-emphasis-font-weight, inherit)',
    },
    heading: {
      padding: 'var(--md-heading-padding, 0 2em)',
      borderColor: `var(--md-heading-border-color, ${ color.borderSecondary })`,
      margin: 'var(--md-heading-margin, 1.2em -2em 1em)',
      color: 'var(--md-heading-color, inherit)',
      lineHeight: 'var(--md-heading-line-height, 1.25)',
      fontFamily: 'var(--md-heading-font-family, normal)',
      fontStyle: `var(--md-heading-font-style, ${ fontFamily.heading })`,
      h1FontSize: 'var(--md-heading1-font-size, 2em)',
      h2FontSize: 'var(--md-heading2-font-size, 1.5em)',
      h3FontSize: 'var(--md-heading3-font-size, 1.25em)',
      h4FontSize: 'var(--md-heading4-font-size, 1em)',
      h5FontSize: 'var(--md-heading5-font-size, 0.875em)',
      h6FontSize: 'var(--md-heading6-font-size, 0.85em)',
      linkColor: 'var(--md-heading-link-color, inherit)',
      hoverLinkColor: `var(--md-heading-link-color, ${ color.linkHover })`,
    },
    inlineCode: {
      padding: 'var(--md-inline-code-padding, 0.2em)',
      borderRadius: 'var(--md-inline-code-border-radius, 2px)',
      margin: 'var(--md-inline-code-margin, 0)',
      background: 'var(--md-inline-code-background, hsla(210deg, 13%, 12%, 0.05))',
      lineHeight: 'var(--md-inline-code-font-line-height, 1.375)',
      color: 'var(--md-inline-code-color, #d81848)', // #14a2b6
      fontFamily: `var(--md-inline-code-font-family, ${ fontFamily.code })`,
      fontSize: 'var(--md-inline-code-font-size, 1em)',
      fontWeight: 'var(--md-inline-code-font-weight, 500)',
      fontStyle: 'var(--md-inline-code-font-style, inherit)',
      whiteSpace: 'var(--md-inline-code-font-white-space, normal)',
    },
    inlineMath: {
      padding: 'var(--md-inline-math-padding, 0)',
      border: 'var(--md-inline-math-border, none)',
      margin: 'var(--md-inline-math-margin, 0)',
      background: 'var(--md-inline-math-background, none)',
      color: `var(--md-inline-math-color, ${ color.math })`,
    },
    link: {
      color: `var(--md-link-color, ${ color.link })`,
      fontSize: 'var(--md-link-font-size, inherit)',
      fontStyle: 'var(--md-link-font-style, normal)',
      textDecoration: 'var(--md-link-text-decoration, none)',
    },
    list: {
      padding: 'var(--md-list-padding, 0 0 0 1.2em)',
      margin: 'var(--md-list-margin, 0 0 1em)',
      lineHeight: 'var(--md-list-line-height, 2)',
      color: 'var(--md-list-color, inherit)',
    },
    listItem: {
      padding: 'var(--md-list-item-padding, 0)',
      margin: 'var(--md-list-item-margin, 0 0 0.25em 0.25em)',
      lineHeight: 'var(--md-list-item-line-height, inherit)',
      color: 'var(--md-list-item-color, inherit)',
    },
    math: {
      padding: 'var(--md-math-padding, 0)',
      border: 'var(--md-math-border, none)',
      margin: 'var(--md-math-margin, 0)',
      background: 'var(--md-math-background, none)',
      color: `var(--md-math-color, ${ color.math })`,
    },
    paragraph: {
      padding: 'var(--md-paragraph-padding, 0)',
      margin: 'var(--md-paragraph-margin, 0 0 1em)',
      lineHeight: 'var(--md-paragraph-line-height, 2)',
      color: 'var(--md-paragraph-color, inherit)',
    },
    strong: {
      color: 'var(--md-strong-color, inherit)',
      fontSize: 'var(--md-strong-font-size, 1em)',
      fontWeight: 'var(--md-strong-font-weight, 600)',
      fontStyle: 'var(--md-strong-font-style, inherit)',
    },
    table: {
      width: 'var(--md-table-width, 100%)',
      overflow: 'var(--md-table-overflow, auto)',
      margin: 'var(--md-table-margin, 0 0 1rem)',
      borderSpacing: 'var(--md-table-border-spacing, 0)',
      borderCollapse: 'var(--md-table-border-collapse, collapse)',
    },
    tableCell: {
      padding: 'var(--md-table-cell-padding, 0.4rem 0.8rem)',
      borderColor: 'var(--md-table-cell-border-color, #dfe2e5)',
    },
    tableRow: {
      background: `var(--md-table-row-background, ${ color.backgroundPrimary })`,
      evenBackground: `var(--md-table-row-even-background, ${ color.backgroundTertiary })`,
    },
    text: {
      lineHeight: 'var(--md-text-line-height, inherit)',
    },
    thematicBreak: {
      borderColor: `var(--md-thematic-break-border-color, ${ color.borderPrimary })`,
      outline: 'var(--md-thematic-break-outline, 0)',
      margin: 'var(--md-thematic-break-margin, 1.5em 0)',
    },
  }
}
