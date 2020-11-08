import type { PrismTheme } from 'prism-react-renderer'


/**
 * Generated Prism Theme from VSCode .json Themes
 *
 * @see https://github.com/FormidableLabs/prism-react-renderer/blob/95025358684be04865669bb912e8cf6203c1a391/tools/themeFromVsCode/README.md
 */
export const vscDarkPlusTheme: PrismTheme = {
  plain: {
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e'
  },
  styles: [
    {
      types: ['prolog'],
      style: { color: 'rgb(0, 0, 128)' }
    },
    {
      types: ['comment', 'punctuation'],
      style: { color: 'rgb(106, 153, 85)' }
    },
    {
      types: ['builtin'],
      style: { color: 'rgb(79, 193, 255)' }
    },
    {
      types: ['number', 'variable', 'inserted'],
      style: { color: 'rgb(181, 206, 168)' }
    },
    {
      types: ['operator'],
      style: { color: 'rgb(212, 212, 212)' }
    },
    {
      types: ['constant'],
      style: { color: 'rgb(100, 102, 149)' }
    },
    {
      types: ['tag', 'changed', 'function', 'keyword'],
      style: { color: 'rgb(86, 156, 214)' }
    },
    {
      types: ['attr-name'],
      style: { color: 'rgb(156, 220, 254)' }
    },
    {
      types: ['deleted', 'string', 'attr-value'],
      style: { color: 'rgb(206, 145, 120)' }
    },
    {
      types: ['class-name'],
      style: { color: 'rgb(78, 201, 176)' }
    },
    {
      types: ['char'],
      style: { color: 'rgb(209, 105, 105)' }
    },
    {
      types: ['selector'],
      style: { color: 'rgb(215, 186, 125)' }
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: { color: 'rgb(86, 156, 214)' }
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: { color: '#808080' }
    },
  ]
}


export default vscDarkPlusTheme
