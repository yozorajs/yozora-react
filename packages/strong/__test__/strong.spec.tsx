import { mount, render } from 'enzyme'
import React from 'react'
import Strong from '../src'

const children = (
  <React.Fragment>
    some text1
    <span>some text2</span>
  </React.Fragment>
)

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('children is optional', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Strong>{value}</Strong>)
      }).not.toThrow()
    }

    expect(render(<Strong>Hello, world!</Strong>).text()).toEqual(
      'Hello, world!',
    )
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Strong>Strong contents.</Strong>)
      expect(node.hasClass('yozora-strong')).toEqual(true)
    })

    it('custom', function () {
      const node = render(
        <Strong className="my-strong">Strong contents.</Strong>,
      )
      expect(node.hasClass('yozora-strong')).toEqual(true)
      expect(node.hasClass('my-strong')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(
      <Strong style={{ color: 'orange' }}>{children} </Strong>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Strong>{children} </Strong>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Strong className="custom-class" style={{ color: 'orange' }}>
        {children}
      </Strong>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
