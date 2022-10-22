/**
 * Type of the formula string.
 */
export enum MathJaxLanguage {
  TEX = 'tex',
  ASCIIMATH = 'asciimath',
}

export type IMathJaxConfig = any

export interface IMathJax {
  Hub: {
    Config(options: IMathJaxConfig): void
    Process(element: any, callBack: any): any
    Queue(callBack: any): any
    Reprocess(element: any, callBack: any): any
    Register: {
      StartupHook: any
      MessageHook: any
    }
    UnRegister: {
      StartupHook: any
    }
    processSectionDelay?: number
    [key: string]: any
  }
}

export type IMathJaxRenderCallback = () => void

export interface IMathJaxContext {
  MathJax: IMathJax | null
  // Type of the formula string.
  language: MathJaxLanguage
}
