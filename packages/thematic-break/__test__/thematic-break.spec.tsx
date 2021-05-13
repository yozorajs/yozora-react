import { render } from 'enzyme'
import React from 'react'
import ThematicBreak from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<ThematicBreak />)
      expect(node.hasClass('yozora-thematic-break')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<ThematicBreak className="my-thematic-break" />)
      expect(node.hasClass('yozora-thematic-break')).toBeTruthy()
      expect(node.hasClass('my-thematic-break')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<ThematicBreak style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<ThematicBreak />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <ThematicBreak className="custom-class" style={{ color: 'orange' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
