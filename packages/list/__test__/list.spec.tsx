import { render } from 'enzyme'
import React from 'react'
import List from '../src'

const children = (
  <React.Fragment>
    <li key={0}>apple</li>
    <li key={1}>banana</li>
    <li key={2}>cat</li>
  </React.Fragment>
)

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('ordered is required', function () {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<List ordered={value} />)
      }).toThrow(/The prop `ordered` is marked as required/i)
    }
  })

  it('children is optional', () => {
    for (const ordered of [false, true]) {
      for (const value of [undefined, null] as any[]) {
        expect(() =>
          render(<List ordered={ordered}>{value}</List>),
        ).not.toThrow()
      }

      const text = 'Hello, world!'
      const wrapper = render(<List ordered={ordered}>{text}</List>)
      expect(wrapper.text()).toEqual(text)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      for (const ordered of [false, true]) {
        const node = render(<List ordered={ordered}>{children}</List>)
        expect(node.hasClass('yozora-list')).toEqual(true)
      }
    })

    it('custom', function () {
      for (const ordered of [false, true]) {
        const node = render(
          <List ordered={ordered} className="my-list">
            {children}
          </List>,
        )
        expect(node.hasClass('yozora-list')).toEqual(true)
        expect(node.hasClass('my-list')).toEqual(true)
      }
    })
  })

  it('style is optional', function () {
    for (const ordered of [false, true]) {
      const node = render(
        <List ordered={ordered} style={{ color: 'orange' }}>
          {children}
        </List>,
      )
      expect(node.css('color')).toEqual('orange')
    }
  })
})

describe('snapshot', function () {
  it('default', () => {
    for (const ordered of [false, true]) {
      const wrapper = render(
        <List ordered={ordered} start={3}>
          {children}
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
        >
          {children}
        </List>,
      )
      expect(wrapper).toMatchSnapshot(ordered ? 'ol' : 'ul')
    }
  })
})
