import type { ICodeRunnerProps } from '@yozora/core-react-types'
import PropTypes from 'prop-types'
import type React from 'react'

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
