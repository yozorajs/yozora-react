import type { PrismTheme } from 'prism-react-renderer'

/**
 * Generated Prism Theme from VSCode .json Themes
 *
 * @see https://github.com/FormidableLabs/prism-react-renderer/blob/95025358684be04865669bb912e8cf6203c1a391/tools/themeFromVsCode/README.md
 */
export const vscLightTheme: PrismTheme = {
  plain: {
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  styles: [
    {
      types: ['comment'],
      style: { color: 'rgb(0, 128, 0)' },
    },
    {
      types: ['builtin'],
      style: { color: 'rgb(0, 112, 193)' },
    },
    {
      types: ['number', 'variable', 'inserted'],
      style: { color: 'rgb(9, 134, 88)' },
    },
    {
      types: ['operator'],
      style: {
        color: 'rgb(0, 0, 0)',
      },
    },
    {
      types: ['constant', 'char'],
      style: { color: 'rgb(129, 31, 63)' },
    },
    {
      types: ['tag'],
      style: { color: 'rgb(128, 0, 0)' },
    },
    {
      types: ['attr-name'],
      style: { color: 'rgb(255, 0, 0)' },
    },
    {
      types: ['deleted', 'string'],
      style: { color: 'rgb(163, 21, 21)' },
    },
    {
      types: ['changed', 'punctuation'],
      style: { color: 'rgb(4, 81, 165)' },
    },
    {
      types: ['function', 'keyword'],
      style: { color: 'rgb(0, 0, 255)' },
    },
    {
      types: ['class-name'],
      style: { color: 'rgb(38, 127, 153)' },
    },
  ],
}

export default vscLightTheme
