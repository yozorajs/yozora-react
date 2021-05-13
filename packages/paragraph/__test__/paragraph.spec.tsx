import { render } from 'enzyme'
import React from 'react'
import Paragraph from '../src'

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
        render(<Paragraph>{value}</Paragraph>)
      }).not.toThrow()
    }

    expect(render(<Paragraph>Hello, world!</Paragraph>).text()).toEqual(
      'Hello, world!',
    )
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Paragraph>{children}</Paragraph>)
      expect(node.hasClass('yozora-paragraph')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <Paragraph className="my-paragraph">{children}</Paragraph>,
      )
      expect(node.hasClass('yozora-paragraph')).toBeTruthy()
      expect(node.hasClass('my-paragraph')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <Paragraph style={{ color: 'orange' }}>{children}</Paragraph>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Paragraph>{children}</Paragraph>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Paragraph className="custom-class" style={{ color: 'orange' }}>
        {children}
      </Paragraph>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
