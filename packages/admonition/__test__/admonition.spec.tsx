import { render } from 'enzyme'
import React from 'react'
import Admonition from '../src'

const children = (
  <React.Fragment>
    <p>
      some text1
      <span>some text2</span>
    </p>
    <blockquote>some text3</blockquote>
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
      expect(() => render(<Admonition>{value}</Admonition>)).not.toThrow()
    }

    expect(
      /Hello, world!/.test(
        render(<Admonition>Hello, world!</Admonition>).text(),
      ),
    ).toBe(true)
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Admonition keyword="tip">{children}</Admonition>)
      expect(node.hasClass('yozora-admonition')).toBeTruthy()
      expect(node.hasClass('yozora-admonition--tip')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <Admonition className="my-admonition">{children}</Admonition>,
      )
      expect(node.hasClass('yozora-admonition')).toBeTruthy()
      expect(node.hasClass('yozora-admonition--note')).toBeTruthy()
      expect(node.hasClass('my-admonition')).toBeTruthy()
    })
  })

  it('keyword is optional', function () {
    const keywords: Record<string, string> = {
      note: 'note',
      default: 'note',
      important: 'info',
      info: 'info',
      tip: 'tip',
      success: 'tip',
      caution: 'caution',
      warning: 'caution',
      error: 'danger',
      danger: 'danger',
      'custom-waw': 'custom-waw',
    }
    for (const [keyword, modifier] of Object.entries(keywords)) {
      const node = render(<Admonition keyword={keyword}>{children}</Admonition>)
      expect(node.hasClass('yozora-admonition--' + modifier)).toBeTruthy()
    }
  })

  it('style is optional', function () {
    const node = render(
      <Admonition style={{ color: 'orange' }}>{children}</Admonition>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', function () {
    const wrapper = render(<Admonition>{children}</Admonition>)
    expect(wrapper).toMatchSnapshot()
  })

  it('custom', function () {
    const wrapper = render(
      <Admonition
        keyword="caution"
        className="custom-class"
        style={{ color: 'orange' }}
      >
        {children}
      </Admonition>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
