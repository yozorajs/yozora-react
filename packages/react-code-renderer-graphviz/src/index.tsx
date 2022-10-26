import type { Engine, GraphvizOptions } from 'd3-graphviz'
import { graphviz } from 'd3-graphviz'
import PropTypes from 'prop-types'
import React from 'react'

export interface IGraphvizRendererProps {
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
   * Error callback
   */
  onError?(error: string | null): void
}

export const GraphvizRenderer: React.FC<IGraphvizRendererProps> = props => {
  const { code, engine = 'dot', options, onError } = props
  const graphRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (graphRef.current == null) return

    try {
      graphviz(graphRef.current, {
        fit: true,
        zoom: false,
        useWorker: false,
        ...options,
      })
        .onerror(onError)
        .engine(engine)
        .renderDot(code)
    } catch (error: any) {
      onError?.(error?.stack ?? error?.message ?? error ?? 'Unexpected error occurred!')
    }
  }, [code, options, engine, onError])

  return <div ref={graphRef} className="yozora-code-renderer-graphviz" />
}

GraphvizRenderer.propTypes = {
  code: PropTypes.string.isRequired,
  engine: PropTypes.oneOf(['circo', 'dot', 'fdp', 'neato', 'osage', 'patchwork', 'twopi']),
  options: PropTypes.any,
  onError: PropTypes.func,
}

GraphvizRenderer.displayName = 'GraphvizRenderer'
export default GraphvizRenderer
