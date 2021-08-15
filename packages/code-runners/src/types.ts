import PropTypes from 'prop-types'
import type React from 'react'

// React component type.
// eslint-disable-next-line @typescript-eslint/ban-types
export type ReactComponent<T = {}> = React.FC<T> | React.ComponentClass<T>

/**
 * Meta data of a code runner.
 */
export interface CodeRunnerMetaData {
  /**
   * The render mode of a runner.
   * @default 'inline'
   */
  renderMode?: 'inline' | 'block'
  /**
   * Additional attributes.
   */
  [key: string]: unknown
}

/**
 * Code runner accessible context variables.
 */
export type CodeRunnerScope = Record<string, unknown>

/**
 * Props of CodeRunner
 */
export interface CodeRunnerProps {
  /**
   * Source code contents.
   */
  value: string
  /**
   * Additional data (such as data parsed from info string of FencedCode).
   * @see https://github.github.com/gfm/#info-string
   * @see https://github.github.com/gfm/#example-113
   */
  meta?: Readonly<CodeRunnerMetaData>
  /**
   * Accessible context variables.
   */
  scope?: Readonly<CodeRunnerScope>
  /**
   * Error callback
   */
  onError(error: string | null): void
}

/**
 * Shape of a code runner.
 */
export type CodeRunner =
  | React.FC<CodeRunnerProps>
  | React.ComponentClass<CodeRunnerProps>

/**
 * React props types for a code runner.
 */
export const CodeRunnerPropTypes: React.WeakValidationMap<CodeRunnerProps> = {
  value: PropTypes.string.isRequired,
  meta: PropTypes.any,
  scope: PropTypes.any,
  onError: PropTypes.func.isRequired,
}

/**
 * Code runner item.
 */
export interface CodeRunnerItem {
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
  runner: CodeRunner
}

/**
 * Async runner scopes.
 */
export interface AsyncRunnerScopes {
  /**
   * Code runner scopes.
   */
  scope: Readonly<CodeRunnerScope>
  /**
   * A promise indicate that whether if the scope prepared.
   */
  pending: Promise<void | void[]> | true
  /**
   * Components wrapped by @loadable/components.
   */
  Placeholders: any[]
}
