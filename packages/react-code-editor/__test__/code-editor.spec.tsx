import { fireEvent, render } from '@testing-library/react'
import React, { useState } from 'react'
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
})
