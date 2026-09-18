import { useDeepCompareMemo, useEventCallback } from '@guanghechen/react-hooks'
import type { EcmaImport as IEcmaImport } from '@yozora/ast'
import type { ICodeRunner, ICodeRunnerScope } from '@yozora/react'
import React from 'react'
import type { IDynamicImportRule } from './lazy'
import { dynamicImport } from './lazy'

interface IJsxRunnerRendererProps {
  code: string
  inline: boolean
  scope?: Readonly<Record<string, unknown>>
  onError(error: string | null): void
}

export interface ICreateUseJsxRunnerParams {
  presetJsxScope: Readonly<ICodeRunnerScope>
  rules: ReadonlyArray<IDynamicImportRule>
  JsxRenderer: React.ComponentType<IJsxRunnerRendererProps>
  defaultRenderMode: 'inline' | 'block'
}

type ScopeState =
  | { status: 'pending' }
  | { status: 'ready'; scope: Readonly<ICodeRunnerScope> }
  | { status: 'error'; message: string }

/** Create a hook whose returned runner owns its asynchronous scope lifecycle. */
export function createUseJsxRunner(
  params: ICreateUseJsxRunnerParams,
): (ecmaImports: IEcmaImport[]) => ICodeRunner {
  const { presetJsxScope, rules, JsxRenderer, defaultRenderMode } = params
  return function useJsxRunner(ecmaImports: IEcmaImport[]): ICodeRunner {
    return useDeepCompareMemo<ICodeRunner>(() => {
      /** Cache one request per import configuration, including StrictMode effect replay. */
      let pending: Promise<Readonly<ICodeRunnerScope>> | undefined
      function loadScope(): Promise<Readonly<ICodeRunnerScope>> {
        pending ??= Promise.resolve()
          .then(async () => {
            const scope: ICodeRunnerScope = { ...presetJsxScope }
            await Promise.all(ecmaImports.map(async item => dynamicImport(item, scope, rules)))
            return scope
          })
          .catch(error => {
            /** A remount may retry failed ordinary-module imports. */
            pending = undefined
            throw error
          })
        return pending
      }

      const JsxRunner: ICodeRunner = props => {
        const { value, onError, meta = {} } = props
        const [state, setState] = React.useState<ScopeState>(() =>
          ecmaImports.length === 0
            ? { status: 'ready', scope: { ...presetJsxScope } }
            : { status: 'pending' },
        )
        const reportError = useEventCallback(onError)

        React.useEffect(() => {
          if (ecmaImports.length === 0) return
          let canceled = false
          void loadScope().then(
            scope => {
              if (!canceled) setState({ status: 'ready', scope })
            },
            error => {
              if (!canceled) {
                setState({
                  status: 'error',
                  message: error instanceof Error ? error.message : String(error),
                })
              }
            },
          )
          return () => {
            canceled = true
          }
        }, [])

        React.useEffect(() => {
          if (state.status === 'error') reportError(state.message)
        }, [state, reportError])

        if (state.status !== 'ready') return null
        return (
          <JsxRenderer
            code={value}
            inline={(meta.jsxmode ?? defaultRenderMode) === 'inline'}
            scope={state.scope}
            onError={onError}
          />
        )
      }

      JsxRunner.displayName = 'YozoraJsxRunner'
      return JsxRunner
    }, [ecmaImports])
  }
}
