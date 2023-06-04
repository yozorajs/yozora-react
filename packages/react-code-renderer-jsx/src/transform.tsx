import type { Options } from 'sucrase'
import { transform as _transform } from 'sucrase'

const defaultOpts: Options = {
  jsxRuntime: 'classic',
  transforms: ['jsx', 'imports'],
}

export type ICodeTransformer = (code: string) => string

/**
 * Transpile jsx.
 * @see https://github.com/FormidableLabs/react-live/blob/2d8246b920813e4725a6037c94d9a4d00dd8cd2a/src/utils/transpile/transform.js
 */
export const createCodeTransformer =
  (opts: Options = defaultOpts): ICodeTransformer =>
  (code: string): string =>
    _transform(code, opts).code

export const transformImports: ICodeTransformer = createCodeTransformer({ transforms: ['imports'] })
export const transformJsx: ICodeTransformer = createCodeTransformer({
  transforms: ['jsx', 'imports'],
})
export const transformTsx: ICodeTransformer = createCodeTransformer({
  transforms: ['jsx', 'typescript', 'imports'],
})
