import React from 'react'
import type { IMathJaxContext } from './types'
import { MathJaxLanguage } from './types'

export const initialMathJaxContext: IMathJaxContext = {
  MathJax: null,
  language: MathJaxLanguage.TEX,
}

export const MathJaxContextType: React.Context<IMathJaxContext> =
  React.createContext(initialMathJaxContext)
