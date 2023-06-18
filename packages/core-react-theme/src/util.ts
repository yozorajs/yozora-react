import type { TokenNames } from './constant/TokenNames'
import type { IThemeSchema } from './types'

export function schema2css(schema: IThemeSchema): string {
  const keys: TokenNames[] = Object.keys(schema) as TokenNames[]
  return keys.map(key => `${key}: ${schema[key]};`).join('')
}
