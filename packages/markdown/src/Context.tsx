import React from 'react'

export interface YozoraMarkdownContextData {
  /**
   * Whether if to enable the dark mode.
   */
  darken: boolean
}

export const initialYozoraMarkdownContext: YozoraMarkdownContextData = {
  darken: false,
}

export const YozoraMarkdownContext: React.Context<YozoraMarkdownContextData> =
  React.createContext(initialYozoraMarkdownContext)
