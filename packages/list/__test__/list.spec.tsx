import { mount, render } from 'enzyme'
import React from 'react'
import List from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('forward ref', () => {
    for (const ordered of [false, true]) {
      const ref = React.createRef<HTMLUListElement | HTMLOListElement>()
      const wrapper = mount(
        <List ordered={ordered} ref={ref} start={1} data-name="yozora-list">
          <li key={0}>First: Good afternoon!</li>
          <li key={1}>Second: Good night!</li>
        </List>,
      )

      const o = wrapper.getDOMNode()
      expect(o).toEqual(ref.current)
      expect(o.getAttribute('data-name')).toEqual('yozora-list')
    }
  })

  it('children is optional', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <List ordered={true} start={1} data-value="waw">
            {value}
          </List>,
        )
      }).not.toThrow()
    }
  })

  it('className is optional', function () {
    for (const ordered of [false, true]) {
      expect(
        render(
          <List ordered={ordered} start={1}>
            <li>list item1</li>
          </List>,
        ).hasClass('yozora-list'),
      ).toEqual(true)

      expect(
        render(
          <List ordered={ordered} start={1} className="my-list">
            <li>list item1.</li>
          </List>,
        ).hasClass('my-list'),
      ).toEqual(true)
    }
  })
})

describe('snapshot', function () {
  it('default', () => {
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List ordered={ordered} start={3} type="a">
          <li key={0}>apple</li>
          <li key={1}>banana</li>
          <li key={2}>cat</li>
        </List>,
      )
      expect(wrapper).toMatchSnapshot(ordered ? 'ol' : 'ul')
    }
  })

  it('custom', () => {
    const className = 'custom-list-item'
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List
          start={3}
          ordered={ordered}
          className={className}
          style={{ color: 'orange' }}
          data-name="yozora-list"
          type="a"
        >
          <li key={0}>apple</li>
          <li key={1}>banana</li>
          <li key={2}>cat</li>
        </List>,
      )
      expect(wrapper).toMatchSnapshot(ordered ? 'ol' : 'ul')
    }
  })
})
