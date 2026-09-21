import React from 'react'
import { getMermaidAppearance } from './appearance'
import type { IMermaidPalette } from './types'

export type { IMermaidPalette } from './types'

export interface IMermaidRendererProps {
  /** Mermaid diagram source. */
  code: string
  /** Built-in Mermaid theme. Defaults to 'default'. */
  theme?: 'default' | 'dark' | 'forest' | 'neutral' | 'base'
  /** Override the diagram colors, for example with a host application's theme. */
  palette?: IMermaidPalette
  /** Receives an error message, or null after a successful render. */
  onError?(error: string | null): void
  className?: string
  style?: React.CSSProperties
}

interface IRenderQueue {
  pending: Promise<void>
  nextId: number
}

/** Separate bundles share Mermaid configuration and the document's SVG id namespace. */
const QUEUE_KEY = Symbol.for('@yozora/react-embed-mermaid/render')

/** Render on the client; SSR and initial hydration both produce an empty container. */
export function MermaidRenderer(props: IMermaidRendererProps): React.ReactElement {
  const { code, theme = 'default', palette, onError, className, style } = props
  /** Snapshot colors by value so equivalent inline palettes do not restart rendering. */
  const colors = React.useMemo(
    () => (palette ? { ...palette } : undefined),
    [
      palette?.node,
      palette?.border,
      palette?.text,
      palette?.line,
      palette?.surface,
      palette?.group,
    ],
  )
  const rootRef = React.useRef<HTMLDivElement>(null)
  const onErrorRef = React.useRef(onError)
  React.useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let cancelled = false
    let scratch: HTMLDivElement | undefined
    const runtime = globalThis as typeof globalThis & { [QUEUE_KEY]?: IRenderQueue }
    runtime[QUEUE_KEY] ??= { pending: Promise.resolve(), nextId: 0 }
    const queue = runtime[QUEUE_KEY]

    const task = queue.pending.then(async () => {
      if (cancelled) return
      const { default: mermaid } = await import('mermaid')
      /** A cancelled first import must not enable Mermaid's page-wide load handler. */
      mermaid.startOnLoad = false
      if (cancelled) return

      scratch = root.ownerDocument.createElement('div')
      scratch.setAttribute('aria-hidden', 'true')
      scratch.style.cssText = 'position:fixed;left:-100000px;top:0;visibility:hidden'
      root.ownerDocument.body.appendChild(scratch)
      try {
        mermaid.initialize({
          ...getMermaidAppearance(theme, colors),
          startOnLoad: false,
          securityLevel: 'strict',
          suppressErrorRendering: true,
          theme,
        })
        queue.nextId += 1
        const result = await mermaid.render(`yozora-mermaid-${queue.nextId}`, code, scratch)
        if (cancelled) return
        root.innerHTML = result.svg
        result.bindFunctions?.(root)
        return true
      } finally {
        scratch.remove()
      }
    })
    queue.pending = task.then(
      () => {},
      () => {},
    )
    void task.then(
      rendered => {
        if (!cancelled && rendered) onErrorRef.current?.(null)
      },
      (error: unknown) => {
        if (cancelled) return
        root.replaceChildren()
        onErrorRef.current?.(error instanceof Error ? error.message : String(error))
      },
    )

    return () => {
      cancelled = true
      root.replaceChildren()
      scratch?.remove()
    }
  }, [code, theme, colors])

  return (
    <div
      ref={rootRef}
      className={['yozora-code-renderer-mermaid', className].filter(Boolean).join(' ')}
      style={{ width: '100%', textAlign: 'center', ...style }}
    />
  )
}

export default MermaidRenderer
