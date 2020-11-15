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
export interface EditorProps extends
  React.HTMLAttributes<HTMLElement>, EditorTextareaProps, EditorPreProps {
  // Props for the component
  value: string
  onValueChange: (value: string) => void
  highlight: (value: string) => React.ReactNode
  tabSize: number
  insertSpaces: boolean
  ignoreTabKey: boolean
  padding: number | string
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
