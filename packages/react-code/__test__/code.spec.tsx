import { render } from '@testing-library/react'
import React from 'react'
import Code from '../src'

describe('prop types', () => {
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

  test('live', () => {
    const view = render(<Code meta="live maxlines=4" lang={lang} value={code} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('embed', () => {
    const view = render(<Code meta="embed" lang={lang} value={code} />)
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
