export interface MathJax {
  Hub: {
    Config(options: MathJaxConfig): void
    Register: {
      StartupHook: any
      MessageHook: any
    }
    processSectionDelay?: number
    [key: string]: any
  }
}
export type MathJaxConfig = any

export interface MathJaxProviderProps {
  /**
   * Sub components.
   */
  children?: React.ReactNode
  /**
   * Contents / Animation displayed at waiting MathJax loading.
   * @default null
   */
  loading?: React.ReactNode
  /**
   * http / https url for loading mathjax.
   * @default 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
   */
  mathjaxSrc?: string
  /**
   * Mathjax config
   */
  mathjaxConfig?: MathJaxConfig
  /**
   * Mathjax options.
   */
  mathjaxOptions?: {
    /**
     * Delay between updates.
     * @default 0
     */
    processSectionDelay?: number
    /**
     * Type of the formula string.
     * @default 'tex'
     */
    language?: 'tex' | 'asciimath'
  }
  /**
   * Triggered on mathjax loaded.
   * @param MathJax
   */
  onLoad?(MathJax: MathJax): void
  /**
   * Triggered on mathjax thrown an error.
   *
   * @param MathJax
   * @param error
   */
  onError?(MathJax: MathJax, error: any): void
}

export interface MathJaxProviderState {
  /**
   * Indicates whether MathJax is loaded
   */
  loaded: boolean
  /**
   * MathJax context
   */
  context: MathJaxContextValue
}

export interface MathJaxContextValue {
  /**
   * Type of the formula string.
   */
  language: 'tex' | 'asciimath'
  /**
   * MathJax instance.
   */
  MathJax: MathJax | null
}
