import { render } from 'enzyme'
import React from 'react'
import FootnoteReference from '../src'

describe('prop types', function () {
  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      throw new Error(args.join(' '))
    })
  })

  it('identifier is required', function () {
    for (const identifier of [undefined, null] as any[]) {
      expect(() => {
        render(<FootnoteReference identifier={identifier} label="waw" />)
      }).toThrow(/The prop `identifier` is marked as required/i)
    }
  })

  it('label is required', function () {
    for (const label of [undefined, null] as any[]) {
      expect(() => {
        render(<FootnoteReference identifier="identifier" label={label} />)
      }).toThrow(/The prop `label` is marked as required/i)
    }
  })

  describe('className is optional', function () {
    it('default', function () {
      const node = render(
        <FootnoteReference identifier="identifier" label="1" />,
      )
      expect(node.hasClass('yozora-footnote-reference')).toBeTruthy()
    })

    it('custom', function () {
      const node = render(
        <FootnoteReference
          identifier="identifier"
          label="1"
          className="my-footnote-reference"
        />,
      )
      expect(node.hasClass('yozora-footnote-reference')).toBeTruthy()
      expect(node.hasClass('my-footnote-reference')).toBeTruthy()
    })
  })

  it('style is optional', function () {
    const node = render(
      <FootnoteReference
        identifier="identifier"
        label="1"
        style={{ color: 'orange' }}
      />,
    )
    expect(node.css('color')).toEqual('orange')
  })
})

describe('snapshot', function () {
  it('basic', function () {
    const wrapper = render(
      <FootnoteReference
        identifier="identifier"
        label="1"
        className="custom-footnote"
        style={{ fontSize: '16px' }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
