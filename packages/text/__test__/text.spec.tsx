import { render } from 'enzyme'
import React from 'react'
import Text from '../src'

const text = 'Hello, world!'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('value is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Text value={value} />)
      }).toThrow(/The prop `value` is marked as required/i)
    }

    expect(render(<Text value={text} />).text()).toEqual(text)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Text value={text} />)
      expect(node.hasClass('yozora-text')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(<Text value={text} className="my-text" />)
      expect(node.hasClass('yozora-text')).toBeTruthy()
      expect(node.hasClass('my-text')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(<Text value={text} style={{ color: 'orange' }} />)
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Text value={text} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Text value={text} className="custom-class" style={{ color: 'orange' }} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
