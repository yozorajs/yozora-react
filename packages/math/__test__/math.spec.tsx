import { mount, render } from 'enzyme'
import React from 'react'
import Math from '../src'

const code = `
\\begin{align}
  f(x) = \\left\\lbrace
    \\begin{aligned}
      &x^2, &x < 0 \\\\
      &\\frac{1}{x^3}, &x > 0
    \\end{aligned}
  \\right.
\\end{align}
`

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Math value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Math value={code} />)
      expect(node.hasClass('yozora-math')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<Math value={code} className="my-code" />)
      expect(node.hasClass('yozora-math')).toBeTruthy()
      expect(node.hasClass('my-code')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<Math value={code} style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = mount(
      <Math value={code} style={{ color: 'orange', fontSize: '16px' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', () => {
    const wrapper = mount(
      <Math
        value={code}
        className="custom-class"
        style={{
          padding: '2px',
          border: '1px solid blue',
          margin: '0 2px',
          background: 'hsla(210deg, 13%, 12%, 0.05)',
          color: '#d81848',
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
