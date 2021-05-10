import { render } from 'enzyme'
import React from 'react'
import Blockquote from '../src'

const children = (
  <React.Fragment>
    <p>
      some text1
      <span>some text2</span>
    </p>
    <Blockquote>some text3</Blockquote>
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
      expect(() => render(<Blockquote>{value}</Blockquote>)).not.toThrow()
    }

    expect(render(<Blockquote>Hello, world!</Blockquote>).text()).toEqual(
      'Hello, world!',
    )
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Blockquote>{children}</Blockquote>)
      expect(node.hasClass('yozora-blockquote')).toEqual(true)
    })

    it('custom', function () {
      const node = render(
        <Blockquote className="my-blockquote">{children}</Blockquote>,
      )
      expect(node.hasClass('yozora-blockquote')).toEqual(true)
      expect(node.hasClass('my-blockquote')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(
      <Blockquote style={{ color: 'orange' }}>{children}</Blockquote>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Blockquote>{children}</Blockquote>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Blockquote className="custom-class" style={{ color: 'orange' }}>
        {children}
      </Blockquote>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
