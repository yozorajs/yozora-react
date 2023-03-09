/* istanbul ignore next */
const gThis =
  typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : global

/* istanbul ignore next */
export const isWindows = gThis?.navigator && /Win/i.test(navigator.platform)

/* istanbul ignore next */
export const isMacLike = gThis?.navigator && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

/**
 * Editor history threshold values.
 */
export const HISTORY_LIMIT = 100
export const HISTORY_TIME_GAP = 3000

/**
 * Keyboard keys.
 *
 * @see https://keycode.info/
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 */
export enum KeyboardKeys {
  ANGLE_LEFT = '<',
  BACK_QUOTE = '`',
  BACKSPACE = 'Backspace',
  BRACE_LEFT = '{',
  BRACKET_LEFT = '[',
  ENTER = 'Enter',
  ESCAPE = 'Escape',
  PARENS_LEFT = '(',
  QUOTE = "'",
  DOUBLE_QUOTE = '"',
  TAB = 'Tab',
}

/**
 * Keyboard codes.
 *
 * @see https://keycode.info/
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 */
export enum KeyboardCodes {
  M = 'KeyM',
  Y = 'KeyY',
  Z = 'KeyZ',
}

export const regexps = {
  lastWordOfLine: /[^a-z0-9]([a-z0-9]+)$/i,
}

/**
 * Split text into lines.
 * @param text
 * @param endPos
 */
export const getLines = (text: string, endPos: number): string[] =>
  text.substring(0, endPos).split('\n')
