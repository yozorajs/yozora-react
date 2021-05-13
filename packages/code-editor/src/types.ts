import type React from 'react'

/**
 * Props for the textarea
 */
export interface EditorTextareaProps {
  /**
   * Textarea id
   */
  textareaId?: string
  /**
   * Custom textarea className
   */
  textareaClassName?: string
  /**
   * Custom textarea style
   */
  textareaStyle?: React.CSSProperties
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  maxLength?: number
  minLength?: number
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
}

/**
 * Props for the hightlighted code’s pre element
 */
export interface EditorPreProps {
  /**
   * Custom pre className
   */
  preClassName?: string
  /**
   * Custom pre style
   */
  preStyle?: React.CSSProperties
}

/**
 * Editor props
 */
export interface EditorProps
  extends React.HTMLAttributes<HTMLElement>,
    EditorTextareaProps,
    EditorPreProps {
  /**
   * Contents of this simple editor.
   */
  value: string
  /**
   * Width of the line numbers area.
   */
  linenoWidth?: React.CSSProperties['width']
  onValueChange(value: string): void
  /**
   * On textarea scrolling.
   */
  onScroll: React.UIEventHandler<HTMLTextAreaElement>
  highlight(value: string): React.ReactNode
  tabSize: number
  insertSpaces: boolean
  ignoreTabKey: boolean
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
}

/**
 * Editor state
 */
export interface EditorState {
  capture: boolean
}

/**
 * An operation record in editor.
 */
export interface EditorOperationRecord {
  value: string
  selectionStart: number
  selectionEnd: number
}

/**
 * Editor operation history.
 */
export interface EditorHistory {
  stack: Array<EditorOperationRecord & { timestamp: number }>
  offset: number
}
