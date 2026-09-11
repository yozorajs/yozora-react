import { fireEvent, render } from '@testing-library/react'
import React, { useState } from 'react'
import { vi } from 'vitest'
import CodeEditor from '../src'

describe('basic rendering case', () => {
  test('input change', () => {
    const code1 = 'let a: number = 1 + 2;'
    const code2 = 'let a: boolean = true;'

    function Wrapper(): React.ReactElement {
      const [code, setCode] = useState<string>(code1)

      return <CodeEditor lang="typescript" code={code} onChange={setCode} />
    }

    const view = render(<Wrapper />)
    const textarea = view.getByRole('textbox')
    expect(textarea.textContent).toEqual(code1)

    // change code
    fireEvent.change(textarea, { target: { value: code2 } })
    expect(textarea.textContent).toEqual(code2)
  })

  test('indents and unindents selected lines', () => {
    const code = 'first\nsecond\nthird'
    const onChange = vi.fn()
    const view = render(<CodeEditor lang="typescript" code={code} onChange={onChange} />)
    const textarea = view.getByRole('textbox') as HTMLTextAreaElement
    textarea.setSelectionRange(0, 12)

    fireEvent.keyDown(textarea, { key: 'Tab' })
    expect(textarea.value).toEqual('  first\n  second\nthird')
    expect([textarea.selectionStart, textarea.selectionEnd]).toEqual([0, 16])
    expect(onChange).toHaveBeenLastCalledWith('  first\n  second\nthird')

    fireEvent.keyDown(textarea, { key: 'Tab', shiftKey: true })
    expect(textarea.value).toEqual(code)
    expect([textarea.selectionStart, textarea.selectionEnd]).toEqual([0, 12])
    expect(onChange).toHaveBeenLastCalledWith(code)
  })

  test('preserves indentation when inserting a newline', () => {
    const code = '  const value = 1'
    const onChange = vi.fn()
    const view = render(<CodeEditor lang="typescript" code={code} onChange={onChange} />)
    const textarea = view.getByRole('textbox') as HTMLTextAreaElement
    textarea.setSelectionRange(code.length, code.length)

    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(textarea.value).toEqual(code + '\n  ')
    expect([textarea.selectionStart, textarea.selectionEnd]).toEqual([
      code.length + 3,
      code.length + 3,
    ])
    expect(onChange).toHaveBeenLastCalledWith(code + '\n  ')
  })
})
