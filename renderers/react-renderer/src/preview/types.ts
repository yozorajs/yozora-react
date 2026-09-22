export interface IPreviewPalette {
  readonly surface: string
  readonly text: string
  readonly border: string
}

export type IPreviewSource =
  | { readonly kind: 'svg'; readonly svg: string; readonly width: number; readonly height: number }
  | { readonly kind: 'image'; readonly src: string; readonly alt?: string }

export interface ICropRect {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export interface IPreviewTransform {
  readonly rotation: number
  readonly stretchX: number
  readonly stretchY: number
}
