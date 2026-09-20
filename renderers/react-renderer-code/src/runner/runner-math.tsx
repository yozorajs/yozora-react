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
    const source = props.value.trim()
    const delimiter = /^\$+/.exec(source)?.[0]
    const value =
      delimiter && source.length >= delimiter.length * 2 && source.endsWith(delimiter)
        ? source.slice(delimiter.length, -delimiter.length).trim()
        : source
    return <MathRenderer type={MathType} value={value} />
  }

  MathRunner.displayName = 'YozoraMathRunner'
  return MathRunner
}
