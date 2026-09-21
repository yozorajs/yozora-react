import React from 'react'

const paths = {
  zoomIn: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM15.5 15.5 21 21M7.5 10.5h6m-3-3v6',
  zoomOut: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM15.5 15.5 21 21M7.5 10.5h6',
  fit: 'M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5M8 8h8v8H8Z',
  actual: 'M7 8h2v8m6-8h2v8M12 10h.01M12 14h.01M3 3h18v18H3Z',
  rotateLeft: 'M4 5v5h5M4.5 9A8 8 0 1 1 5 17',
  rotateRight: 'M20 5v5h-5M19.5 9A8 8 0 1 0 19 17',
  reset: 'M4 4v6h6M4.5 9a8 8 0 1 1-.2 5',
  crop: 'M6 3v13a2 2 0 0 0 2 2h13M3 6h13a2 2 0 0 1 2 2v13',
  stretch: 'M4 8V4h4m8 0h4v4M4 16v4h4m8 0h4v-4M8 12h8m-6-2-2 2 2 2m4-4 2 2-2 2',
  check: 'm5 12 4 4L19 6',
  close: 'm6 6 12 12M6 18 18 6',
  expand: 'M14 4h6v6m-6 0 6-6M10 20H4v-6m6 0-6 6',
  image: 'M4 4h16v16H4ZM4 16l5-5 4 4 3-3 4 4M15 8h.01',
} as const

export type PreviewIconName = keyof typeof paths

export function PreviewIcon({ name }: { name: PreviewIconName }): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
