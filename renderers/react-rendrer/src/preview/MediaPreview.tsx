import React from 'react'
import { clamp, constrainCrop, dragCrop, rotatedSize, sourcePoint } from './geometry'
import type { PreviewIconName } from './icons'
import { PreviewIcon } from './icons'
import type { ICropRect, IPreviewPalette, IPreviewSource } from './types'

export interface IMediaPreviewProps {
  source: IPreviewSource
  title?: string
  dark?: boolean
  palette?: IPreviewPalette
  onClose(): void
  onMaskClick?(): void
}

type Mode = 'pan' | 'crop' | 'stretch'
interface IDrag {
  id: number
  x: number
  y: number
  left: number
  top: number
  crop?: ICropRect
  operation?: 'new' | 'move' | 'nw' | 'ne' | 'sw' | 'se'
}

/** Mount a preview for one source; image edits are local and never modify the source file. */
export function MediaPreview({
  source,
  title = source.kind === 'image' ? 'Image preview' : 'Diagram preview',
  dark = false,
  palette,
  onClose,
  onMaskClick,
}: IMediaPreviewProps): React.ReactElement {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const viewportRef = React.useRef<HTMLElement>(null)
  const frameRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const dragRef = React.useRef<IDrag | null>(null)
  const closedRef = React.useRef(false)
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 })
  const [failed, setFailed] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)
  const [stretch, setStretch] = React.useState({ x: 1, y: 1 })
  const [crop, setCrop] = React.useState<ICropRect | null>(null)
  const [draft, setDraft] = React.useState<ICropRect | null>(null)
  const [mode, setMode] = React.useState<Mode>('pan')
  const [dragging, setDragging] = React.useState(false)
  const [fitMode, setFitMode] = React.useState(true)
  const size = source.kind === 'svg' ? source : imageSize
  const ready = size.width > 0 && size.height > 0 && !failed
  const full = { x: 0, y: 0, width: size.width, height: size.height }
  const area = mode === 'crop' ? full : (crop ?? full)
  const transform = { rotation, stretchX: stretch.x, stretchY: stretch.y }
  const bounds = rotatedSize(area.width, area.height, transform)
  /** Lay SVG out at the target size so the iframe is not magnified as a bitmap. */
  const layoutScale = source.kind === 'svg' ? scale : 1
  const transformScale = source.kind === 'svg' ? 1 : scale

  const fit = React.useCallback((): void => {
    const viewport = viewportRef.current
    if (!viewport || !bounds.width || !bounds.height) return
    const next = Math.min(
      (viewport.clientWidth - 50) / bounds.width,
      (viewport.clientHeight - 50) / bounds.height,
      4,
    )
    if (next > 0) setScale(next)
    viewport.scrollTo(0, 0)
  }, [bounds.width, bounds.height])
  const resizeRef = React.useRef(() => {})
  React.useEffect(() => {
    resizeRef.current = () => {
      if (fitMode) fit()
    }
    if (fitMode) fit()
  }, [fit, fitMode])

  React.useEffect(() => {
    const dialog = dialogRef.current!
    closedRef.current = false
    dialog.showModal()
    closeRef.current?.focus()
    const observer = new ResizeObserver(() => resizeRef.current())
    observer.observe(viewportRef.current!)
    resizeRef.current()
    return () => {
      observer.disconnect()
      closedRef.current = true
      dialog.close()
    }
  }, [])

  const svg = source.kind === 'svg' ? source.svg : undefined
  const [document, setDocument] = React.useState<string>()
  React.useEffect(() => {
    if (svg === undefined) {
      setDocument(undefined)
      return
    }
    /** HTML parsing preserves foreignObject labels, including HTML void elements. */
    const parsed = new DOMParser().parseFromString(svg, 'text/html')
    const root = parsed.body.querySelector(':scope > svg')
    let markup = svg
    if (root && !root.hasAttribute('viewBox')) {
      root.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
      markup = root.outerHTML
    }
    setDocument(
      `<!doctype html><html><head><meta charset="utf-8"><meta name="color-scheme" content="${dark ? 'dark' : 'light'}"><style>:root,:root>body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}:root>body>svg{display:block;width:100%!important;height:100%!important;max-width:none!important}</style></head><body>${markup}</body></html>`,
    )
  }, [svg, dark, size.width, size.height])

  function close(mask = false): void {
    if (closedRef.current) return
    closedRef.current = true
    dialogRef.current?.close()
    if (mask && onMaskClick) onMaskClick()
    else onClose()
  }
  function zoom(next: number): void {
    setFitMode(false)
    setScale(clamp(next, 0.05, 4))
  }
  function reset(): void {
    setRotation(0)
    setStretch({ x: 1, y: 1 })
    setCrop(null)
    setDraft(null)
    setMode('pan')
    setFitMode(true)
    fit()
  }
  function finishDrag(): void {
    dragRef.current = null
    setDragging(false)
  }
  function point(event: React.PointerEvent): { x: number; y: number } {
    const box = frameRef.current!.getBoundingClientRect()
    return sourcePoint(
      (event.clientX - box.left) / scale,
      (event.clientY - box.top) / scale,
      size.width,
      size.height,
      transform,
    )
  }
  function beginDrag(event: React.PointerEvent<HTMLDivElement>): void {
    if (!ready || event.button !== 0) return
    if (mode !== 'crop' && event.pointerType === 'touch') return
    const viewport = viewportRef.current!
    if (mode === 'crop') {
      const start = point(event)
      const target = event.target as HTMLElement
      const handle = target.closest<HTMLElement>('[data-crop-handle]')?.dataset
        .cropHandle as IDrag['operation']
      const operation = handle ?? (target.closest('.yozora-preview__selection') ? 'move' : 'new')
      dragRef.current = {
        id: event.pointerId,
        ...start,
        left: 0,
        top: 0,
        crop: draft ?? full,
        operation,
      }
      if (operation === 'new')
        setDraft(constrainCrop({ ...start, width: 1, height: 1 }, size.width, size.height))
    } else
      dragRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: viewport.scrollLeft,
        top: viewport.scrollTop,
      }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }
  function moveDrag(event: React.PointerEvent<HTMLDivElement>): void {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    if (drag.operation && drag.crop)
      setDraft(dragCrop(drag.crop, drag, point(event), drag.operation, size.width, size.height))
    else {
      viewportRef.current!.scrollLeft = drag.left + drag.x - event.clientX
      viewportRef.current!.scrollTop = drag.top + drag.y - event.clientY
    }
  }
  function toggleMode(next: Mode): void {
    const value = mode === next ? 'pan' : next
    setMode(value)
    setDraft(
      value === 'crop'
        ? (crop ??
            constrainCrop(
              {
                x: size.width * 0.1,
                y: size.height * 0.1,
                width: size.width * 0.8,
                height: size.height * 0.8,
              },
              size.width,
              size.height,
            ))
        : null,
    )
  }

  return (
    <dialog
      ref={dialogRef}
      className="yozora-preview"
      aria-label={title}
      style={
        {
          colorScheme: dark ? 'dark' : 'light',
          '--yp-surface': palette?.surface ?? 'Canvas',
          '--yp-text': palette?.text ?? 'CanvasText',
          '--yp-border': palette?.border ?? 'GrayText',
        } as React.CSSProperties
      }
      onCancel={event => {
        event.preventDefault()
        close()
      }}
      onClose={event => {
        if (!event.currentTarget.open) close()
      }}
      onClick={event => {
        if (event.target === event.currentTarget) close(true)
      }}
    >
      <div className="yozora-preview__layout">
        <header className="yozora-preview__header">
          <div className="yozora-preview__heading">
            <PreviewIcon name={source.kind === 'image' ? 'image' : 'expand'} />
            <strong>{title}</strong>
            {ready && (
              <span>
                {Math.round(area.width)} × {Math.round(area.height)}
              </span>
            )}
          </div>
          <button
            ref={closeRef}
            className="yozora-preview__button"
            type="button"
            aria-label="Close preview"
            title="Close (Esc)"
            onClick={() => close()}
          >
            <PreviewIcon name="close" />
          </button>
        </header>
        <section
          ref={viewportRef}
          className="yozora-preview__viewport"
          aria-label={source.kind === 'image' ? 'Image canvas' : 'Diagram canvas'}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Native keyboard panning needs a focusable scroll container.
          tabIndex={0}
        >
          {!ready && (
            <p className="yozora-preview__status" role={failed ? 'alert' : 'status'}>
              {failed ? 'Unable to load image.' : 'Loading image…'}
            </p>
          )}
          <div
            className="yozora-preview__canvas"
            style={{
              width: bounds.width * scale + 48,
              height: bounds.height * scale + 48,
              opacity: ready ? 1 : 0,
              cursor: mode === 'crop' ? 'crosshair' : dragging ? 'grabbing' : 'grab',
              touchAction: mode === 'crop' ? 'none' : 'auto',
            }}
            onPointerDown={beginDrag}
            onPointerMove={moveDrag}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onLostPointerCapture={finishDrag}
          >
            <div
              ref={frameRef}
              className="yozora-preview__frame"
              style={{ width: bounds.width * scale, height: bounds.height * scale }}
            >
              <div
                className="yozora-preview__media"
                style={{
                  width: area.width * layoutScale,
                  height: area.height * layoutScale,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${transformScale * stretch.x}, ${transformScale * stretch.y})`,
                }}
              >
                {source.kind === 'svg' ? (
                  <iframe
                    title="Diagram preview content"
                    sandbox=""
                    tabIndex={-1}
                    srcDoc={document}
                    style={{
                      width: size.width * layoutScale,
                      height: size.height * layoutScale,
                      left: -area.x,
                      top: -area.y,
                    }}
                  />
                ) : (
                  <img
                    key={source.src}
                    src={source.src}
                    alt={source.alt ?? ''}
                    draggable={false}
                    style={{
                      width: size.width || undefined,
                      height: size.height || undefined,
                      left: -area.x,
                      top: -area.y,
                    }}
                    onLoad={event =>
                      setImageSize({
                        width: event.currentTarget.naturalWidth,
                        height: event.currentTarget.naturalHeight,
                      })
                    }
                    onError={() => setFailed(true)}
                  />
                )}
                {mode === 'crop' && draft && (
                  <div
                    className="yozora-preview__selection"
                    style={{
                      left: draft.x,
                      top: draft.y,
                      width: draft.width,
                      height: draft.height,
                      outlineWidth: 2 / scale,
                      outlineOffset: -2 / scale,
                    }}
                  >
                    {(['nw', 'ne', 'sw', 'se'] as const).map(handle => (
                      <span
                        key={handle}
                        data-crop-handle={handle}
                        className={`yozora-preview__handle yozora-preview__handle--${handle}`}
                        style={{
                          width: 10 / (scale * stretch.x),
                          height: 10 / (scale * stretch.y),
                          cursor:
                            (handle === 'nw' || handle === 'se') === (rotation % 180 === 0)
                              ? 'nwse-resize'
                              : 'nesw-resize',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {mode === 'crop' && draft && (
          <div className="yozora-preview__panel">
            <span className="yozora-preview__hint">Drag a selection or enter pixels</span>
            <div className="yozora-preview__crop-fields">
              {(['x', 'y', 'width', 'height'] as const).map(key => (
                <label key={key}>
                  {{ x: 'Left', y: 'Top', width: 'Width', height: 'Height' }[key]}
                  <input
                    type="number"
                    aria-label={`Crop ${key}`}
                    min={key === 'x' || key === 'y' ? 0 : 1}
                    max={key === 'x' || key === 'width' ? size.width : size.height}
                    value={Math.round(draft[key])}
                    onChange={event => {
                      const value = event.currentTarget.valueAsNumber
                      if (Number.isFinite(value))
                        setDraft(constrainCrop({ ...draft, [key]: value }, size.width, size.height))
                    }}
                  />
                </label>
              ))}
            </div>
            <div className="yozora-preview__panel-actions">
              <Tool
                icon="check"
                label="Apply crop"
                onClick={() => {
                  setCrop(draft)
                  setDraft(null)
                  setMode('pan')
                }}
              />
              <Tool
                icon="close"
                label="Cancel crop"
                onClick={() => {
                  setDraft(null)
                  setMode('pan')
                }}
              />
            </div>
          </div>
        )}
        {mode === 'stretch' && (
          <div className="yozora-preview__panel">
            <span className="yozora-preview__hint">Adjust proportions</span>
            {(['x', 'y'] as const).map(axis => (
              <label className="yozora-preview__stretch" key={axis}>
                {axis === 'x' ? 'Width' : 'Height'}
                <input
                  aria-label={`Stretch ${axis === 'x' ? 'width' : 'height'}`}
                  type="range"
                  min="25"
                  max="300"
                  step="5"
                  value={stretch[axis] * 100}
                  onChange={event => {
                    const amount = event.currentTarget.valueAsNumber / 100
                    setStretch(value => ({
                      ...value,
                      [axis]: amount,
                    }))
                  }}
                />
                <output>{Math.round(stretch[axis] * 100)}%</output>
              </label>
            ))}
          </div>
        )}
        <footer className="yozora-preview__footer">
          <div className="yozora-preview__toolbar">
            <fieldset aria-label="Scale controls">
              <Tool
                icon="zoomOut"
                label="Zoom out"
                disabled={!ready || scale <= 0.05}
                onClick={() => zoom(scale / 1.25)}
              />
              <output className="yozora-preview__zoom" aria-label="Zoom level">
                {Math.round(scale * 100)}%
              </output>
              <Tool
                icon="zoomIn"
                label="Zoom in"
                disabled={!ready || scale >= 4}
                onClick={() => zoom(scale * 1.25)}
              />
            </fieldset>
            <fieldset aria-label="View controls">
              <Tool
                icon="fit"
                label="Fit"
                disabled={!ready}
                onClick={() => {
                  setFitMode(true)
                  fit()
                }}
              />
              <Tool icon="actual" label="100%" disabled={!ready} onClick={() => zoom(1)} />
            </fieldset>
            <fieldset aria-label="Rotation controls">
              <Tool
                icon="rotateLeft"
                label="Rotate left"
                disabled={!ready}
                onClick={() => setRotation(value => (value + 270) % 360)}
              />
              <Tool
                icon="rotateRight"
                label="Rotate right"
                disabled={!ready}
                onClick={() => setRotation(value => (value + 90) % 360)}
              />
            </fieldset>
            {source.kind === 'image' && (
              <fieldset aria-label="Image controls">
                <Tool
                  icon="crop"
                  label="Crop"
                  active={mode === 'crop'}
                  disabled={!ready}
                  onClick={() => toggleMode('crop')}
                />
                <Tool
                  icon="stretch"
                  label="Stretch"
                  active={mode === 'stretch'}
                  disabled={!ready}
                  onClick={() => toggleMode('stretch')}
                />
              </fieldset>
            )}
            <fieldset aria-label="Reset controls">
              <Tool icon="reset" label="Reset view" disabled={!ready} onClick={reset} />
            </fieldset>
          </div>
        </footer>
      </div>
    </dialog>
  )
}

function Tool({
  icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: PreviewIconName
  label: string
  active?: boolean
  disabled?: boolean
  onClick(): void
}): React.ReactElement {
  return (
    <button
      type="button"
      className="yozora-preview__button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      <PreviewIcon name={icon} />
    </button>
  )
}
