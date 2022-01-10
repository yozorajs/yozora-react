import { render } from 'enzyme'
import React from 'react'
import Break from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Break />)
      expect(node.hasClass('yozora-break')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<Break className="my-break" />)
      expect(node.hasClass('yozora-break')).toBeTruthy()
      expect(node.hasClass('my-break')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<Break style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Break />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(<Break className="custom-class" style={{ color: 'orange' }} />)
    expect(wrapper).toMatchSnapshot()
  })
})
