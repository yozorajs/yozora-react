import isEqual from '@guanghechen/fast-deep-equal'
import PropTypes from 'prop-types'
import React from 'react'
import { generateElement, renderElementAsync } from './element'

export interface ICodeRendererJsxProps {
  /**
   * Source code content
   */
  code: string
  /**
   * Inline / Block mode
   *
   * - inline: return React.ReactNode directly
   * - block: call `render()` with React.ReactNode explicitly
   */
  inline: boolean
  /**
   * Additional accessible variables
   */
  scope?: Readonly<Record<string, unknown>>
  /**
   * Whether if to enable typescript.
   * @default true
   */
  enabledTypeScript?: boolean
  /**
   * Error callback
   */
  onError(error: string | null): void
}

interface IState {
  Element: React.ElementType | null
}

export class CodeRendererJsx extends React.Component<ICodeRendererJsxProps, IState> {
  public static readonly displayName = 'YozoraCodeRendererJsx'
  public static readonly propTypes = {
    code: PropTypes.string.isRequired,
    inline: PropTypes.bool.isRequired,
    scope: PropTypes.any,
    onError: PropTypes.func.isRequired,
  }

  constructor(props: ICodeRendererJsxProps) {
    super(props)
    this.state = { Element: null }
  }

  public override shouldComponentUpdate(
    nextProps: Readonly<ICodeRendererJsxProps>,
    nextState: IState,
  ): boolean {
    const props = this.props
    const state = this.state
    return (
      state.Element !== nextState.Element ||
      props.code !== nextProps.code ||
      props.inline !== nextProps.inline ||
      !isEqual(props.scope, nextProps.scope)
    )
  }

  public override render(): React.ReactElement {
    const { Element } = this.state
    return Element ? <Element /> : <React.Fragment />
  }

  public override componentDidMount(): void {
    void this.transpile()
  }

  public override componentDidUpdate(prevProps: Readonly<ICodeRendererJsxProps>): void {
    const props = this.props
    if (props.code !== prevProps.code || !isEqual(props.scope, prevProps.scope)) {
      void this.transpile()
    }
  }

  protected transpile(): void {
    const { code, inline, scope = {}, enabledTypeScript = true, onError } = this.props

    const handleError = (error: unknown): void => {
      const errInfo = String(error ?? '')
      onError(errInfo)
      this.setState({ Element: null })
    }

    const handleSuccess = (element: React.ElementType | null): void => {
      onError(null)
      this.setState({ Element: element })
    }

    try {
      if (inline) {
        const element = generateElement({
          code,
          scope: scope,
          enabledTypeScript,
          onError: handleError,
        })
        handleSuccess(element)
      } else {
        // Reset output for async (no inline) evaluation
        this.setState({ Element: null })
        renderElementAsync({
          code,
          scope: scope!,
          enabledTypeScript,
          onError: handleError,
          onSuccess: handleSuccess,
        })
      }
    } catch (error: any) {
      handleError(error)
    }
  }
}
