import type { ICodeRunner } from '@yozora/react-renderer'
import React from 'react'

type GraphvizEngine = 'circo' | 'dot' | 'fdp' | 'neato' | 'osage' | 'patchwork' | 'twopi'

interface IGraphvizRunnerRendererProps {
  code: string
  engine?: GraphvizEngine
  onError?(error: string | null): void
}

/**
 * Create a graphviz live code runner.
 * @param MathRenderer
 * @returns
 */
export function createGraphvizRunner(
  GraphvizRenderer: React.ComponentType<IGraphvizRunnerRendererProps>,
): ICodeRunner {
  const GraphvizRunner: ICodeRunner = props => {
    const { value, meta = {}, onError } = props
    return (
      <GraphvizRenderer code={value} engine={meta.engine as GraphvizEngine} onError={onError} />
    )
  }

  GraphvizRunner.displayName = 'YozoraGraphvizRunner'
  return GraphvizRunner
}
