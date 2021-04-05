import { mount, render } from 'enzyme'
import React from 'react'
import ListItem from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', () => {
    const ref = React.createRef<HTMLLIElement>()
    const wrapper = mount(
      <ListItem ref={ref} data-name="yozora-list-item">
        list item contents.
      </ListItem>,
    )

    const o = wrapper.getDOMNode()
    expect(o).toEqual(ref.current)
    expect(o.getAttribute('data-name')).toEqual('yozora-list-item')
  })

  it('children is optional', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<ListItem>{value}</ListItem>)
      }).not.toThrow()
    }

    const text = 'Hello, world!'
    const wrapper = render(
      <ListItem>
        <span>
          <ListItem>{text}</ListItem>
        </span>
      </ListItem>,
    )
    expect(wrapper.text()).toEqual(text)
  })

  it('className is optional', function () {
    expect(
      render(<ListItem>list item contents.</ListItem>).hasClass(
        'yozora-list-item',
      ),
    ).toEqual(true)

    expect(
      render(
        <ListItem className="my-list-item">list item contents.</ListItem>,
      ).hasClass('my-list-item'),
    ).toEqual(true)
  })
})

describe('snapshot', function () {
  it('default', () => {
    const wrapper = render(
      <ListItem status="done" style={{ color: 'orange', fontSize: '16px' }}>
        some text1
        <span>some text2</span>
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
        some text1
        <span>some text2</span>
      </ListItem>,
    )
    expect(wrapper.hasClass(className)).toEqual(true)
    expect(wrapper.text()).toEqual('some text1some text2')
  })
})
