import type { MathJaxConfig, MathJaxObject } from '@mathjax/src/js/components/startup.js'

export enum TexLang {
  MML = 'MathML',
  TEX = 'TeX',
}

export type IMathJax = MathJaxObject
export type IMathJaxConfig = MathJaxConfig

/** @deprecated Use `IMathJax` instead. */
export type IMathJax3 = IMathJax

/** @deprecated Use `IMathJaxConfig` instead. */
export type IMathJaxConfig3 = IMathJaxConfig

export interface IMathJaxContext {
  MathJax: IMathJax | null
  language: TexLang // Type of the formula string.
}
