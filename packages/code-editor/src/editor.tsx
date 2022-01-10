import cn from 'clsx'
import React from 'react'
import type { IEditorHistory, IEditorOperationRecord, IEditorProps, IEditorState } from './types'
import {
  HISTORY_LIMIT,
  HISTORY_TIME_GAP,
  KeyboardCodes,
  KeyboardKeys,
  getLines,
  isMacLike,
  isWindows,
  regexps,
} from './util'

/**
 * Based on react-simple-code-editor, developed by satya164
 * @see https://github.com/satya164/react-simple-code-editor
 */
export class SimpleCodeEditor extends React.Component<IEditorProps, IEditorState> {
  public static readonly defaultProps = {
    tabSize: 2,
    insertSpaces: true,
    ignoreTabKey: false,
    padding: 0,
  }

  protected readonly inputRef = React.createRef<HTMLTextAreaElement>()
  protected _history: IEditorHistory = { stack: [], offset: -1 }

  constructor(props: IEditorProps) {
    super(props)
    this.state = { capture: true }
  }

  public get session(): { history: IEditorHistory } {
    return {
      history: this._history,
    }
  }

  public set session(session: { history: IEditorHistory }) {
    this._history = session.history
  }

  public componentDidMount(): void {
    this._recordCurrentState()
  }

  public render(): React.ReactElement {
    const {
      value,
      linenoWidth,
      className,
      style,
      highlight,
      textareaId,
      textareaClassName,
      textareaStyle,
      autoFocus,
      disabled,
      form,
      maxLength,
      minLength,
      name,
      placeholder,
      readOnly,
      required,
      onClick,
      onFocus,
      onBlur,
      onKeyUp,
      /* eslint-disable no-unused-vars */
      onKeyDown,
      onScroll,
      onValueChange,
      tabSize,
      insertSpaces,
      ignoreTabKey,
      /* eslint-enable no-unused-vars */
      preClassName,
      preStyle,
      ...htmlProps
    } = this.props

    const highlighted = highlight(value)
    return (
      <div
        {...htmlProps}
        className={cn('yozora-code-editor', className)}
        style={{ ...style, tabSize }}
      >
        <div className="yozora-code-editor__textarea-wrapper">
          <div className="yozora-code-editor__textarea-linenos" style={{ width: linenoWidth }} />
          <textarea
            ref={this.inputRef}
            id={textareaId}
            style={textareaStyle}
            className={cn('yozora-code-editor__textarea', textareaClassName)}
            value={value}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            onScroll={onScroll}
            disabled={disabled}
            form={form}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <pre
          className={cn('yozora-code-editor__previewer', preClassName)}
          style={preStyle}
          aria-hidden="true"
          {...(typeof highlighted === 'string'
            ? { dangerouslySetInnerHTML: { __html: highlighted + '<br />' } }
            : { children: highlighted })}
        />
      </div>
    )
  }

  protected _recordCurrentState = (): void => {
    const input = this.inputRef.current
    if (!input) return

    // Save current state of the input
    const { value, selectionStart, selectionEnd } = input

    this._recordChange({
      value,
      selectionStart,
      selectionEnd,
    })
  }

  protected _recordChange = (record: IEditorOperationRecord, overwrite = false): void => {
    const { stack, offset } = this._history

    if (stack.length && offset > -1) {
      // When something updates, drop the redo operations
      this._history.stack = stack.slice(0, offset + 1)

      // Limit the number of operations to 100
      const count = this._history.stack.length

      if (count > HISTORY_LIMIT) {
        const extras = count - HISTORY_LIMIT

        this._history.stack = stack.slice(extras, count)
        this._history.offset = Math.max(this._history.offset - extras, 0)
      }
    }

    const timestamp = Date.now()

    if (overwrite) {
      const last = this._history.stack[this._history.offset]

      if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
        // A previous entry exists and was in short interval

        // Match the last word in the line
        const regex = regexps.lastWordOfLine

        // Get the previous line
        const previous = getLines(last.value, last.selectionStart).pop()!.match(regex)

        // Get the current line
        const current = getLines(record.value, record.selectionStart).pop()!.match(regex)

        if (previous && current && current[1].startsWith(previous[1])) {
          // The last word of the previous line and current line match
          // Overwrite previous entry so that undo will remove whole word
          this._history.stack[this._history.offset] = { ...record, timestamp }

          return
        }
      }
    }

    // Add the new operation to the stack
    this._history.stack.push({ ...record, timestamp })
    this._history.offset += 1
  }

  protected _updateInput = (record: IEditorOperationRecord): void => {
    const input = this.inputRef.current
    if (!input) return

    // Update values and selection state
    input.value = record.value
    input.selectionStart = record.selectionStart
    input.selectionEnd = record.selectionEnd

    this.props.onValueChange(record.value)
  }

  protected _applyEdits = (record: IEditorOperationRecord): void => {
    // Save last selection state
    const input = this.inputRef.current
    const last = this._history.stack[this._history.offset]

    if (last && input) {
      this._history.stack[this._history.offset] = {
        ...last,
        selectionStart: input.selectionStart,
        selectionEnd: input.selectionEnd,
      }
    }

    // Save the changes
    this._recordChange(record)
    this._updateInput(record)
  }

  protected _undoEdit = (): void => {
    const { stack, offset } = this._history

    // Get the previous edit
    const record = stack[offset - 1]

    if (record) {
      // Apply the changes and update the offset
      this._updateInput(record)
      this._history.offset = Math.max(offset - 1, 0)
    }
  }

  protected _redoEdit = (): void => {
    const { stack, offset } = this._history

    // Get the next edit
    const record = stack[offset + 1]

    if (record) {
      // Apply the changes and update the offset
      this._updateInput(record)
      this._history.offset = Math.min(offset + 1, stack.length - 1)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { tabSize, insertSpaces, ignoreTabKey, onKeyDown } = this.props
    const target = e.target as HTMLTextAreaElement

    if (onKeyDown) {
      onKeyDown(e)

      if (e.defaultPrevented) {
        return
      }
    }

    if (e.key === KeyboardKeys.ESCAPE) {
      target.blur()
    }

    const { value, selectionStart, selectionEnd } = target

    const tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize)

    if (e.key === KeyboardKeys.TAB && !ignoreTabKey && this.state.capture) {
      // Prevent focus change
      e.preventDefault()

      if (e.shiftKey) {
        // Unindent selected lines
        const linesBeforeCaret = getLines(value, selectionStart)
        const startLine = linesBeforeCaret.length - 1
        const endLine = getLines(value, selectionEnd).length - 1
        const nextValue = value
          .split('\n')
          .map((line, i) => {
            if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
              return line.substring(tabCharacter.length)
            }

            return line
          })
          .join('\n')

        if (value !== nextValue) {
          const startLineText = linesBeforeCaret[startLine]

          this._applyEdits({
            value: nextValue,
            // Move the start cursor if first line in selection was modified
            // It was modified only if it started with a tab
            selectionStart: startLineText.startsWith(tabCharacter)
              ? selectionStart - tabCharacter.length
              : selectionStart,
            // Move the end cursor by total number of characters removed
            selectionEnd: selectionEnd - (value.length - nextValue.length),
          })
        }
      } else if (selectionStart !== selectionEnd) {
        // Indent selected lines
        const linesBeforeCaret = getLines(value, selectionStart)
        const startLine = linesBeforeCaret.length - 1
        const endLine = getLines(value, selectionEnd).length - 1
        const startLineText = linesBeforeCaret[startLine]

        this._applyEdits({
          value: value
            .split('\n')
            .map((line, i) => {
              if (i >= startLine && i <= endLine) {
                return tabCharacter + line
              }

              return line
            })
            .join('\n'),
          // Move the start cursor by number of characters added in first line of selection
          // Don't move it if it there was no text before cursor
          selectionStart: /\S/.test(startLineText)
            ? selectionStart + tabCharacter.length
            : selectionStart,
          // Move the end cursor by total number of characters added
          selectionEnd: selectionEnd + tabCharacter.length * (endLine - startLine + 1),
        })
      } else {
        const updatedSelection = selectionStart + tabCharacter.length

        this._applyEdits({
          // Insert tab character at caret
          value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
          // Update caret position
          selectionStart: updatedSelection,
          selectionEnd: updatedSelection,
        })
      }
    } else if (e.key === KeyboardKeys.BACKSPACE) {
      const hasSelection = selectionStart !== selectionEnd
      const textBeforeCaret = value.substring(0, selectionStart)

      if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
        // Prevent default delete behaviour
        e.preventDefault()

        const updatedSelection = selectionStart - tabCharacter.length

        this._applyEdits({
          // Remove tab character at caret
          value:
            value.substring(0, selectionStart - tabCharacter.length) +
            value.substring(selectionEnd),
          // Update caret position
          selectionStart: updatedSelection,
          selectionEnd: updatedSelection,
        })
      }
    } else if (e.key === KeyboardKeys.ENTER) {
      // Ignore selections
      if (selectionStart === selectionEnd) {
        // Get the current line
        const line = getLines(value, selectionStart).pop()!
        const matches = line.match(/^\s+/)

        if (matches && matches[0]) {
          e.preventDefault()

          // Preserve indentation on inserting a new line
          const indent = '\n' + matches[0]
          const updatedSelection = selectionStart + indent.length

          this._applyEdits({
            // Insert indentation character at caret
            value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
            // Update caret position
            selectionStart: updatedSelection,
            selectionEnd: updatedSelection,
          })
        }
      }
    } else if (
      e.key === KeyboardKeys.ANGLE_LEFT ||
      e.key === KeyboardKeys.PARENS_LEFT ||
      e.key === KeyboardKeys.BRACE_LEFT ||
      e.key === KeyboardKeys.BRACKET_LEFT ||
      e.key === KeyboardKeys.QUOTE ||
      e.key === KeyboardKeys.DOUBLE_QUOTE ||
      e.key === KeyboardKeys.BACK_QUOTE
    ) {
      let chars: string[] | null = null

      switch (e.key) {
        case KeyboardKeys.ANGLE_LEFT:
          chars = ['<', '>']
          break
        case KeyboardKeys.PARENS_LEFT:
          chars = ['(', ')']
          break
        case KeyboardKeys.BRACKET_LEFT:
          chars = ['[', ']']
          break
        case KeyboardKeys.BRACE_LEFT:
          chars = ['{', '}']
          break
        case KeyboardKeys.QUOTE:
          chars = ["'", "'"]
          break
        case KeyboardKeys.DOUBLE_QUOTE:
          chars = ['"', '"']
          break
        case KeyboardKeys.BACK_QUOTE:
          chars = ['`', '`']
          break
      }

      // If text is selected, wrap them in the characters
      if (selectionStart !== selectionEnd && chars) {
        e.preventDefault()

        this._applyEdits({
          value:
            value.substring(0, selectionStart) +
            chars[0] +
            value.substring(selectionStart, selectionEnd) +
            chars[1] +
            value.substring(selectionEnd),
          // Update caret position
          selectionStart,
          selectionEnd: selectionEnd + 2,
        })
      }
    } else if (
      (isMacLike
        ? // Trigger undo with ⌘+Z on Mac
          e.metaKey && e.code === KeyboardCodes.Z
        : // Trigger undo with Ctrl+Z on other platforms
          e.ctrlKey && e.code === KeyboardCodes.Z) &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault()

      this._undoEdit()
    } else if (
      (isMacLike
        ? // Trigger redo with ⌘+Shift+Z on Mac
          e.metaKey && e.code === KeyboardCodes.Z && e.shiftKey
        : isWindows
        ? // Trigger redo with Ctrl+Y on Windows
          e.ctrlKey && e.code === KeyboardCodes.Y
        : // Trigger redo with Ctrl+Shift+Z on other platforms
          e.ctrlKey && e.code === KeyboardCodes.Z && e.shiftKey) &&
      !e.altKey
    ) {
      e.preventDefault()

      this._redoEdit()
    } else if (e.code === KeyboardCodes.M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
      e.preventDefault()

      // Toggle capturing tab key so users can focus away
      this.setState(state => ({
        capture: !state.capture,
      }))
    }
  }

  protected _handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value, selectionStart, selectionEnd } = e.target
    const nextRecord: IEditorOperationRecord = {
      value,
      selectionStart,
      selectionEnd,
    }
    this._recordChange(nextRecord, true)
    this.props.onValueChange(value)
  }
}

export default SimpleCodeEditor
