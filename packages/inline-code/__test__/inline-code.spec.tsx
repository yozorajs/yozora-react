import { render } from 'enzyme'
import React from 'react'
import InlineCode from '../src'

const code = 'const message = "Hello, world!"'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<InlineCode value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }

    expect(render(<InlineCode value={code} />).text()).toEqual(code)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<InlineCode value={code} />)
      expect(node.hasClass('yozora-inline-code')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<InlineCode value={code} className="my-code" />)
      expect(node.hasClass('yozora-inline-code')).toBeTruthy()
      expect(node.hasClass('my-code')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<InlineCode value={code} style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = render(
      <InlineCode value={code} style={{ color: 'orange', fontSize: '16px' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', () => {
    const wrapper = render(
      <InlineCode
        value={code}
        className="custom-class"
        style={{ color: 'orange' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
