import cn from 'clsx'
import type { Engine, GraphvizOptions } from 'd3-graphviz'
import { graphviz } from 'd3-graphviz'
import React, { useEffect, useRef } from 'react'

export interface GraphvizRendererProps {
  /**
   * Source code in  Graphviz DOT Syntax.
   * @see https://graphviz.org/doc/info/lang.html
   */
  code: string
  /**
   * Sets the Graphviz layout engine name to the specified engine string.
   * @default 'dot'
   */
  engine?: Engine
  /**
   * Options to pass to the d3-graphviz.
   */
  options?: GraphvizOptions
  /**
   * CSS class name.
   */
  className?: string
  /**
   * Error callback
   */
  onError?(error: string | null): void
}

export function GraphvizRenderer(
  props: GraphvizRendererProps,
): React.ReactElement {
  const { code, engine = 'dot', options, onError, className } = props
  const graphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (graphRef.current == null) return

    graphviz(graphRef.current)
      .onerror(onError)
      .options({
        fit: true,
        zoom: false,
        ...options,
      })
      .engine(engine)
      .renderDot(code)
  }, [code, options, engine, onError])

  return (
    <div
      ref={graphRef}
      className={cn('yozora-code-renderer-graphviz', className)}
    />
  )
}

GraphvizRenderer.displayName = 'GraphvizRenderer'
export default GraphvizRenderer
