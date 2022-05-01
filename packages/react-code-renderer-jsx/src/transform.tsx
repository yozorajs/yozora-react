import { transform as _transform } from 'buble'

export const _polyKey = 'poly'
export const _poly = { assign: Object.assign }

const opts = {
  objectAssign: `${_polyKey}.assign`,
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true,
  },
}

/**
 * Transpile jsx
 *
 * @param code
 * @see https://github.com/FormidableLabs/react-live/blob/2d8246b920813e4725a6037c94d9a4d00dd8cd2a/src/utils/transpile/transform.js
 */
export function transform(code: string): string {
  return _transform(code, opts).code
}
