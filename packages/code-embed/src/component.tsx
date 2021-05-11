import cn from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Container } from './style'
import type { CodeEmbedProps } from './types'

/**
 * Render yozora `code`
 *
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-indented-code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-fenced-code
 * @see https://www.npmjs.com/package/@yozora/react-code
 * @see https://www.npmjs.com/package/@yozora/react-code-literal
 * @see https://www.npmjs.com/package/@yozora/react-code-live
 */
export function CodeEmbed(props: CodeEmbedProps): React.ReactElement {
  const { lang, value, CodeRunner, className, style } = props
  const [error, setError] = useState<string | null>(null)

  return (
    <Container className={cn('yozora-code-embed', className)} style={style}>
      <CodeRunner lang={lang} value={value} onError={setError} />
      {error != null && (
        <div className={'yozora-code-embed__error-wrapper'}>
          <div className="yozora-code-embed__error">{error}</div>
        </div>
      )}
    </Container>
  )
}

CodeEmbed.displayName = 'YozoraCodeEmbed'
CodeEmbed.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  CodeRunner: PropTypes.oneOfType<any>([PropTypes.elementType, PropTypes.func])
    .isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}
