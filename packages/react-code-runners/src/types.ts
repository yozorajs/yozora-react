import PropTypes from 'prop-types'
import type React from 'react'

/**
 * Meta data of a code runner.
 */
export interface ICodeRunnerMetaData {
  /**
   * The render mode of a runner.
   * @default 'inline'
   */
  renderMode?: 'inline' | 'block' | string
  /**
   * Additional attributes.
   */
  [key: string]: unknown
}

/**
 * Code runner accessible context variables.
 */
export type ICodeRunnerScope = Record<string, unknown>

/**
 * Props of CodeRunner
 */
export interface ICodeRunnerProps {
  /**
   * Code language
   */
  lang: string
  /**
   * Source code contents.
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: Readonly<ICodeRunnerMetaData>
  /**
   * Accessible context variables.
   */
  scope?: Readonly<ICodeRunnerScope>
  /**
   * Error callback
   */
  onError(error: string | null): void
}

/**
 * Shape of a code runner.
 */
export type ICodeRunner = React.ComponentType<ICodeRunnerProps>

/**
 * React props types for a code runner.
 */
export const CodeRunnerPropTypes: React.WeakValidationMap<ICodeRunnerProps> = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  meta: PropTypes.any,
  scope: PropTypes.any,
  onError: PropTypes.func.isRequired,
}

/**
 * Code runner item.
 */
export interface ICodeRunnerItem {
  /**
   * Title of the runner.
   */
  title: string
  /**
   * Supported language pattern.
   */
  pattern: RegExp
  /**
   * Code runner.
   */
  runner: ICodeRunner
}

/**
 * Async runner scopes.
 */
export interface IAsyncRunnerScopes {
  /**
   * Code runner scopes.
   */
  scope: Readonly<ICodeRunnerScope>
  /**
   * A promise indicate that whether if the scope prepared.
   */
  pending: Promise<void | void[]> | true
  /**
   * Components wrapped by @loadable/components.
   */
  Placeholders: any[]
}
