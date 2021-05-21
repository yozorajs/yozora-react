import CodeLiveEditor from '@yozora/react-code-editor'
import CodeEmbed from '@yozora/react-code-embed'
import CopyButton from '@yozora/react-common-copy-button'
import LightButtons from '@yozora/react-common-light-buttons'
import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { Container } from './style'
import { debounce } from './util'
import type { CodeLiveProps } from './types'

/**
 * Render yozora `code` in live mode.
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-embed
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export function CodeLive(props: CodeLiveProps): React.ReactElement {
  const {
    runners,
    value: _value,
    lang,
    title,
    maxLines,
    collapsed: _collapsed = false,
    className,
    style,
    darken,
    theme,
    autoFocus,
    centerPreviewer = true,
  } = props

  const [vertical, setVertical] = useState<boolean>(true)
  const [value, setValue] = useState<string>(_value)

  const [collapsed, setCollapsed] = useState<boolean>(_collapsed)
  const handleChange = useMemo(() => debounce(setValue, 300), [])

  const runner = runners.find(item => item.pattern.test(lang))

  return (
    <Container className={cn('yozora-code-live', className)} style={style}>
      <div key="toolbar" className="yozora-code-live__toolbar">
        <LightButtons
          key="light-buttons"
          onMinimize={() => setCollapsed(true)}
          onMaximize={() => setCollapsed(false)}
        />
        <span key="title" className="yozora-code-live__title" title={title}>
          {title}
        </span>
        <span key="copy-btn" className="yozora-code-live__copy-button">
          <CopyButton value={value} />
        </span>
      </div>
      <div
        key="main"
        className={cn('yozora-code-live__main', {
          'yozora-code-live__main--vertical': vertical,
        })}
      >
        <div key="editor" className="yozora-code-live__editor">
          <CodeLiveEditor
            lang={lang}
            code={value}
            onChange={handleChange}
            darken={darken}
            theme={theme}
            collapsed={collapsed}
            maxLines={maxLines}
            autoFocus={autoFocus}
          />
        </div>
        {runner != null && (
          <div
            key="previewer"
            className={cn('yozora-code-live__previewer', {
              'yozora-code-live__previewer--center': centerPreviewer,
            })}
          >
            <CodeEmbed lang={lang} value={value} CodeRunner={runner.runner} />
          </div>
        )}
      </div>
    </Container>
  )
}

CodeLive.displayName = 'YozoraCodeLive'
CodeLive.propTypes = {
  autoFocus: PropTypes.bool,
  centerPreviewer: PropTypes.bool,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  darken: PropTypes.bool,
  lang: PropTypes.string.isRequired,
  maxLines: PropTypes.number,
  runners: PropTypes.array.isRequired,
  style: PropTypes.object,
  theme: PropTypes.any,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
}
