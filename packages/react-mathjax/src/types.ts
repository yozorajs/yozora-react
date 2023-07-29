import type {
  MathJaxObject as IMathJax3,
  MathJaxConfig as IMathJaxConfig3,
} from 'mathjax-full/js/components/startup'

export enum TexLang {
  MML = 'MathML',
  TEX = 'TeX',
}

export type { IMathJaxConfig3 }
export type { IMathJax3 }

export interface IMathJaxContext {
  MathJax3: IMathJax3 | null
  language: TexLang // Type of the formula string.
}
