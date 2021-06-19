import cn from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { Container } from './style'
import type { YozoraCodeEmbedProps, YozoraCodeEmbedState } from './types'

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
export class YozoraCodeEmbed extends React.Component<
  YozoraCodeEmbedProps,
  YozoraCodeEmbedState
> {
  public static propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    CodeRunner: PropTypes.oneOfType<any>([
      PropTypes.elementType,
      PropTypes.func,
    ]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props: YozoraCodeEmbedProps) {
    super(props)
    this.state = { error: null }
  }

  public override componentDidCatch(error: unknown, info: unknown): void {
    this.setError(error)
    console.error(info)
  }

  public override componentDidUpdate(prevProps: YozoraCodeEmbedProps): void {
    // Clear error when the input value changed.
    if (prevProps.value !== this.props.value) {
      this.setState({ error: null })
    }
  }

  public override render(): React.ReactElement {
    const { lang, value, CodeRunner, className, style } = this.props
    const { error } = this.state

    return (
      <Container
        className={cn(
          'yozora-code-embed',
          { 'yozora-code-embed--has-error': error != null },
          className,
        )}
        style={style}
      >
        <CodeRunner lang={lang} value={value} onError={this.setError} />
        {error != null && (
          <div className={'yozora-code-embed__error-wrapper'}>
            <div className="yozora-code-embed__error">{error as any}</div>
          </div>
        )}
      </Container>
    )
  }

  protected setError = (error: unknown): void => {
    this.setState({ error })
  }
}

export default YozoraCodeEmbed
