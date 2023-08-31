import type { Math } from '@yozora/ast'
import { MathType } from '@yozora/ast'
import type { ICodeRunner } from '@yozora/core-react-types'
import React from 'react'
import { CodeRunnerPropTypes } from './types'

/**
 * Create a formula live code runner.
 * @param MathRenderer
 * @returns
 */
export function createMathRunner(MathRenderer: React.ComponentType<Math>): ICodeRunner {
  const MathRunner: ICodeRunner = props => {
    const value = props.value.replace(/^[\s\n]*([$]+)([\s\S]+)*\1[\s\n]*$/, '$2').trim()
    return <MathRenderer type={MathType} value={value} />
  }

  MathRunner.displayName = 'YozoraMathRunner'
  MathRunner.propTypes = CodeRunnerPropTypes
  return MathRunner
}
