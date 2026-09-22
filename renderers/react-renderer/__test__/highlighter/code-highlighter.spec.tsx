import { render } from '@testing-library/react'
import React from 'react'
import { CodeHighlighter, HighlightLinenos, classes } from '../../src'

describe('basic rendering case', () => {
  test('keeps body and gutter highlights in sync for unsorted and repeated line numbers', () => {
    const value = 'one\ntwo\nthree'
    const view = render(<CodeHighlighter value={value} highlightLinenos={[3, 1, 3, 99]} />)
    const highlighted = (lineClass: string): string[] =>
      Array.from(view.container.querySelectorAll(`.${lineClass}.${classes.highlightLine}`)).map(
        line => line.textContent ?? '',
      )

    expect(highlighted(classes.codeLine)).toEqual(['one', 'three'])
    expect(highlighted(classes.linenoLine)).toEqual(['1', '3'])
    view.rerender(<CodeHighlighter value={value} highlightLinenos={[2]} />)
    expect(highlighted(classes.codeLine)).toEqual(['two'])
    expect(highlighted(classes.linenoLine)).toEqual(['2'])
    view.rerender(<CodeHighlighter value={value} />)
    expect(highlighted(classes.codeLine)).toEqual([])
    expect(highlighted(classes.linenoLine)).toEqual([])
  })

  test('standalone line numbers support highlight updates and omitted highlights', () => {
    const view = render(<HighlightLinenos countOfLines={3} highlightLinenos={[3, 1, 3]} />)
    expect(view.container.querySelectorAll(`.${classes.highlightLine}`)).toHaveLength(2)
    view.rerender(<HighlightLinenos countOfLines={4} highlightLinenos={[4]} />)
    expect(view.container.querySelector(`.${classes.highlightLine}`)).toHaveTextContent('4')
    view.rerender(<HighlightLinenos countOfLines={4} highlightLinenos={undefined} />)
    expect(view.container.querySelectorAll(`.${classes.highlightLine}`)).toHaveLength(0)
  })

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
