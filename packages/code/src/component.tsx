import CodeEmbed from '@yozora/react-code-embed'
import CodeLiteral from '@yozora/react-code-literal'
import CodeLive from '@yozora/react-code-live'
import JsxRenderer from '@yozora/react-code-renderer-jsx'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import type { CodeProps, CodeRunnerItem, CodeRunnerProps } from './types'
import { parseCodeMeta } from './util'

const defaultRunners: CodeRunnerItem[] = [
  {
    title: 'jsx',
    pattern: /^jsx$/,
    runner: function JsxRunner(props: CodeRunnerProps): React.ReactElement {
      const { value, scope, onError } = props
      return (
        <JsxRenderer
          code={value}
          inline={true}
          scope={scope}
          onError={onError}
        />
      )
    },
  },
]

/**
 * Render yozora `code`.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export function Code(props: CodeProps): React.ReactElement {
  const { lang, value, meta = '', runners: _runners, className, style } = props

  const runners = useMemo<CodeRunnerItem[]>(
    () => [...(_runners ?? []), ...defaultRunners],
    [_runners],
  )
  const { highlightLinenos, maxLines, mode, title, collapsed } =
    parseCodeMeta(meta)

  // Remove trailing line endings.
  const formattedValue = value.trim()

  let result: React.ReactElement | null = null
  if (lang != null) {
    switch (mode) {
      case 'live': {
        result = (
          <CodeLive
            lang={lang}
            value={formattedValue}
            runners={runners}
            title={title}
            maxLines={maxLines}
            collapsed={collapsed}
            className={className}
            style={style}
          />
        )
        break
      }
      case 'embed': {
        const runner = runners.find(item => item.pattern.test(lang))
        if (runner != null) {
          result = (
            <CodeEmbed
              lang={lang}
              value={formattedValue}
              CodeRunner={runner.runner}
              className={className}
              style={style}
            />
          )
        }
        break
      }
    }
  }

  return (
    result || (
      <CodeLiteral
        lang={lang}
        value={formattedValue}
        title={title}
        highlightLinenos={highlightLinenos}
        maxLines={maxLines}
        collapsed={collapsed}
        className={className}
        style={style}
      />
    )
  )
}

Code.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.string,
  runners: PropTypes.array,
  value: PropTypes.string.isRequired,
}

Code.displayName = 'YozoraCode'
