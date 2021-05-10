import { render } from 'enzyme'
import React from 'react'
import Heading from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('level is required', () => {
    for (const level of [0, '1', 1.2, 7] as any[]) {
      expect(() => {
        render(
          <Heading level={level} identifier={`heading-${level}`}>
            heading {level}
          </Heading>,
        )
      }).toThrow(/Invalid prop `level`/i)
    }

    for (let level = 1; level <= 6; ++level) {
      expect(() => render(<Heading level={level as any} />)).not.toThrow()
    }
  })

  it('children is optional', () => {
    for (const value of [undefined, null] as any[]) {
      expect(() => {
        render(
          <Heading level={1} identifier="heading-1">
            {value}
          </Heading>,
        )
      }).not.toThrow()
    }
  })

  it('identifier is optional', () => {
    const node = render(<Heading level={1} identifier="waw" />)
    expect(node.attr('id')).toEqual('waw')
  })

  it('linkIcon is optional', () => {
    const node = render(<Heading level={1} identifier="waw" linkIcon="lol" />)
    expect(node.find('.yozora-heading__anchor').text()).toEqual('lol')
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(<Heading level={1}>Heading contents.</Heading>)
      expect(node.hasClass('yozora-heading')).toEqual(true)
    })

    it('custom', function () {
      const node = render(
        <Heading level={1} className="my-heading">
          Heading contents.
        </Heading>,
      )
      expect(node.hasClass('yozora-heading')).toEqual(true)
      expect(node.hasClass('my-heading')).toEqual(true)
    })
  })

  it('style is optional', function () {
    const node = render(
      <Heading level={2} style={{ color: 'orange' }}>
        Heading contents
      </Heading>,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('default', () => {
    const level = 2
    const wrapper = render(
      <Heading
        level={level}
        identifier={`heading-${level}`}
        style={{ color: 'orange', fontSize: '16px' }}
      >
        Waw -- {level}, 中文标题“这”
      </Heading>,
    )
    expect(wrapper).toMatchSnapshot(`level ${level}`)
  })

  it('custom', () => {
    const level = 1
    const wrapper = render(
      <Heading
        level={level}
        identifier={`heading-${level}`}
        className="custom-class"
        data-name="yozora-heading"
        style={{ color: 'orange', fontSize: '16px' }}
      >
        Waw -- {level}, 中文标题“这”
      </Heading>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
