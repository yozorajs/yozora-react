import isEqual from '@guanghechen/fast-deep-equal'
import type { Engine, GraphvizOptions } from 'd3-graphviz'
import { graphviz } from 'd3-graphviz'
import PropTypes from 'prop-types'
import React from 'react'

export interface IGraphvizRendererProps {
  /**
   * Source code in  Graphviz DOT Syntax.
   * @see https://graphviz.org/doc/info/lang.html
   */
  code: string
  /**
   * Sets the Graphviz layout engine name to the specified engine string.
   * @default 'dot'
   */
  engine?: Engine
  /**
   * Options to pass to the d3-graphviz.
   */
  options?: GraphvizOptions
  /**
   * Error callback
   */
  onError?(error: string | null): void
}

export class GraphvizRenderer extends React.Component<IGraphvizRendererProps> {
  public static readonly displayName = 'GraphvizRenderer'
  public static readonly propTypes = {
    code: PropTypes.string.isRequired,
    engine: PropTypes.oneOf(['circo', 'dot', 'fdp', 'neato', 'osage', 'patchwork', 'twopi']),
    options: PropTypes.any,
    onError: PropTypes.func,
  }

  protected readonly graphRef: React.RefObject<HTMLDivElement>

  constructor(props: IGraphvizRendererProps) {
    super(props)
    this.graphRef = { current: null }
  }

  public override shouldComponentUpdate(nextProps: IGraphvizRendererProps): boolean {
    const props = this.props
    return (
      props.code !== nextProps.code ||
      props.engine !== nextProps.engine ||
      !isEqual(props.options, nextProps.options)
    )
  }

  public override render(): React.ReactElement {
    const { graphRef } = this
    return <div ref={graphRef} className="yozora-code-renderer-graphviz" />
  }

  public override componentDidMount(): void {
    void this.renderGraphviz()
  }

  public override componentDidUpdate(prevProps: IGraphvizRendererProps): void {
    const props = this.props
    if (
      props.code !== prevProps.code ||
      props.options !== prevProps.options ||
      props.engine !== prevProps.engine
    ) {
      void this.renderGraphviz()
    }
  }

  protected async renderGraphviz(): Promise<void> {
    const { graphRef, onError } = this
    const { code, engine = 'dot', options } = this.props
    if (graphRef.current == null) return

    try {
      graphviz(graphRef.current, {
        fit: true,
        zoom: false,
        useWorker: false,
        ...options,
      })
        .onerror(onError)
        .engine(engine)
        .renderDot(code)
    } catch (error: any) {
      onError?.(error?.stack ?? error?.message ?? error ?? 'Unexpected error occurred!')
    }
  }

  protected readonly onError = (error: string | null): void => {
    this.props.onError?.(error)
  }
}

export default GraphvizRenderer
