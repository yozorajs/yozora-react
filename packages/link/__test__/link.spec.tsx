import { render } from 'enzyme'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Link from '../src'

const url = 'https://github.com/guanghechen'
const children = (
  <React.Fragment>
    Some link text
    <span>Some link text2</span>
  </React.Fragment>
)

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('url is required', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(<Link url={value}>{children}</Link>)
      }).toThrow(/The prop `url` is marked as required/i)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Link url={url}>{children}</Link>)
      expect(node.hasClass('yozora-link')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <Link url={url} className="my-code">
          {children}
        </Link>,
      )
      expect(node.hasClass('yozora-link')).toBeTruthy()
      expect(node.hasClass('my-code')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <Link url={url} style={{ color: 'orange' }}>
        {children}
      </Link>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('basic', () => {
    const wrapper = render(
      <Router>
        <Link
          url={url}
          title="home"
          style={{ color: 'orange', fontSize: '16px' }}
        >
          some text1
          <span>some text2</span>
        </Link>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
