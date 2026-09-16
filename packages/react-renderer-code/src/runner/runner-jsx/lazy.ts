import type { EcmaImport as IEcmaImport } from '@yozora/ast'
import type { ICodeRunnerScope } from '@yozora/react-core'
import type React from 'react'
import { createLazyRenderer } from '../../component/LazyRenderer'

/** A module loader bound to a matched import rule. */
export type IDynamicImportFunc = () => Promise<any>

export interface IDynamicImportRule {
  regex: RegExp
  /** Bind the matched module name to an import() loader. */
  importFunc(match: RegExpExecArray): IDynamicImportFunc
}

/** Prepare lazy component bindings, or load ordinary module bindings directly. */
export function dynamicImport(
  ecmaImport: Readonly<IEcmaImport>,
  nextCustomScopes: ICodeRunnerScope,
  rules: ReadonlyArray<IDynamicImportRule>,
): Promise<void> | null {
  const { moduleName, defaultImport, namedImports } = ecmaImport
  let importFunc: IDynamicImportFunc | undefined
  for (const rule of rules) {
    /** Matching must not depend on, or mutate, a shared global/sticky regex cursor. */
    const match = new RegExp(rule.regex).exec(moduleName)
    if (match) {
      importFunc = rule.importFunc(match)
      break
    }
  }
  if (!importFunc) return null

  const loader = importFunc
  let pending: Promise<any> | undefined
  function load(): Promise<any> {
    pending ??= Promise.resolve().then(loader)
    return pending
  }

  if (/\.[jt]sx$/.test(moduleName)) {
    if (defaultImport != null) {
      // biome-ignore lint/style/noParameterAssign: Imports populate the caller-owned evaluation scope.
      nextCustomScopes[defaultImport] = createLazyRenderer<
        React.ComponentType<Record<string, unknown>>
      >(() => load().then(module => ({ default: module?.default ?? module })))
    }
    for (const { src, alias } of namedImports) {
      // biome-ignore lint/style/noParameterAssign: Imports populate the caller-owned evaluation scope.
      nextCustomScopes[alias ?? src] = createLazyRenderer<
        React.ComponentType<Record<string, unknown>>
      >(() => load().then(module => ({ default: module[src] })))
    }
    return null
  }

  if (/\.[jt]s$/.test(moduleName)) {
    return load().then(module => {
      /** Retain the existing ordinary-module namespace binding for defaultImport. */
      if (defaultImport != null) {
        // biome-ignore lint/style/noParameterAssign: Imports populate the caller-owned evaluation scope.
        nextCustomScopes[defaultImport] = module
      }
      for (const { src, alias } of namedImports) {
        // biome-ignore lint/style/noParameterAssign: Imports populate the caller-owned evaluation scope.
        nextCustomScopes[alias ?? src] = module[src]
      }
    })
  }

  throw new TypeError(
    `Cannot find module ${moduleName}. (A .ts / .tsx / .js / .jsx suffix is required)`,
  )
}
