import { render } from '@testing-library/react'
import React from 'react'
import CodeHighlighter from '../src'

describe('basic rendering case', () => {
  test('lineno change', () => {
    const view = render(<CodeHighlighter lang="typescript" value="// first" />)
    expect(view.getByText('1')).toBeInTheDocument()
    expect(view.container.querySelectorAll('.token-line')).toHaveLength(1)

    const code = Array.from({ length: 103 }, (_, i) => `// line ${i + 1}`).join('\n')
    view.rerender(<CodeHighlighter lang="typescript" value={code} />)
    expect(view.container.querySelectorAll('.token-line')).toHaveLength(103)
    expect(view.getByText('103')).toBeInTheDocument()
    expect(view.getByText('// line 103')).toBeInTheDocument()
    expect(view.queryByText('104')).not.toBeInTheDocument()

    view.rerender(<CodeHighlighter lang="typescript" value="// last" />)
    expect(view.container.querySelectorAll('.token-line')).toHaveLength(1)
    expect(view.getByText('1')).toBeInTheDocument()
    expect(view.getByText('// last')).toBeInTheDocument()
    expect(view.queryByText('2')).not.toBeInTheDocument()
    expect(view.queryByText('103')).not.toBeInTheDocument()
  })

  test('snapshot', () => {
    const view = render(
      <pre>
        <CodeHighlighter lang="typescript" value="let a: number = 1 + 2;" />
      </pre>,
    )
    expect(view.asFragment()).toMatchSnapshot()
  })
})
