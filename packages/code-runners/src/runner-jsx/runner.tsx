import { useDeepCompareMemo } from '@guanghechen/react-hooks'
import type { EcmaImport } from '@yozora/ast'
import type { CodeRendererJsxProps } from '@yozora/react-code-renderer-jsx'
import React, { useEffect, useMemo, useState } from 'react'
import type {
  AsyncRunnerScopes,
  CodeRunner,
  CodeRunnerScope,
  ReactComponent,
} from '../types'
import { CodeRunnerPropTypes } from '../types'
import type { DynamicImportRule } from './lazy'
import { dynamicImport } from './lazy'

/**
 * Create a jsx live code runner creator.
 *
 * @param presetJsxScope      preset jsx scopes
 * @param rules               dynamic import rules (webpack required)
 * @param JsxRenderer         jsx renderer
 * @param defaultRenderMode   default jsx render mode: block / inline.
 * @returns
 */
export function createUseJsxRunner(
  presetJsxScope: Readonly<CodeRunnerScope>,
  rules: ReadonlyArray<DynamicImportRule>,
  JsxRenderer: ReactComponent<CodeRendererJsxProps>,
  defaultRenderMode: 'inline' | 'block',
): (ecmaImports: EcmaImport[]) => CodeRunner {
  return function useJsxRunner(ecmaImports: EcmaImport[]): CodeRunner {
    const { scope, pending, Placeholders } =
      useDeepCompareMemo<AsyncRunnerScopes>(() => {
        const scope: CodeRunnerScope = { ...presetJsxScope }
        const Placeholders: Array<React.FC | React.ComponentClass> = []
        const tasks: Array<Promise<void>> = []

        for (const ecmaImport of ecmaImports) {
          const task: Promise<void> | null = dynamicImport(
            ecmaImport,
            scope,
            Placeholders,
            rules,
          )
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
    const [prepared, setPrepared] = useState<boolean>(pending === true)

    // Trigger re-render if the async runner scopes prepared.
    useEffect(() => {
      if (pending === true) return

      let canceled = false
      void pending.then(() => !canceled && setPrepared(true))
      return () => {
        canceled = true
      }
    }, [pending])

    return useMemo<CodeRunner>(() => {
      const JsxRunner: CodeRunner = props => {
        const { value, onError, meta = {} } = props
        const inline = (meta.renderMode ?? defaultRenderMode) === 'inline'

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

        return (
          <JsxRenderer
            code={value}
            inline={inline}
            scope={scope}
            onError={onError}
          />
        )
      }

      JsxRunner.displayName = 'YozoraJsxRunner'
      JsxRunner.propTypes = CodeRunnerPropTypes
      return JsxRunner
    }, [scope, prepared, Placeholders])
  }
}
