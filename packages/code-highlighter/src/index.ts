/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prism } from 'prism-react-renderer'

export * from './component'
export * from './content'
export * from './types'
export { vscDarkTheme } from './theme/vsc-dark'
export { vscLightTheme } from './theme/vsc-light'
export { CodeHighlighter as default } from './component'

/**
 * Enable more prism language support.
 * @see https://github.com/FormidableLabs/prism-react-renderer#faq
 */
function enablePrismLanguages(): void {
  const self: any = typeof global !== 'undefined' ? global : window
  self.Prism = Prism

  // @ts-ignore
  void import('prismjs/components/prism-dot')
  // @ts-ignore
  void import('prismjs/components/prism-visual-basic')
}

enablePrismLanguages()
