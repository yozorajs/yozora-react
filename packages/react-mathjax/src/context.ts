import React from 'react'
import type { IMathJaxContext } from './types'
import { TexLang } from './types'

export const initialMathJaxContext: IMathJaxContext = {
  MathJax3: null,
  language: TexLang.TEX,
}

export const MathJaxContextType: React.Context<IMathJaxContext> =
  React.createContext(initialMathJaxContext)
