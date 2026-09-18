import type { Math as IMath } from '@yozora/ast'
import { MathType } from '@yozora/ast'
import type { ICodeRunner } from '@yozora/react-renderer'
import React from 'react'

/**
 * Create a formula live code runner.
 * @param MathRenderer
 * @returns
 */
export function createMathRunner(MathRenderer: React.ComponentType<IMath>): ICodeRunner {
  const MathRunner: ICodeRunner = props => {
    const value = props.value.replace(/^[\s\n]*([$]+)([\s\S]+)*\1[\s\n]*$/, '$2').trim()
    return <MathRenderer type={MathType} value={value} />
  }

  MathRunner.displayName = 'YozoraMathRunner'
  return MathRunner
}
