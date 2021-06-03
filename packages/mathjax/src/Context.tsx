import React from 'react'
import type { MathJaxContextValue } from './types'

export const initialMathJaxContextValue: MathJaxContextValue = {
  language: 'tex',
  MathJax: null,
}

export const MathJaxContext: React.Context<MathJaxContextValue> =
  React.createContext(initialMathJaxContextValue)
