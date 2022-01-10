import type { IGraphvizRendererProps } from '@yozora/react-code-renderer-graphviz'
import type { Engine } from 'd3-graphviz'
import React from 'react'
import type { ICodeRunner } from './types'
import { CodeRunnerPropTypes } from './types'

/**
 * Create a graphviz live code runner.
 * @param MathRenderer
 * @returns
 */
export function createGraphvizRunner(
  GraphvizRenderer: React.ComponentType<IGraphvizRendererProps>,
): ICodeRunner {
  const GraphvizRunner: ICodeRunner = props => {
    const { value, meta = {}, onError } = props
    return <GraphvizRenderer code={value} engine={meta.engine as Engine} onError={onError} />
  }

  GraphvizRunner.displayName = 'YozoraGraphvizRunner'
  GraphvizRunner.propTypes = CodeRunnerPropTypes
  return GraphvizRunner
}
