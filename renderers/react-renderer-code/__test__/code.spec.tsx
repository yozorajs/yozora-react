import { render } from '@testing-library/react'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Code, { CodeLiteral } from '../src'

test.each(['\n', '\r', '\r\n'])(
  'updates metadata highlights when code grows or shrinks with %j',
  newline => {
    const meta = '{2-1000000000}'
    const value = ['one', 'two'].join(newline)
    const element = <Code value={value} meta={meta} />
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(element), 'text/html')
    const selector = '.yozora-code-highlighter__code-line.yozora-code-highlighter__highlight-line'
    expect(doc.querySelectorAll(selector)).toHaveLength(1)

    const view = render(element)
    const highlighted = (): string[] =>
      Array.from(view.container.querySelectorAll(selector)).map(line => line.textContent ?? '')
    expect(highlighted()).toEqual(['two'])
    view.rerender(<Code value={['one', 'two', 'three', 'four'].join(newline)} meta={meta} />)
    expect(highlighted()).toEqual(['two', 'three', 'four'])
    view.rerender(<Code value="one" meta={meta} />)
    expect(highlighted()).toEqual([])
    view.rerender(<Code value="one" meta="highlight=1" />)
    expect(highlighted()).toEqual(['one'])
  },
)

test.each(['\n', '\r', '\r\n'])('updates collapsed line counts with %j line endings', newline => {
  const view = render(
    <CodeLiteral value={['a', 'b'].join(newline)} title="sample" collapsed={true} />,
  )
  expect(view.getByTitle('sample')).toHaveTextContent('2 lines.')
  view.rerender(
    <CodeLiteral value={['a', 'b', 'c', 'd'].join(newline)} title="sample" collapsed={true} />,
  )
  expect(view.getByTitle('sample')).toHaveTextContent('4 lines.')
  view.rerender(<CodeLiteral value="a" title="sample" collapsed={true} />)
  expect(view.getByTitle('sample')).toHaveTextContent('1 lines.')
})

describe('customization', () => {
  test('render with custom className', () => {
    const code = 'let a = 1'
    const className = 'custom-code'
    const view = render(<Code className={className} value={code} />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

describe('snapshot', () => {
  const code = `
    () => {
      const a = 1;
      const b = 2;
      const c = a * a + b * b;
      return <span>Answer: {c}</span>
    }
  `.trim()
  const lang = 'jsx'

  test('live', async () => {
    const view = render(<Code meta="live maxlines=4" lang={lang} value={code} />)
    await view.findByText('Answer: 5')
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('embed', async () => {
    const view = render(<Code meta="embed" lang={lang} value={code} />)
    await view.findByText('Answer: 5')
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('literal', () => {
    const view = render(
      <Code
        meta={'literal {1-2,2-1,4} title="/home/demo/a.tsx" collapsed'}
        lang={lang}
        value={code}
      />,
    )
    expect(view.asFragment()).toMatchSnapshot()
  })
})
