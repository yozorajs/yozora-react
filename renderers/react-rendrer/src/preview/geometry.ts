import type { ICropRect, IPreviewTransform } from './types'

export function rotatedSize(
  width: number,
  height: number,
  transform: IPreviewTransform,
): { width: number; height: number } {
  const w = width * transform.stretchX
  const h = height * transform.stretchY
  return transform.rotation % 180 === 0 ? { width: w, height: h } : { width: h, height: w }
}

/** Map a point in the rotated/stretched canvas back to original image coordinates. */
export function sourcePoint(
  x: number,
  y: number,
  width: number,
  height: number,
  transform: IPreviewTransform,
): { x: number; y: number } {
  const w = width * transform.stretchX
  const h = height * transform.stretchY
  let px = x
  let py = y
  switch (transform.rotation) {
    case 90:
      px = y
      py = h - x
      break
    case 180:
      px = w - x
      py = h - y
      break
    case 270:
      px = w - y
      py = x
      break
  }
  return {
    x: clamp(px / transform.stretchX, 0, width),
    y: clamp(py / transform.stretchY, 0, height),
  }
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

export function constrainCrop(crop: ICropRect, width: number, height: number): ICropRect {
  const w = clamp(crop.width, 1, width)
  const h = clamp(crop.height, 1, height)
  return { x: clamp(crop.x, 0, width - w), y: clamp(crop.y, 0, height - h), width: w, height: h }
}

export function dragCrop(
  original: ICropRect,
  start: { x: number; y: number },
  point: { x: number; y: number },
  mode: 'new' | 'move' | 'nw' | 'ne' | 'sw' | 'se',
  width: number,
  height: number,
): ICropRect {
  const dx = point.x - start.x
  const dy = point.y - start.y
  if (mode === 'move')
    return constrainCrop({ ...original, x: original.x + dx, y: original.y + dy }, width, height)
  if (mode === 'new')
    return constrainCrop(
      {
        x: Math.min(start.x, point.x),
        y: Math.min(start.y, point.y),
        width: Math.abs(dx),
        height: Math.abs(dy),
      },
      width,
      height,
    )
  const right = original.x + original.width
  const bottom = original.y + original.height
  const x = mode.endsWith('w') ? clamp(original.x + dx, 0, right - 1) : original.x
  const y = mode.startsWith('n') ? clamp(original.y + dy, 0, bottom - 1) : original.y
  const nextRight = mode.endsWith('e') ? clamp(right + dx, x + 1, width) : right
  const nextBottom = mode.startsWith('s') ? clamp(bottom + dy, y + 1, height) : bottom
  return { x, y, width: nextRight - x, height: nextBottom - y }
}
