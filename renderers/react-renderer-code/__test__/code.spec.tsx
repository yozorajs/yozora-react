import { render } from '@testing-library/react'
import React from 'react'
import Code, { CodeLiteral } from '../src'

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
