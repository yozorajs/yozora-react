import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import type { EcmaImport as IEcmaImport } from '@yozora/ast'
import type { ICodeRendererJsxProps } from '@yozora/react-code-renderer-jsx'
import React from 'react'
import type { IAsyncRunnerScopes, ICodeRunner, ICodeRunnerScope } from '../types'
import { CodeRunnerPropTypes } from '../types'
import type { IDynamicImportRule } from './lazy'
import { dynamicImport } from './lazy'

export interface ICreateUseJsxRunnerParams {
  presetJsxScope: Readonly<ICodeRunnerScope> // preset jsx scopes
  rules: ReadonlyArray<IDynamicImportRule> // dynamic import rules (webpack required)
  JsxRenderer: React.ComponentType<ICodeRendererJsxProps> // jsx renderer
  defaultRenderMode: 'inline' | 'block' // default jsx render mode: block / inline.
}

/**
 * Create a jsx live code runner creator.
 */
export function createUseJsxRunner(
  params: ICreateUseJsxRunnerParams,
): (ecmaImports: IEcmaImport[]) => ICodeRunner {
  const { presetJsxScope, rules, JsxRenderer, defaultRenderMode } = params
  return function useJsxRunner(ecmaImports: IEcmaImport[]): ICodeRunner {
    const { scope, pending, Placeholders } = useDeepCompareMemo<IAsyncRunnerScopes>(() => {
      const scope: ICodeRunnerScope = { ...presetJsxScope }
      const Placeholders: Array<React.FC | React.ComponentClass> = []
      const tasks: Array<Promise<void>> = []

      for (const ecmaImport of ecmaImports) {
        const task: Promise<void> | null = dynamicImport(ecmaImport, scope, Placeholders, rules)
        if (task === null) continue
        tasks.push(task)
      }

      return {
        scope,
        pending: tasks.length <= 0 ? true : Promise.all(tasks),
        Placeholders,
      }
    }, [ecmaImports])

    // Whether if the async runner scopes prepared.
    const [prepared, setPrepared] = React.useState<boolean>(pending === true)

    // Trigger re-render if the async runner scopes prepared.
    React.useEffect(() => {
      if (pending === true) return

      let canceled = false
      void pending.then(() => !canceled && setPrepared(true))
      return () => {
        canceled = true
      }
    }, [pending])

    return React.useMemo<ICodeRunner>(() => {
      const JsxRunner: ICodeRunner = props => {
        const { value, onError, meta = {} } = props
        const inline = (meta.jsxmode ?? defaultRenderMode) === 'inline'

        // Render the loadable component to trigger the dynamic-import loading.
        if (!prepared) {
          return (
            <React.Fragment>
              {Placeholders.map((Placeholder, key) => (
                <Placeholder
                  key={key}
                  className="hidden"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              ))}
            </React.Fragment>
          )
        }

        return <JsxRenderer code={value} inline={inline} scope={scope} onError={onError} />
      }

      JsxRunner.displayName = 'YozoraJsxRunner'
      JsxRunner.propTypes = CodeRunnerPropTypes
      return JsxRunner
    }, [scope, prepared, Placeholders])
  }
}
