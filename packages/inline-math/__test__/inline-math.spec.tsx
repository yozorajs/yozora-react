import { mount, render } from 'enzyme'
import React from 'react'
import InlineMath from '../src'

const code = 'x^2 + y^2 = z^2'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<InlineMath value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<InlineMath value={code} />)
      expect(node.hasClass('yozora-inline-math')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<InlineMath value={code} className="my-code" />)
      expect(node.hasClass('yozora-inline-math')).toBeTruthy()
      expect(node.hasClass('my-code')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<InlineMath value={code} style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = mount(
      <InlineMath value={code} style={{ color: 'orange', fontSize: '16px' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', () => {
    const wrapper = mount(
      <InlineMath
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
