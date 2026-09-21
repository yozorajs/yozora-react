import { MediaPreview, PreviewIcon } from '@yozora/react-renderer'
import React from 'react'
import type { IMermaidPalette } from './types'

interface IProps {
  ready: boolean
  dark: boolean
  palette?: IMermaidPalette
  children: React.ReactNode
}

interface ISnapshot {
  svg: string
  width: number
  height: number
  dark: boolean
  palette?: IMermaidPalette
}

export function MermaidPreview({ ready, dark, palette, children }: IProps): React.ReactElement {
  const graphRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [snapshot, setSnapshot] = React.useState<ISnapshot | null>(null)

  function open(): void {
    const svg = graphRef.current?.querySelector('svg')
    if (!ready || !svg) return
    const viewBox = svg
      .getAttribute('viewBox')
      ?.trim()
      .split(/[\s,]+/)
      .map(Number)
    const bounds = svg.getBoundingClientRect()
    const width = viewBox?.[2] || bounds.width
    const height = viewBox?.[3] || bounds.height
    if (!Number.isFinite(width + height) || width <= 0 || height <= 0) return
    buttonRef.current?.focus({ preventScroll: true })
    setSnapshot({ svg: svg.outerHTML, width, height, dark, palette })
  }

  return (
    <div className="yozora-mermaid-preview-host" style={{ width: '100%' }}>
      <div
        ref={graphRef}
        tabIndex={-1}
        style={{ cursor: ready ? 'zoom-in' : undefined }}
        onClick={event => {
          if (event.defaultPrevented || (event.target as Element).closest('a, button')) return
          open()
        }}
      >
        {children}
      </div>
      {ready && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 12px 8px' }}>
          <button
            ref={buttonRef}
            type="button"
            aria-label="Open diagram preview"
            onClick={open}
            style={{
              color: palette?.text ?? 'inherit',
              background: 'transparent',
              border: 'none',
              cursor: 'zoom-in',
              padding: '4px 8px',
              font: 'inherit',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <PreviewIcon name="expand" />
          </button>
        </div>
      )}
      {snapshot && (
        <MediaPreview
          source={{
            kind: 'svg',
            svg: snapshot.svg,
            width: snapshot.width,
            height: snapshot.height,
          }}
          dark={snapshot.dark}
          palette={snapshot.palette}
          onClose={() => {
            setSnapshot(null)
            const target = buttonRef.current ?? graphRef.current
            target?.focus({ preventScroll: true })
          }}
        />
      )}
    </div>
  )
}
