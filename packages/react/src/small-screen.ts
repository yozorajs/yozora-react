/** Flat CSS works in every supported browser, including before client hydration. */
export function getSmallScreenStyles(
  suffix = ':where(:not(.yozora-markdown--custom-breakpoint))',
): string {
  const root = '.yozora-markdown' + suffix
  return `
${root} {
  --yozora_fontSizeCode: 12px;
  --yozora_lineHeightCode: calc(12px * 1.6);
  --yozora_paragraphLineHeight: 1.6;
}
${root} .yozora-inline-math,
${root} .yozora-math { font-size: 0.9rem; }
${root} .yozora-code-highlighter__linenos,
${root} .yozora-code-editor__textarea-linenos { display: none; visibility: hidden; }
${root} .yozora-code-literal { border-radius: 8px; overflow: hidden; }
${root} .yozora-code-literal .yozora-list-item > .yozora-paragraph:last-child { margin-bottom: 0.5rem; }
${root} .yozora-code-literal .yozora-paragraph + .yozora-math { margin-top: -1rem; }
${root} .yozora-code-literal .yozora-paragraph + .yozora-list { margin-top: -0.8rem; }
${root} .yozora-code-live { border-radius: 8px; overflow: hidden; }
${root} .yozora-code-live .yozora-code-highlighter__linenos { display: none; visibility: hidden; }
`
}
