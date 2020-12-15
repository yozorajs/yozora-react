import React from 'react'
import { CodeLive } from '@yozora/react-code-live'
import { CodeRenderer } from './embed'


/**
 * Props for code live
 */
export interface CodeLiveRendererProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents
   */
  value: string
  /**
   *
   */
  args?: Record<string, unknown>
}


/**
 *
 * @param props
 */
export function CodeLiveRenderer(props: CodeLiveRendererProps): React.ReactElement | null {
  const { lang, value } = props

  return (
    <CodeLive
      lang={ lang }
      value={ value }
      CodeRenderer={ CodeRenderer }
    />
  )
}


CodeLiveRenderer.displayName = 'CodeLiveRenderer'
export default CodeLiveRenderer
