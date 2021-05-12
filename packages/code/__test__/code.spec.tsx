import { render } from 'enzyme'
import React from 'react'
import Code from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('render with custom className', () => {
    const code = 'let a = 1'
    const className = 'custom-code'
    const wrapper = render(<Code className={className} value={code} />)
    expect(wrapper.hasClass(className)).toBeTruthy()
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Code value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })
})

describe('snapshot', function () {
  const code = `
    function () {
      const a = 1;
      const b = 2;
      const c = a * a + b * b;
      return <span>Answer: {c}</span>
    }
  `.trim()
  const lang = 'jsx'

  it('live', () => {
    const wrapper = render(
      <Code meta="live maxlines=4" lang={lang} value={code} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('embed', () => {
    const wrapper = render(<Code meta="embed" lang={lang} value={code} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('literal', () => {
    const wrapper = render(
      <Code
        meta={`literal {1-2,2-1,4} title="/home/demo/a.tsx" collapsed`}
        lang={lang}
        value={code}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
