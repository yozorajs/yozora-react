import CodeEmbed from '@yozora/react-code-embed'
import CodeLiteral from '@yozora/react-code-literal'
import CodeLive from '@yozora/react-code-live'
import JsxRenderer from '@yozora/react-code-renderer-jsx'
import type { ICodeRunnerItem, ICodeRunnerProps } from '@yozora/react-code-runners'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import type { ICodeMetaData, ICodeProps } from './types'
import { parseCodeMeta } from './util'

export const defaultRunners: ICodeRunnerItem[] = [
  {
    title: 'jsx',
    pattern: /^jsx$/,
    runner: function JsxRunner(props: ICodeRunnerProps): React.ReactElement {
      const { value, scope, onError, meta = {} } = props
      const inline = meta.jsxMode == null || meta.jsxMode === 'inline'

      return <JsxRenderer code={value} inline={inline} scope={scope} onError={onError} />
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
export const Code: React.FC<ICodeProps> = props => {
  const {
    lang,
    value,
    meta: infoString,
    runners = defaultRunners,
    darken,
    preferLineNo = true,
    className,
    style,
  } = props

  const meta = useMemo<ICodeMetaData>(
    () => parseCodeMeta(infoString ?? '', { preferLineNo }),
    [infoString, preferLineNo],
  )
  const { _yozoracodemode, highlights, maxlines, title, collapsed, showlineno: showLineNo } = meta

  let result: React.ReactElement | null = null
  if (lang != null) {
    switch (_yozoracodemode) {
      case 'live': {
        result = (
          <CodeLive
            lang={lang}
            value={value}
            meta={meta}
            runners={runners}
            title={title}
            maxLines={maxlines}
            collapsed={collapsed}
            showLinenos={showLineNo}
            darken={darken}
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
              value={value}
              meta={meta}
              runner={runner.runner}
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
        value={value}
        title={title}
        highlightLinenos={highlights}
        maxLines={maxlines}
        collapsed={collapsed}
        showLineNo={showLineNo}
        darken={darken}
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
  darken: PropTypes.bool,
  preferLineNo: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Code.displayName = 'YozoraCode'
export default Code