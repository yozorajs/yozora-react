import Blockquote from '@yozora/react-blockquote'
import { render } from 'enzyme'
import React from 'react'
import ListItem from '../src'

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

  it('children is optional', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => render(<ListItem>{value}</ListItem>)).not.toThrow()
    }

    const text = 'Hello, world!'
    const wrapper = render(<ListItem>{text}</ListItem>)
    expect(wrapper.text()).toEqual(text)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<ListItem>{children}</ListItem>)
      expect(node.hasClass('yozora-list-item')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <ListItem className="my-list-item">{children}</ListItem>,
      )
      expect(node.hasClass('yozora-list-item')).toBeTruthy()
      expect(node.hasClass('my-list-item')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <ListItem style={{ color: 'orange' }}>{children}</ListItem>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = render(
      <ListItem status="done" style={{ color: 'orange', fontSize: '16px' }}>
        {children}
      </ListItem>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', () => {
    const className = 'custom-list-item'
    const wrapper = render(
      <ListItem
        status="doing"
        className={className}
        style={{ color: 'orange' }}
        data-name="yozora-list-item"
      >
        {children}
      </ListItem>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
