import loadable from '@loadable/component'
import type { EcmaImport as IEcmaImport } from '@yozora/ast'
import type { ICodeRunnerScope } from '@yozora/core-react-types'

// Dynamic import func.
export type IDynamicImportFunc = (props: unknown) => Promise<any>

/**
 * Rule indicate how to load the dynamic import.
 */
export interface IDynamicImportRule {
  /**
   * Matcher to test the imported module name.
   */
  regex: RegExp
  /**
   * Ecma import function, such as: `() => import('react')`
   * @param match
   * @see https://loadable-components.com/docs/dynamic-import/#use-a-dynamic-property
   */
  importFunc(match: RegExpExecArray): IDynamicImportFunc
}

export function dynamicImport(
  ecmaImport: Readonly<IEcmaImport>,
  nextCustomScopes: ICodeRunnerScope,
  Placeholders: React.ComponentType[],
  rules: ReadonlyArray<IDynamicImportRule>,
): Promise<void> | null {
  const { moduleName, defaultImport, namedImports } = ecmaImport
  const rule = rules.find(rule => rule.regex.test(moduleName))

  // No valid dynamic import rule found.
  if (rule == null) return null

  const importFunc: IDynamicImportFunc = rule.importFunc(rule.regex.exec(moduleName)!)

  if (/\.[jt]sx$/.test(moduleName)) {
    /**
     * @see https://github.com/gregberge/loadable-components/pull/483
     * @see https://loadable-components.com/docs/api-loadable-component/#optionsresolvecomponent
     */
    if (defaultImport != null) {
      // eslint-disable-next-line no-param-reassign
      nextCustomScopes[defaultImport] = loadable(importFunc, {
        cacheKey: () => moduleName + '__default',
      })
    }

    for (const { src: srcName, alias: aliasName } of namedImports) {
      const key = aliasName ?? srcName
      // eslint-disable-next-line no-param-reassign
      nextCustomScopes[key] = loadable(importFunc, {
        cacheKey: () => moduleName + '__' + srcName,
        resolveComponent: components => components[srcName],
      })
    }
    return null
  }

  if (/\.[jt]s$/.test(moduleName)) {
    return new Promise(resolve => {
      const Placeholder = loadable(importFunc, {
        cacheKey: () => moduleName,
        resolveComponent: module => {
          if (defaultImport != null) {
            // eslint-disable-next-line no-param-reassign
            nextCustomScopes[defaultImport] = module
          }
          for (const { src: srcName, alias } of namedImports) {
            // eslint-disable-next-line no-param-reassign
            nextCustomScopes[alias ?? srcName] = module[srcName]
          }
          resolve()
          return 'div' as any
        },
      })
      Placeholders.push(Placeholder as React.ComponentType)
    })
  }

  // fallback.
  throw new TypeError(
    `Cannot find module ${moduleName}. (A .ts / .tsx / .js / .jsx suffix is required)`,
  )
}
